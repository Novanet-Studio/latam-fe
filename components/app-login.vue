<template>
  <section class="login payment-section">
    <h3>Ingresa a tu cuenta</h3>
    <h5>Coloca la información solicitada</h5>
    <form @submit.prevent="submitForm">
      <base-input label="Usuario" id="user" name="user" />
      <base-input label="Contraseña" id="password" name="password" type="password" />
      <form-button type="submit" :is-loading="isSending" :disabled="disabled">
          Iniciar Sesión
      </form-button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';

const isSending = ref(false);
const disabled = ref(false);

const isAuthenticated = inject('isAuthenticated') as Ref<boolean>;
const isLoading = inject('isLoading') as Ref<boolean>;

const { handleSubmit } = useForm({
  initialValues: {
    user: '',
    password: ''
  },
});

const submitForm = handleSubmit(async (values) => {
  try {
    isSending.value = true;
    disabled.value = true;
    isLoading.value = true;

    setTimeout(() => {
      if (values.user !== values.password) {
        isAuthenticated.value = false;
        isLoading.value = false;
      }

      if (values.user === "V12345678" && values.password === "V12345678") {
        isAuthenticated.value = true;
        isLoading.value = false;
      }
    }, 2000);
    
  } catch (error) {
    isAuthenticated.value = false;
  } finally {
    // isSending.value = false;
    // disabled.value = false;
    // isLoading.value = false;
  }
})
</script>

<style lang="scss">
.login {
  display: grid;
  grid-template-rows: auto;
  grid-area: formulario;
  grid-template-columns: 1fr;
  place-items: center;
  padding: 4.5em 1.5em 4.5em 2em;
  position: relative;
  z-index: 0;

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