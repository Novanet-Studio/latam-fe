<script lang="ts" setup>
import { useForm } from "vee-validate";

const isSending = ref(false);
const disabled = ref(false);

const isAuthenticated = inject("isAuthenticated") as Ref<boolean>;
const isLoading = inject("isLoading") as Ref<boolean>;
const form = inject("form") as Latam.Form;
const userData = inject("userData") as Latam.UserData;

const isDev = import.meta.env.DEV;

const { usersApi, usersApiKey } = useRuntimeConfig().public;

const api = isDev
  ? "https://private-anon-0c49753ae6-mikrowisp.apiary-mock.com/api/v1"
  : usersApi;

const mockData = {
  estado: "exito",
  datos: [
    {
      id: 6,
      nombre: "ARIEL Perez",
      estado: "ACTIVO",
      correo: "",
      telefono: "45434565",
      movil: "998283745",
      cedula: "65454323",
      pasarela: "",
      codigo: "l4o4gp",
      direccion_principal: "2301 Peger Rd.",
      servicios: [
        {
          id: 5,
          idperfil: 2,
          nodo: 2,
          costo: "150.00",
          ipap: "",
          mac: "00:44:56:56:78:17",
          ip: "192.168.33.3",
          instalado: "0000-00-00",
          pppuser: "User6",
          ppppass: "Pass6",
          tiposervicio: "internet",
          status_user: "OFFLINE",
          coordenadas: "-11.984449254433779,-77.0827752259944",
          direccion: "",
          snmp_comunidad: "public",
          perfil: "Plan 4Mbps",
        },
      ],
      facturacion: {
        facturas_nopagadas: 4,
        total_facturas: "750.00",
      },
    },
  ],
};

const { handleSubmit } = useForm({
  initialValues: {
    user: "",
    password: "",
  },
});

const submitForm = handleSubmit(async (values) => {
  try {
    isSending.value = true;
    disabled.value = true;
    isLoading.value = true;

    if (values.user !== values.password) {
      isAuthenticated.value = false;
      isSending.value = false;
      isLoading.value = false;
      alert("Credenciales incorrectas");
      return;
    }

    if (isDev) {
      if (values.user === "V12345678" && values.password === "V12345678") {
        setTimeout(() => {
          form.ci = values.user;
          isAuthenticated.value = true;
          isLoading.value = false;
          Object.assign(userData, mockData);
        }, 2000);
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } else {
      const { data } = await useFetch(`${api}/GetClientsDetails`, {
        method: "post",
        body: {
          token: usersApiKey,
          cedula: values.user,
        },
      });

      Object.assign(userData, data.value);
    }
  } catch (error: any) {
    alert(error.message);
    isAuthenticated.value = false;
  } finally {
    if (isDev) {
      setTimeout(() => {
        isSending.value = false;
        disabled.value = false;
        isLoading.value = false;
      }, 2000);
    } else {
      isSending.value = false;
      disabled.value = false;
      isLoading.value = false;
    }
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
    }
  }
}
</style>
