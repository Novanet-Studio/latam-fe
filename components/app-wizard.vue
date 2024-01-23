<script setup lang="ts">
import { useStepper } from "@vueuse/core";

import CheckSubscriptionStep from "./check-subscription-step.vue";
import SubscriptorDataStep from "./subscriptor-data-step.vue";
import PaymentReportStep from "./payment-report-step.vue";
import StatusStep from "./status-step.vue";
import AppStepper from "./app-stepper.vue";

const isNextClicked = ref(false);
const form = inject("form") as Latam.Form;

const { btBaseApi, bussiness } = useRuntimeConfig().public;

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
      form.paymentReference.length > 0,
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

const nextBtnLabel = computed(() => {
  if (stepper.isLast.value) {
    return form.status === "success" ? "Regresar al inicio" : "Intentar de nuevo";
  } else if (stepper.isCurrent("payment-report")) {
    return "Finalizar";
  } else {
    return "Siguiente";
  }
});

interface KeyRequest {
  codResp: string;
  descResp: string;
  claveDinamica: string;
}

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

const isDev = import.meta.env.DEV;

async function submit() {
  if (stepper.isCurrent("payment-report") && stepper.current.value.isValid()) {
    try {
      form.status = "pending";
      // Peticion para el token
      const othersBanks = ["0191", "0172"]
      const sameBank = ["0163"];
      const areOthersBanks = othersBanks.includes(form.bank);
      const isSameBank = sameBank.includes(form.bank);

      const { data: token } = await useFetch<KeyRequest>(
        `${btBaseApi}/lotes/solicitud/clave`,
        {
          method: "POST",
          body: {
            canal: "01",
            celularDestino: form.ci,
          },
        }
      );

      if (!token.value?.claveDinamica.length && (isDev && !areOthersBanks)) {
        // TODO: show error or some modal
        alert(token.value?.descResp);
        form.status = "error";
        stepper.goToNext();
        return;
      }

      const getPaymentToken = () => {
        if (isDev && isSameBank) {
          return token.value?.claveDinamica.toString();
        }

        if (isDev && areOthersBanks) {
          return "20191231";
        }

        return token.value?.claveDinamica.toString();
      }

      // Procesar pago
      const paymentBody = {
        canal: "06",
        celular: form.phone,
        banco: form.bank,
        RIF: bussiness.rif,
        cedula: form.ci,
        monto: form.amount,
        token: getPaymentToken(),
        concepto: `Pago de servicios de ${form.fullName}`,
        codAfiliado: bussiness.afiliatedCode,
        comercio: bussiness.name,
      }
      
      const { data: payment } = await useFetch<PaymentResponse>(
        `${btBaseApi}/botonDePago/pago`,
        {
          method: "POST",
          body: paymentBody,
        }
      );

      if (!payment?.value?.referencia) {
        alert(payment.value?.descRes);
        form.status = "error";
        stepper.goToNext();
        return;
      }

      // Conformacion de pago
      const conformationDate = payment.value.fecha.split("/").reverse().join("");
      
      const conformationBody = {
        referencia: payment.value.referencia,
        monto: form.amount,
        banco: form.bank,
        codAfiliado: bussiness.afiliatedCode,
        fecha: conformationDate,
        celular: form.phone,
        RIF: bussiness.rif,
      }

      const { data: conformation } = await useFetch<ConformationResponse>(
        `${btBaseApi}/botonDePago/conformacion`,
        {
          method: "POST",
          body: conformationBody,
        }
      );

      if (conformation?.value?.status === "Error") {
        alert(conformation.value.mensaje);
        form.status = "error";
        stepper.goToNext();
        return;
      }

      // mostrar mensaje de exito o error
      form.status = "success";
      stepper.goToNext();
    } catch (error) {
      // OPTIONAL: show error or some modal
      form.status = "error";
    }

    return;
  }

  if (form.status === 'error') stepper.goTo('subscriptor-data');
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

      <div class="wizard__footer">
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
          @click="
            () => {
              isNextClicked = true;
              submit();
            }
          "
        >
          {{ nextBtnLabel }}
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
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
</style>
