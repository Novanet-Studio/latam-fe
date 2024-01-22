<template>
  <div
    v-if="stepper.isCurrent('check-subscription')"
    class="check-subscription"
  >
    <select-input
      label="Contrato"
      id="contract"
      name="contract"
      default-text="Selecciona"
      :options="options"
    />
  </div>
</template>

<script lang="ts" setup>
const options = [
  {
    text: "Contrato 1",
    value: "1",
  },
  {
    text: "Contrato 2",
    value: "2",
  },
];

const stepper = inject("stepper") as any;
</script>

<style lang="scss">
.check-subscription {
  & select {
    width: 100%;
    padding: 0.5rem 0.8rem;
    // border-radius: .5rem;
    border: 1px solid transparent;
    border-radius: 1rem;
    background: #fff;
  }
}
</style>
