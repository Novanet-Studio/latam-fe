<script setup lang="ts">
import { useStepper } from "@vueuse/core";
import generateUniqueID from "generate-unique-id";

import CheckSubscriptionStep from "./check-subscription-step.vue";
import PaymentOptionStep from "./payment-option-step.vue";
import SubscriptorDataStep from "./subscriptor-data-step.vue";
import PaymentReportStep from "./payment-report-step.vue";
import StatusStep from "./status-step.vue";
import AppStepper from "./app-stepper.vue";

const isNextClicked = ref(false);
const isLoading = ref(false);
const form = inject("form") as Latam.Form;
const paymentMethod = inject("paymentMethod") as Ref<Latam.PaymentMethod>;
const paymentOption = inject("paymentOption") as Ref<Latam.PaymentOption>;
const billingData = reactive<Latam.Billing>({
  IDFactura: 0,
  detalle: "",
  valor: "",
});

const {
  executeCheckDebts,
  executeBtPay,
  executeConformation,
  executeRegisterPay,
  executeRequestMiBancoOTP,
  executeMiBancoPayment,
} = useLatamServices();
const router = useRouter();

const stepper = useStepper({
  "check-subscription": {
    title: "Consultar datos de suscriptor",
    isValid: () => form.contract.length > 0,
  },
  "payment-option": {
    title: "Seleccione el medio de pago",
    isValid: () => paymentOption.value.length > 0,
  },
  "subscriptor-data": {
    title: "Datos del subscriptor",
    isValid: () => true,
  },
  "payment-report": {
    title: "Reporte de pago",
    isValid: () => checkPaymentReportValidation(),
  },
  status: {
    title: "Estatus de pago",
    isValid: () => true,
  },
});

const activeComponent = computed(() => {
  if (stepper.isCurrent("check-subscription")) {
    return CheckSubscriptionStep;
  } else if (stepper.isCurrent("payment-option")) {
    return PaymentOptionStep;
  } else if (stepper.isCurrent("subscriptor-data")) {
    return SubscriptorDataStep;
  } else if (stepper.isCurrent("payment-report")) {
    return PaymentReportStep;
  } else if (stepper.isCurrent("status")) {
    return StatusStep;
  }
});

const isFirstOrLast = computed(
  () => stepper.isFirst.value || stepper.isLast.value
);

const nextBtnLabel = computed(() => {
  if (stepper.isLast.value) {
    return form.status === "success"
      ? "Regresar al inicio"
      : "Intentar de nuevo";
  } else if (stepper.isCurrent("payment-report")) {
    return "Pagar";
  } else {
    return "Siguiente";
  }
});

async function btPayment() {
  const notification = push.promise("Procesando pago...");

  try {
    form.status = "pending";

    // Procesar pago
    const paymentBody = {
      celular: form.phone,
      banco: form.bank,
      cedula: form.ci,
      monto: form.vesAmount,
      token: form.dynamicKey,
      nombre: form.fullName,
    };

    const { data: payment, error: paymentError } = await executeBtPay(
      paymentBody
    );

    if (!payment?.value?.referencia) {
      notification.reject(payment.value?.descRes);
      form.status = "error";
      stepper.goToNext();
      return;
    }

    if (paymentError.value?.data?.error) {
      notification.reject(paymentError.value?.data?.error);
      return;
    }

    // Conformacion de pago
    const conformationDate = payment.value.fecha.split("/").reverse().join("");

    const conformationBody = {
      referencia: payment.value.referencia,
      monto: form.vesAmount,
      banco: form.bank,
      fecha: conformationDate,
      celular: form.phone,
    };

    const { data: conformation, error: conformationError } =
      await executeConformation(conformationBody);

    if (conformation?.value?.status === "Error") {
      notification.reject(conformation.value.mensaje);
      form.status = "error";
      stepper.goToNext();
      return;
    }

    if (conformationError.value?.data?.error) {
      notification.reject(conformationError.value?.data?.error);
      return;
    }

    // Report payment
    const paymentDate = payment.value.fecha.split("/").reverse().join("-");

    const { data: response, error: registerPaymentError } =
      await executeRegisterPay({
        IDFactura: billingData.IDFactura,
        valor: Number(form.amount),
        fecha: paymentDate,
        secuencial: Number(
          generateUniqueID({
            length: 15,
            useLetters: false,
          })
        ),
      });

    if (registerPaymentError.value?.data?.error) {
      notification.reject(registerPaymentError.value?.data?.error);
      return;
    }

    if (response.value?.code === "170") {
      notification.reject(response.value?.mensaje);
      return;
    }

    notification.resolve("Pago procesado correctamente");
    form.status = "success";
    stepper.goToNext();
  } catch (error) {
    notification.error("Hubo un error al procesar el pago");
    form.status = "error";
  }
}

