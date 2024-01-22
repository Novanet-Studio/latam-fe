<template>
  <div v-if="stepper.isCurrent('payment-report')" class="payment-report">
    <base-input label="Teléfono" id="phone" name="phone" />
    <base-input label="Cédula de identidad" id="ci" name="ci" />
    <!-- Change to select -->
    <base-input label="Banco Emisor" id="fullname" name="fullname" />

    <base-input label="Fecha del pago" id="amount" name="amount" />
    <base-input label="Numero de referencia" id="amount" name="amount" />
    <base-input label="Monto" id="amount" name="amount" />
  </div>
</template>

<script lang="ts" setup>
const stepper = inject("stepper") as any;
</script>

<style lang="scss">
.payment-report {
  width: 100% !important;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  & .formulario__form__grupo {
    width: 286px;
    padding-left: 1rem;
  }

  & .formulario__form__grupo input {
    width: 20rem !important;
  }
}
</style>
