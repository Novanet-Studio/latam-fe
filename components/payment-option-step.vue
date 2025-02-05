<script lang="ts" setup>
const stepper = inject("stepper") as any;
const option = inject("paymentOption") as Ref<Latam.PaymentOption>;
</script>

<template>
  <div v-if="stepper.isCurrent('payment-option')" class="options">
    <button class="option-btn" @click="option = 'bancoTesoro'">
      <img
        src="~/assets/images/bdt.webp"
        alt="Banco del tesoro pagos logo"
      />
    </button>
    <button class="option-btn" @click="option = 'miBanco'">
      <img src="~/assets/images/mi-banco.svg" alt="Mi Banco pagos logo" />
    </button>
  </div>
</template>

<style lang="scss">
.options {
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
}

.option-btn {
  max-width: 150px;
  aspect-ratio: 1 / 1;

  overflow: hidden;
  border: 4px solid transparent;
  border-radius: 50%;

  transition: all 0.3s ease;
  cursor: pointer;

  background: #f0f0f0;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    aspect-ratio: 1 / 1;
    background: white;
    border-radius: 50%;
    border: 1px solid #c2d62e;

    width: 100%;
  }
}

.selected {
  border-color: #1b4686;
}
</style>