async function miBancoPayment() {
  const notification = push.promise("Procesando pago...");

  try {
    form.status = "pending";

    const getShortFormatDate = () =>
      new Date()
        .toISOString()
        .replace(/\.(\d{3})Z$/, "")
        .replace("T", "")
        .replaceAll("-", "")
        .replaceAll(":", "");
    const getTimeFormatDate = () =>
      new Date().toISOString().replace(/\.(\d{3})Z$/, "") + "Z";
    const msgId = `000101${getShortFormatDate()}00000000`;

    // otp
    const otpBody = {
      AuthstnReq: {
        GrpHdr: {
          MsgId: msgId,
          CreDtTm: getTimeFormatDate(),
          InstgAgt: {
            FinInstnId: {
              // Bussiness
              ClrSysMmbId: {
                ClrSysId: {
                  Cd: "NCCE",
                },
                MmbId: "0169",
              },
            },
          },
          InstdAgt: {
            FinInstnId: {
              // Client
              ClrSysMmbId: {
                ClrSysId: {
                  Cd: "NCCE",
                },
                // MmbId: "0102",
                MmbId: form.bank,
              },
            },
          },
          InitgPty: {
            Id: {
              PrvtId: {
                Othr: {
                  Id: "800001",
                },
              },
            },
          },
          InitnSrc: {
            Nm: "50001",
            Prvdr: "SBTC",
            Vrsn: "1.0",
          },
        },
        Initn: {
          OrgnlTxRef: {
            InstdAmt: {
              Ccy: "VES",
              // Amt: 18.01,
              Amt: Number(form.amount),
            },
            MndtRltdInf: {
              MndtId: "00012020062418222012345671",
              Tp: {
                LclInstrm: {
                  Cd: "050",
                },
              },
            },
            Dbtr: {
              Id: {
                PrvtId: {
                  Othr: {
                    // Id: "V19458201",
                    Id: form.ci,
                    SchmeNm: {
                      Cd: "SCID",
                    },
                  },
                },
              },
            },
            Cdtr: {
              Id: {
                PrvtId: {
                  // Bussines Data
                  Othr: {
                    Id: "J123456789",
                    SchmeNm: {
                      Cd: "SRIF",
                    },
                  },
                },
              },
            },
            DbtrAgt: {
              FinInstnId: {
                ClrSysMmbId: {
                  ClrSysId: {
                    Cd: "NCCE",
                  },
                  // MmbId: "0102",
                  MmbId: form.bank,
                },
              },
            },
            CdtrAgt: {
              FinInstnId: {
                ClrSysMmbId: {
                  ClrSysId: {
                    Cd: "NCCE",
                  },
                  MmbId: "0169",
                },
              },
            },
            DbtrAcct: {
              Prxy: {
                Tp: {
                  Cd: "CELE",
                },
                Id: form.phone,
                // Id: "04121231234",
              },
            },
            CdtrAcct: {
              Prxy: {
                Tp: {
                  Cd: "CNTA",
                },
                Id: "01691234567890123456",
              },
            },
          },
        },
      },
    };

    await executeRequestMiBancoOTP(otpBody);

    // Procesar pago
    const paymentBody = {
      CstmrDrctDbtInitn: {
        GrpHdr: {
          MsgId: msgId,
          CreDtTm: getTimeFormatDate(),
          NbOfTxs: 1,
          // CtrlSum: 10.01,
          CtrlSum: Number(form.amount),
          InitgPty: {
            Id: {
              PrvtId: {
                Othr: {
                  Id: "800001",
                },
              },
            },
          },
          InitnSrc: {
            Nm: "1234",
            Prvdr: "SBTC",
            Vrsn: "1.0.1",
          },
        },
        PmtInf: [
          {
            Cdtr: {
              // Nombre Acreedor
              Nm: form.fullName,
              Id: {
                PrvtId: {
                  Othr: {
                    // Id: "V15555666",
                    Id: form.ci,
                    SchmeNm: {
                      Cd: "SCID",
                    },
                  },
                },
              },
            },
            CdtrAcct: {
              Prxy: {
                Tp: {
                  Cd: "CELE",
                },
                // Id: "00011234567890123456",
                Id: form.phone,
              },
            },
            CdtrAgt: {
              FinInstnId: {
                ClrSysMmbId: {
                  ClrSysId: {
                    Cd: "NCCE",
                  },
                  // MmbId: "0102",
                  MmbId: form.bank,
                },
              },
            },
            DrctDbtTxInf: [
              {
                PmtId: {
                  // InstrId: "20c6d352-68c1-4b58-b1d1-afad41b8229f",
                  InstrId: crypto.randomUUID(),
                },
                PmtTpInf: {
                  LclInstrm: {
                    Cd: "050",
                  },
                },
                InstdAmt: {
                  // Amt: 10.01,
                  Amt: Number(form.amount),
                  Ccy: "VES",
                },
                DbtrAgt: {
                  FinInstnId: {
                    ClrSysMmbId: {
                      ClrSysId: {
                        Cd: "NCCE",
                      },
                      MmbId: "0105",
                    },
                  },
                },
                Dbtr: {
                  // Nm: "Nombre Deudor",
                  Nm: form.fullName,
                  Id: {
                    PrvtId: {
                      Othr: {
                        // Id: "V15555666",
                        Id: form.ci,
                        SchmeNm: {
                          Cd: "SCID",
                        },
                      },
                    },
                  },
                },
                DbtrAcct: {
                  Prxy: {
                    Tp: {
                      // Cd: "CNTA",
                      Cd: "CELE",
                    },
                    // Id: "00011234567890123456",
                    Id: form.phone,
                  },
                },
                Purp: {
                  Cd: "002",
                },
                RmtInf: {
                  Ustrd: "DESCRIPCION DEL COBRO",
                },
              },
            ],
          },
        ],
      },
    };

    await executeMiBancoPayment(paymentBody);

    notification.resolve("Pago procesado correctamente");
    form.status = "success";
    stepper.goToNext();
  } catch (error) {
    notification.error("Hubo un error al procesar el pago");
    form.status = "error";
  }
}

