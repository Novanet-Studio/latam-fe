<script setup lang="ts">
import { useStepper } from "@vueuse/core";
import generateUniqueID from 'generate-unique-id'

import CheckSubscriptionStep from "./check-subscription-step.vue";
import SubscriptorDataStep from "./subscriptor-data-step.vue";
import PaymentReportStep from "./payment-report-step.vue";
import StatusStep from "./status-step.vue";
import AppStepper from "./app-stepper.vue";

interface PaymentResponse {
  codres: string;
  descRes: string;
  autorizacionISO: string;
  traceISO: string;
  autorizacionIBSMonto: string;
  autorizacionIBSComision: string;
  montoComision: string;
  referencia: string;
  fecha: string; // DD/MM/YYYY
  hora: string; // HH:MM:SS
  claveDinamica: number;
  monto: string;
  numeroLote: string;
}

interface ConformationResponse {
  mensaje: string;
  status: "OK" | "Error";
}

const isNextClicked = ref(false);
const isLoading = ref(false);
const form = inject("form") as Latam.Form;
const billingData = reactive<Latam.Billing>({
  IDFactura: 0,
  detalle: '',
  valor: '',
})

const { latamServicesApiUrl } = useRuntimeConfig().public;
const router = useRouter();

const stepper = useStepper({
  "check-subscription": {
    title: "Consultar datos de suscriptor",
    isValid: () => form.contract.length > 0,
  },
  "subscriptor-data": {
    title: "Datos del subscriptor",
    isValid: () => true,
  },
  "payment-report": {
    title: "Reporte de pago",
    isValid: () =>
      form.phone.length > 0 &&
      form.ci.length > 0 &&
      form.bank.length > 0 &&
      form.paymentDate.length > 0 &&
      form.dynamicKey.length > 0,
  },
  status: {
    title: "Estatus de pago",
    isValid: () => true,
  },
});

const activeComponent = computed(() => {
  if (stepper.isCurrent("check-subscription")) {
    return CheckSubscriptionStep;
  } else if (stepper.isCurrent("subscriptor-data")) {
    return SubscriptorDataStep;
  } else if (stepper.isCurrent("payment-report")) {
    return PaymentReportStep;
  } else if (stepper.isCurrent("status")) {
    return StatusStep;
  }
});

const isFirstOrLast = computed(() => stepper.isFirst.value || stepper.isLast.value)

const nextBtnLabel = computed(() => {
  if (stepper.isLast.value) {
    return form.status === "success" ? "Regresar al inicio" : "Intentar de nuevo";
  } else if (stepper.isCurrent("payment-report")) {
    return "Pagar";
  } else {
    return "Siguiente";
  }
});

async function submit() {
  if (stepper.isCurrent("subscriptor-data")) {
    const notification = push.promise("Procesando solicitud...")
    isLoading.value = true;

    try {
      const { data: billing } = await useFetch<Latam.BillingResponse>(
        `${latamServicesApiUrl}/consulta-deuda`,
        {
          method: "POST",
          body: {
            cedula: form.ci,
          },
        }
      );

      if (billing.value?.code === '160') {
        notification.resolve("No tienes facturas por pagar");
        return;
      }

      form.amount = billing.value!.facturas[0].valor;

      Object.assign(billingData, billing.value!.facturas[0]);

      notification.resolve("Consulta realizada");
      stepper.goToNext();

      return;
    } catch (error: any) {
      notification.reject(error.message)
    } finally {
      isLoading.value = false;
    }
  }
  
  if (stepper.isCurrent("payment-report") && !stepper.current.value.isValid()) {
    push.info("Debe completar todos los campos");
    return;
  }

  if (stepper.isCurrent("payment-report") && stepper.current.value.isValid()) {
    const notification = push.promise("Procesando pago...")
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
      }

      const { data: payment, error: paymentError } = await useFetch<PaymentResponse>(
        `${latamServicesApiUrl}/pago`,
        {
          method: "POST",
          body: paymentBody
        }
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
      }

      const { data: conformation, error: conformationError } = await useFetch<ConformationResponse>(
        `${latamServicesApiUrl}/conformacion`,
        {
          method: "POST",
          body: conformationBody,
        }
      );

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

      const { data: response, error: registerPaymentError } = await useFetch<Latam.BillingResponse>(
        `${latamServicesApiUrl}/registrar-pago`,
        {
          method: "POST",
          body: {
            IDFactura: billingData.IDFactura,
            valor: Number(form.amount),
            fecha: paymentDate,
            secuencial: Number(generateUniqueID({
              length: 15,
              useLetters: false,
            }))
          },
        }
      );

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

    return;
  }

  if (form.status === 'error') stepper.goTo('subscriptor-data');
  if (form.status === 'success' && stepper.isLast.value) router.push('/');
  if (stepper.current.value.isValid()) stepper.goToNext();
}

function allStepsBeforeAreValid(index: number): boolean {
  return !Array(index)
    .fill(null)
    .some((_, i) => !stepper.at(i)?.isValid());
}

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

      <div class="wizard__footer" :style="{
        justifyContent: stepper.isLast.value ? 'center' : 'space-around'
      }" :class="{'wizard__footer--full': isFirstOrLast}">
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
            'wizard__btn--full': stepper.isLast.value
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

    h3, h5 {
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

    h3, h5 {
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
