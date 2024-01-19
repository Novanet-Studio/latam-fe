<template>
  <Transition name="fade">
    <div v-if="stepper?.currentStep === 0" class="wizard payment-section">
      <h3>Confirmación de Pagos TV por cable</h3>
      <h5>Consulta datos del suscriptor</h5>
      <form @submit.prevent>
        <select-input label="Contrato" id="contract" name="contract" default-text="Selecciona" :options="options" />
        <form-button type="button" @click.prevent="nextStep">
          Siguiente
        </form-button>
      </form>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const stepper = inject("stepper") as Ref<any>;

const options = [
  {
    text: "Contrato 1",
    value: "1"
  },
  {
    text: "Contrato 2",
    value: "2"
  }
]

function nextStep() {
  stepper?.value.handleNextStep();
}
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
</style>