async function pagoMovilPayment() {
  if (paymentOption.value === "bancoTesoro") {
    btPayment();
    return;
  }

  if (paymentOption.value === "miBanco") {
    miBancoPayment();
    return;
  }

  return;
}

function checkPaymentReportValidation() {
  if (paymentMethod.value === "pagoMovil") {
    return pagoMovilValidation();
  }

  if (paymentMethod.value === "transference") {
    return transferenceValidation();
  }

  return false;
}

function pagoMovilValidation() {
  if (paymentOption.value === "miBanco") {
    return (
      form.phone.length > 0 &&
      form.ci.length > 0 &&
      form.bank.length > 0 &&
      form.paymentDate.length > 0
    )
  }

  return (
    form.phone.length > 0 &&
    form.ci.length > 0 &&
    form.bank.length > 0 &&
    form.paymentDate.length > 0 &&
    form.dynamicKey.length > 0
  );
}

function transferenceValidation() {
  return (
    form.accountNumber!.length > 0 &&
    form.bank.length > 0 &&
    form.paymentDate.length > 0 &&
    form.reference!.length > 0
  );
}

async function transferencePayment() {}

async function submit() {
  if (stepper.isCurrent("subscriptor-data")) {
    const notification = push.promise("Procesando solicitud...");
    isLoading.value = true;

    try {
      const { data: billing } = await executeCheckDebts(form.ci);

      if (billing.value?.code === "160") {
        notification.resolve("No tienes facturas por pagar");
        return;
      }

      form.amount = billing.value!.facturas[0].valor;

      Object.assign(billingData, billing.value!.facturas[0]);

      notification.resolve("Consulta realizada");
      stepper.goToNext();

      return;
    } catch (error: any) {
      notification.reject(error.message);
    } finally {
      isLoading.value = false;
    }
  }

  if (stepper.isCurrent("payment-report") && !stepper.current.value.isValid()) {
    push.info("Debe completar todos los campos");
    return;
  }

  if (stepper.isCurrent("payment-report") && stepper.current.value.isValid()) {
    if (paymentMethod.value === "pagoMovil") {
      pagoMovilPayment();
    } else if (paymentMethod.value === "transference") {
      transferencePayment();
    }

    return;
  }

  if (form.status === "error") stepper.goTo("subscriptor-data");
  if (form.status === "success" && stepper.isLast.value) router.push("/");
  if (stepper.current.value.isValid()) stepper.goToNext();
}

