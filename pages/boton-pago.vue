<template>
  <main class="internetvista" style="position: relative;">
    <div v-if="isLoading" class="loader-wrapper">
      <app-loader />
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
.loader-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  z-index: 100;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>