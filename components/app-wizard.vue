<template>
  <section class="wizard-light">
    
    <app-stepper :steps="steps" ref="stepperRef" />
    <div class="wizard payment-section">
      <h3>Confirmación de Pagos TV por cable</h3>
      <h5>{{ label }}</h5>
      <check-subscription-step key="CheckSubscriptionStep" />

      <div class="wizard__footer">
        <button v-if="stepperRef?.hasPreviousStep && stepperRef?.hasNextStep" class="wizard__btn wizard__btn--prev" @click="stepperRef?.handlePrevStep()">Regresar</button>
        <button class="wizard__btn wizard__btn--next" @click="stepperRef?.handleNextStep()">{{ nextBtnLabel }}</button>
      </div>
    </div>
    <!-- <check-subscription-step key="CheckSubscriptionStep" />
    <subscriptor-data-step key="SubscriptorDataStep" />
    <payment-report-step key="PaymentReportStep" />
    <status-step key="StatusStep" /> -->
  </section>
</template>

<script setup lang="ts">
import AppStepper from './app-stepper.vue';

const steps = [
  {
    label: "Consultar datos de suscriptor",
  },
  { label: "Datos del subscriptor" },
  { label: "Reporte de pago" },
  { label: "Estatus de pago" },
];

const stepperRef = ref<InstanceType<typeof AppStepper> | null>(null)
const label = computed(() => steps[stepperRef?.value?.currentStep ?? 0].label);

const nextBtnLabel = computed(() => {
  if (!stepperRef?.value?.hasNextStep) {
    return "Regresar al inicio";
  } else if (stepperRef?.value?.currentStep === 2) {
    return "Finalizar";
  } else {
    return "Siguiente";
  }
})

provide("stepper", stepperRef);
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
</style>