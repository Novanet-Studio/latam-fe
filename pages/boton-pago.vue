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
// const ci = ref('')
// interface UserObject {
//   name: string;
//   ci: string;
//   contract: string;
//   amount: number;
// }

// const { btBaseApi } = useRuntimeConfig().public;
// const { data: banks } = await useFetch(`${btBaseApi}/bancos`)

const activeComponent = computed(() => isAuthenticated.value ? AppWizard : AppLogin);

provide('isAuthenticated', isAuthenticated);
provide('isLoading', isLoading);

// const user = reactive<UserObject>({
//   name: '',
//   ci: '',
//   contract: '',
//   amount: 0
// })

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