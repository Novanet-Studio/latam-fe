<template>
  <section class="wizard-light">
    
    <app-stepper ref="stepperRef" />
    <check-subscription-step key="CheckSubscriptionStep" />
    <subscriptor-data-step key="SubscriptorDataStep" />
    <payment-report-step key="PaymentReportStep" />
    <status-step key="StatusStep" />
  </section>
</template>

<script setup lang="ts">
import AppStepper from './app-stepper.vue';

const stepperRef = ref<InstanceType<typeof AppStepper> | null>(null)

provide("stepper", stepperRef);

setTimeout(() => {
  stepperRef.value?.handleNextStep()
  stepperRef.value?.handleNextStep()
  stepperRef.value?.handleNextStep()
}, 2000)
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
</style>