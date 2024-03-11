<script setup lang="ts">
import AppLogin from "~/components/app-login.vue";
import AppWizard from "~/components/app-wizard.vue";

useHead({
  meta: [
    {
      "http-equiv": "Content-Security-Policy",
      content: "upgrade-insecure-requests",
    },
  ],
});

const isAuthenticated = ref(false);
const isLoading = ref(false);
const userData = reactive<Latam.UserData>({
  estado: "",
  datos: null,
});

const form = reactive<Latam.Form>({
  ci: "",
  contract: "",
  fullName: "",
  amount: 0,
  vesAmount: "",
  phone: "",
  bank: "",
  paymentDate: "",
  dynamicKey: "",
  status: "", // error | pending | success
});

const activeComponent = computed(() =>
  isAuthenticated.value ? AppWizard : AppLogin
);

provide("form", form);
provide("userData", userData);
provide("isLoading", isLoading);
provide("isAuthenticated", isAuthenticated);
</script>

<template>
  <main class="report-view">
    <section class="hero">
      <div class="hero__internet">
        <div class="hero__internet__box">
          <div class="hero__internet__icon"></div>
          <div class="hero__internet__info">
            <h1 class="hero__internet__title">Realiza tus pagos</h1>
            <p class="hero__internet__text">
              Ponemos a tu disposición el botón de pago del Banco del Tesoro
              para que puedas pagar de forma rápida y segura
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="payment">
      <h2 class="payment__title">Haz tus pagos de forma rápida y segura</h2>
      <p>
        Sigue las indicaciones del formulario multipasos mostrado a
        continuación, las datos de acceso son los mismos que utilizas en el
        portal Acceso a Clientes. Una vez realizado el pago es obligatorio hacer
        la notificacion del mismo por WhatsApp al 0414 3021751.
      </p>
    </section>

    <section class="report">
      <div v-if="isLoading" class="loader-wrapper">
        <app-loader class="loader-wrapper__main" />
      </div>

      <transition name="fade" mode="out-in">
        <component :is="activeComponent" />
      </transition>
    </section>
  </main>
</template>

<style scoped lang="scss">
.loader-wrapper__main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  z-index: 100;
}
</style>
