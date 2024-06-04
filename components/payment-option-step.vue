<script lang="ts" setup>
const stepper = inject("stepper") as any;
const option = inject("paymentOption") as Ref<Latam.PaymentOption>;
</script>

<template>
  <div
    v-if="stepper.isCurrent('payment-option')"
    class="options"
  >
    <button class="option-btn" @click="option = 'bancoTesoro'">
      <img src="~/assets/images/bt-pagos-logo.svg" alt="Banco del tesoro pagos logo" />
    </button>
    <button class="option-btn" @click="option = 'miBanco'">
      <img src="~/assets/images/mibanco-pagos-logo.svg" alt="Mi Banco pagos logo" />
    </button>
  </div>
</template>

<style lang="scss">
.options {  
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;

  // & select {
  //   width: 100%;
  //   padding: 0.5rem 0.8rem;
  //   // border-radius: .5rem;
  //   border: 1px solid transparent;
  //   border-radius: 1rem;
  //   background: #fff;
  //   min-width: 270px;
  // }
}

.option-btn {
  border: 4px solid transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.selected {
  border-color: #1b4686;
}
</style>
