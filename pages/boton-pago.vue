<template>
  <main class="internetvista" style="position: relative;">
    <div v-if="isLoading" class="loader-wrapper">
      <app-loader class="loader-wrapper__main" />
    </div>

    <transition name="fade" mode="out-in">
      <component :is="activeComponent" />
    </transition>
  </main>
</template>

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


<style lang="scss">
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