<template>
  <section class="wizard-light">
    <AppStepper />
    <div class="wizard payment-section">
      <h3>Ingresa a tu cuenta</h3>
      <h5>Coloca la información solicitada</h5>
      <form>
        <base-input label-text="Usuario" id="user" name="user" />
        <base-input label-text="Contraseña" id="password" name="password" type="password" />
        <form-button type="submit" :is-loading="isSendingForm" :disabled="isButtonDisabled">
            Iniciar Sesión
        </form-button>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
const isSendingForm = ref(false);
const isButtonDisabled = ref(false);
</script>

<style lang="scss">
.wizard-light {
  display: grid;
  grid-template-rows: auto;
  grid-area: formulario;
  grid-template-columns: 1fr;
  place-items: center;
  padding: 4.5em 1.5em 4.5em 2em;
}

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
    margin-top: 1rem;

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