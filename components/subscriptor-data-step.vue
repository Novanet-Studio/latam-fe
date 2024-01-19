<template>
  <Transition name="fade">
    <div v-if="stepper?.currentStep === 1" class="wizard payment-section">
      <h3>Confirmación de Pagos TV por cable</h3>
      <h5>Datos del suscriptor</h5>
      <form class="subscriptor-form">
        <div class="form-inputs">
          <base-input label="Número de contrato" id="contract" name="contract" disabled />
          <base-input label="Nombre y Apellido" id="fullname" name="fullname" disabled />
          <base-input label="Cédula de identidad" id="ci" name="ci" disabled />
          <base-input label="Monto a pagar" id="amount" name="amount" disabled />
        </div>
        <div class="form-buttons">
          <form-button class="prev">Regresar</form-button>
          <form-button>Siguiente</form-button>
        </div>
      </form>
    </div>
  </Transition>
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
    color: #1B4686;
  }

  & h5 {
    color: #1B4686;
    font-weight: 400;
    font-size: 22px;
  }

  & form {
    margin-top: 2rem;

    select {
      width: 100%;
      padding: 0.5rem .8rem;
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
      background-color: #C2D62E;
      border-radius: 1rem;
      color: #1B4686;
      font-weight: 800;
    }
  }
}

.subscriptor-form {
  width: 100%;
}

.form-inputs {
  display: flex;

  & .formulario__form__grupo {
    width: 286px;
  }

  & .formulario__form__grupo input {
    width: 14rem !important;
  }
}

.form-buttons {
  width: 100% !important;
  display: flex;
  justify-content: center;

  .prev button {
    background: #1B4686;
    color: #fff;
  }
}
</style>
