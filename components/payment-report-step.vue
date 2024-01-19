<template>
  <form v-if="stepper?.currentStep === 2" class="subscriptor-form">
    <div class="form-inputs">
      <base-input label="Teléfono" id="phone" name="phone" />
      <base-input label="Cédula de identidad" id="ci" name="ci" />
      <!-- Change to select -->
      <base-input label="Banco Emisor" id="fullname" name="fullname" />

      <base-input label="Fecha del pago" id="amount" name="amount" />
      <base-input label="Numero de referencia" id="amount" name="amount" />
      <base-input label="Monto" id="amount" name="amount" />
    </div>
  </form>
</template>

<script lang="ts" setup>
const stepper = inject("stepper") as { currentStep: number | null };
</script>

<style lang="scss">
.wizard {
  display: grid;
  grid-template-rows: auto;
  place-items: center;
  padding: 4.5em 1.5em 4.5em 2em;
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

    select {
      width: 100%;
      padding: 0.5rem 0.8rem;
      // border-radius: .5rem;
      border: 1px solid transparent;
      border-radius: 1rem;
      background: #fff;
    }

    & div {
      width: 323px;
    }

    & div label {
      color: #666666;
      font-weight: 500;
    }

    & div button {
      margin-left: 1rem;
      margin-right: 1rem;
      padding: 0.6rem 0.8rem;
      background-color: #c2d62e;
      border-radius: 1rem;
      color: #1b4686;
      font-weight: 800;
    }
  }
}

.subscriptor-form {
  width: 100%;
}

.form-inputs {
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

.form-buttons {
  width: 100% !important;
  display: flex;
  justify-content: center;

  .prev button {
    background: #1b4686;
    color: #fff;
  }
}
</style>
