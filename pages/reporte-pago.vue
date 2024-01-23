<script setup lang="ts">
import AppLogin from '~/components/app-login.vue';
import AppWizard from '~/components/app-wizard.vue'; 

const isAuthenticated = ref(false);
const isLoading = ref(false)
const userData = reactive<Latam.UserData>({
  estado: '',
  datos: null,
});

const form = reactive<Latam.Form>({
  ci: '',
  contract: '',
  fullName: '',
  amount: 0,
  phone: '',
  bank: '',
  paymentDate: '',
  paymentReference: '',
  status: '' // error | pending | success
});

const activeComponent = computed(() => isAuthenticated.value ? AppWizard : AppLogin);

provide('form', form);
provide('userData', userData);
provide('isLoading', isLoading);
provide('isAuthenticated', isAuthenticated);
</script>

<template>
  <main class="report-view">
    <section class="hero">
      <div class="hero__internet">
        <div class="hero__internet__box">
          <div class="hero__internet__icon"></div>
          <div class="hero__internet__info">
            <h1 class="hero__internet__title">
              Reporta tus pagos
            </h1>
            <p class="hero__internet__text">
              Ponemos a tu disposición formas para que notifiques los pagos que realices
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="payment">
      <h2 class="payment__title">Información de pago</h2>
      <p>
        Una vez realizado el pago es obligatorio hacer la notificacion del
        mismo, utilizando uno de los dos medios de notificación, página web o
        whatsapp al 0414 3021751. Utilice un solo método de notificación, solo
        la página web o el whatsapp. ( INGRESAR POR EL NAVEGADO MOZILLA FIREFOX
        PARA REGISTRAR SU PAGO )
      </p>

      <div class="payment__info">
        <div class="info-box">
          <div class="info-box__icon-wrapper">
            <img src="../assets/images/latinamerican-transferencia-icon.svg" alt="" />
          </div>
          <div>
            <h3 class="info-box__title">Transferencia bancaria</h3>
            <p>
              Cuenta a la cual cual debe realizar la transferencia: <br />
              Cuenta corriente: 0172 0104 2910 4436 9427 <br />
              Banco: Bancamiga. <br />
              RIF: J-298946229 <br />
            </p>
          </div>
        </div>
        <div class="info-box">
          <div class="info-box__icon-wrapper">
            <img src="../assets/images/latinamerican-transferencia-icon.svg" alt="" />
          </div>
          <div>
            <h3 class="info-box__title">Pago móvil</h3>
            <p>
              Número teléfonico al cual debe realizar el pago: <br />
              0414.203.2323 <br />
              Banco: Banesco. <br />
              RIF: J-298946229 <br />
            </p>
          </div>
        </div>
      </div>
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