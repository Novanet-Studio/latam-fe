<template>
  <section class="wizard-light">
    <app-stepper :stepper="stepper" :check-disabled="allStepsBeforeAreValid"  />
    <div class="wizard payment-section">
      <h3>Confirmación de Pagos TV por cable</h3>
      <h5>{{ stepper.current.value.title }}</h5>

      <transition :name="isNextClicked ? 'slide-left' : 'slide-right'" mode="out-in">
        <component :is="activeComponent" />
      </transition>

      <div class="wizard__footer">
        <button v-if="!stepper?.isFirst" class="wizard__btn wizard__btn--prev" @click="() => {
          isNextClicked = false
          stepper.goToNext()
        }">Regresar</button>
        <button class="wizard__btn wizard__btn--next" @click="() => {
          isNextClicked = true
          stepper.goToPrevious()
        }">{{ nextBtnLabel }}</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStepper } from '@vueuse/core'

import CheckSubscriptionStep from './check-subscription-step.vue';
import SubscriptorDataStep from './subscriptor-data-step.vue';
import PaymentReportStep from './payment-report-step.vue';
import StatusStep from './status-step.vue';
import AppStepper from './app-stepper.vue';

const isNextClicked = ref(false);
const form = reactive({
  ci: '',
  contract: '',
  fullName: '',
  amount: 0,
  phone: '',
  bank: '',
  paymentDate: '',
  paymentReference: '',
  status: '' // error | pending | success
});

const stepper = useStepper({
  'check-subscription': {
    title: 'Consultar datos de suscriptor',
    isValid: () => form.ci.length > 0,
  },
  'subscriptor-data': {
    title: 'Datos del subscriptor',
    isValid: () => form.fullName.length > 0,
  },
  'payment-report': {
    title: 'Reporte de pago',
    isValid: () => form.paymentDate.length > 0,
  },
  'status': {
    title: 'Estatus de pago',
    isValid: () => true
  },
});

function submit() {
  if (stepper.current.value.isValid())
    stepper.goToNext()
}

function allStepsBeforeAreValid(index: number): boolean {
  return !Array(index)
    .fill(null)
    .some((_, i) => !stepper.at(i)?.isValid())
}


const activeComponent = computed(() => {
  if (stepper.isCurrent('check-subscription')) {
    return CheckSubscriptionStep;
  } else if (stepper.isCurrent('subscriptor-data')) {
    return SubscriptorDataStep;
  } else if (stepper.isCurrent('payment-report')) {
    return PaymentReportStep;
  } else if (stepper.isCurrent('status')) {
    return StatusStep;
  }
});

const nextBtnLabel = computed(() => {
  if (stepper.isLast.value) {
    return "Regresar al inicio";
  } else if (stepper.isCurrent('payment-report')) {
    return "Finalizar";
  } else {
    return "Siguiente";
  }
})

provide("form", form);
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
  overflow: hidden;
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
    background: #C2D62E;
    color: #1B4686;
  }

  & .wizard__btn--prev {
    background-color: #1B4686;
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