<script lang="ts" setup>
import { useForm } from "vee-validate";

const isSending = ref(false);
const disabled = ref(false);

const isAuthenticated = inject("isAuthenticated") as Ref<boolean>;
const isLoading = inject("isLoading") as Ref<boolean>;
const form = inject("form") as Latam.Form;
const userData = inject("userData") as Latam.UserData;

const { executeGetClientDetails } = useLatamServices();

const { handleSubmit } = useForm({
  initialValues: {
    user: "",
    password: "",
  },
});

const submitForm = handleSubmit(async (values) => {
  const notification = push.promise("Procesando solicitud...")
  try {
    isSending.value = true;
    disabled.value = true;
    isLoading.value = true;

    if (values.user !== values.password) {
      isAuthenticated.value = false;
      isSending.value = false;
      isLoading.value = false;
      notification.reject("Credenciales incorrectas");
      return;
    }

    const { data, error } = await executeGetClientDetails(values.user)

    if (error.value?.data?.error) {
      notification.reject(error.value?.data?.error.toLowerCase());
      return;
    }

    if (data?.value?.estado === "error") {
      notification.reject(data?.value?.mensaje)
      return;
    }

    Object.assign(userData, data.value);
    isAuthenticated.value = true;
    notification.resolve("Sesión iniciada correctamente");
  } catch (error: any) {
    notification.reject(error.message)
    isAuthenticated.value = false;
  } finally {
    isSending.value = false;
    disabled.value = false;
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="login payment-section">
    <h3>Ingresa a tu cuenta</h3>
    <h5>Coloca la información solicitada</h5>
    <form @submit.prevent="submitForm">
      <base-input label="Usuario" id="user" name="user" />
      <base-input
        label="Contraseña"
        id="password"
        name="password"
        type="password"
      />
      <form-button type="submit" :is-loading="isSending" :disabled="disabled">
        Iniciar Sesión
      </form-button>

      <!-- <div class="bt-copy__wrapper">
        <img src="~/assets/images/bt-pagos-logo.svg" alt="Banco del tesoro pagos logo">
        <p>Servicio Banco del Tesoro</p>
      </div> -->
    </form>
  </section>
</template>

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
  padding-bottom: 2.5rem;

  & h3 {
    color: #1b4686;
  }

  & h5 {
    color: #1b4686;
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
      background-color: #c2d62e;
      border-radius: 1rem;
      color: #1b4686;
      font-weight: 800;
      margin-top: 0.5rem;
    }
  }
}

.bt-copy__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  p {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.1;
    color:#1b4686;
  }
}
</style>
