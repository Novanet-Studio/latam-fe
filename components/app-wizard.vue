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
          v-if="!stepper?.isFirst.value"
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
    return "Regresar al inicio";
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
  descResp: string;
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

async function submit() {
  if (stepper.isCurrent("payment-report")) {
    try {
      form.status = "pending";
      // Peticion para el token
      const { data: token } = await useFetch<KeyRequest>(
        `${btBaseApi}/lotes/solicitud/clave`,
        {
          method: "POST",
          body: {
            canal: "01",
            celularDestino: "V011484286",
          },
        }
      );

      if (!token.value?.claveDinamica) {
        // TODO: show error or some modal
        alert(token.value?.descResp);
        return;
      }

      // Procesar pago
      const { data: payment } = await useFetch<PaymentResponse>(
        `${btBaseApi}/botonDePago/pago`,
        {
          method: "POST",
          body: {
            canal: "06",
            celular: "04122084674",
            banco: "0163",
            RIF: "J297059172",
            cedula: "V011484286",
            monto: "3617,00",
            token: "14866991",
            concepto: "prueba",
            codAfiliado: "004036",
            comercio: "Latam",
          },
        }
      );

      // Conformacion de pago

      const { data: conformation } = await useFetch<any>(
        `${btBaseApi}/botonDePago/conformacion`,
        {
          method: "POST",
          body: {
            referencia: "095813962",
            monto: "3617,00",
            banco: "0163",
            codAfiliado: "004036",
            fecha: "20231220",
            celular: "04122084674",
            RIF: " J297059172",
          },
        }
      );

      // mostrar mensaje de exito o error
      stepper.goToNext();
    } catch (error) {
      form.status = "error";
      // TODO: show error or some modal
    } finally {
      form.status = "success";
    }

    return;
  }

  if (stepper.current.value.isValid()) stepper.goToNext();
}

function allStepsBeforeAreValid(index: number): boolean {
  return !Array(index)
    .fill(null)
    .some((_, i) => !stepper.at(i)?.isValid());
}

provide("stepper", stepper);
</script>

<style lang="scss">
.wizard-light {
  display: grid;
  grid-template-rows: auto;
  grid-area: formulario;
  grid-template-columns: 1fr;
  place-items: center;
  padding: 4.5em 1.5em 4.5em 2em;
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