function allStepsBeforeAreValid(index: number): boolean {
  return !Array(index)
    .fill(null)
    .some((_, i) => !stepper.at(i)?.isValid());
}

// stepper.goTo("payment-report");

provide("stepper", stepper);
</script>

<template>
  <section class="wizard-light">
    <app-stepper :stepper="stepper" :check-disabled="allStepsBeforeAreValid" />
    <div class="wizard payment-section">
      <h3>Confirmación de Pagos TV por cable</h3>
      <h5>{{ stepper.current.value.title }}</h5>

      <form @submit.prevent="submit">
        <transition
          :name="isNextClicked ? 'slide-left' : 'slide-right'"
          mode="out-in"
        >
          <app-loader
            v-if="form.status === 'pending'"
            class="loader-wrapper__wizard"
          />
          <component v-else :is="activeComponent" />
        </transition>
      </form>

      <div
        class="wizard__footer"
        :style="{
          justifyContent: stepper.isLast.value ? 'center' : 'space-around',
        }"
        :class="{ 'wizard__footer--full': isFirstOrLast }"
      >
        <button
          v-if="!stepper?.isFirst.value && !stepper?.isLast.value"
          class="wizard__btn wizard__btn--prev"
          @click="
            () => {
              isNextClicked = false;
              stepper.goToPrevious();
            }
          "
        >
          Regresar
        </button>
        <button
          class="wizard__btn wizard__btn--next"
          :class="{
            'wizard__btn--full': stepper.isLast.value,
          }"
          @click="
            () => {
              isNextClicked = true;
              submit();
            }
          "
          :disabled="isLoading"
        >
          {{ isLoading ? "Verificando..." : nextBtnLabel }}
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.wizard-light {
  display: grid;
  grid-template-rows: auto;
  grid-area: formulario;
  grid-template-columns: 1fr;
  place-items: center;
  padding: 1em 1.5em 4.5em 2em;
  position: relative;
}

.loader-wrapper__wizard {
  margin-top: 2rem;
}

.wizard {
  display: grid;
  grid-template-rows: auto;
  place-items: center;
  padding: 4.5em 1.5em 4.5em 1.5em;
  position: relative;
  z-index: 0;
  width: 100%;

  & h3 {
    color: #1b4686;
  }

  & h5 {
    color: #1b4686;
    font-weight: 400;
    font-size: 22px;
  }

  & form {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;

    & div label {
      color: #666666;
      font-weight: 500;
    }
  }
}

.subscriptor-form {
  width: 100%;
}

.wizard__footer {
  margin-top: 3rem;
  width: 50%;
  display: flex;
  justify-content: space-around;

  &--full {
    width: 65%;
  }

  & .wizard__btn {
    width: 270px;
    height: 38px;
    border-radius: 1rem;
    font-weight: 800;
  }

  & .wizard__btn--next {
    background: #c2d62e;
    color: #1b4686;
  }

  & .wizard__btn--prev {
    background-color: #1b4686;
    color: #fff;
  }
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-leave-to {
  transform: translateX(40px);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

/*---- 
  Mobile Portrait (320px)
----*/
@include responsive(20em) {
  .wizard {
    width: 70vw;
    place-items: flex-start;
    padding: 0rem 1.5em 2.5em 1.5em;

    h3,
    h5 {
      display: none;
    }

    form {
      width: 70vw;
    }

    &__footer {
      margin-top: 1rem;

      & .wizard__btn {
        width: 50%;
        min-width: 50%;

        &--full {
          width: 25rem !important;
        }
      }
    }
  }
}

/*---- 
  Tablet Portrait (768px)
----*/
@include responsive(48em) {
  .wizard {
    padding: 2em 2.5em 2.5em 2em;
  }

  .wizard__footer {
    gap: 1rem;

    &--full {
      width: 100%;
    }
  }
}

/*---- 
  Small Desktop (1280px)
----*/
@include responsive(80em) {
  .wizard {
    place-items: center;
    padding: 4.5em 1.5em 4.5em 1.5em;

    h3,
    h5 {
      display: block;
    }
  }

  .wizard__footer {
    gap: 1rem;

    .wizard__btn {
      width: 270px !important;
      min-width: 250px;
    }
  }
}
</style>
