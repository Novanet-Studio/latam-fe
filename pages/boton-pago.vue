<template>
  <main class="internetvista" style="position: relative;">
    <!-- <app-login /> -->
    <app-wizard />
    <!-- <div v-if="isLoading" style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgba(255, 255, 255, 1); z-index: 100;">
      <app-loader />
    </div> -->
        <!-- <payment-form /> -->
    <!-- <form v-if="!showPaymentForm" @submit.prevent="handleSubmit">
      <div>
        <label for="ci">Número de cédula</label>
        <input id="ci" type="text" name="ci" placeholder="Ejemplo V00000000" v-model="ci">
      </div>
      <div>
        <button type="submit">Buscar</button>
      </div>
    </form>

    <AppLoader v-if="isLoading" />

    <div v-if="userFound && !showPaymentForm">
      <table class="my-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cedula</th>
            <th>Nro Contrato</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ user?.name }}</td>
            <td>{{ user?.ci }}</td>
            <td>{{ user?.contract }}</td>
            <td>{{ user?.amount }}</td>
          </tr>
        </tbody>
      </table>

      <button @click="showPaymentForm = true">Pagar</button>
    </div>

    <Transition name="slide-fade">
      <form v-if="showPaymentForm">
        <div>
          <label for="bank">Banco Emisor</label>
          <select id="bank" name="bank"></select>
        </div>
        <div>
          <label for="reference">Referencia</label>
          <input id="reference" type="text" placeholder="Referencia completa">
        </div>
        <div>
          <label for="phone">Teléfono del titular de la cuenta bancaria</label>
          <input type="text">
        </div>
        <div>
          <label for="phone">Monto</label>
          <input type="text" disabled value="1363,49">
        </div>
        <div>
          <button @click="processPayment">Procesar</button>
          <button @click="showPaymentForm = false">Volver</button>
        </div>
      </form>
    </Transition> -->

  </main>
</template>

<script setup lang="ts">
const showPaymentForm = ref(false);
const userFound = ref(false)
const isLoading = ref(false)
const ci = ref('')

const { btBaseApi } = useRuntimeConfig().public;

const { data: banks } = await useFetch(`${btBaseApi}/bancos`)

interface UserObject {
  name: string;
  ci: string;
  contract: string;
  amount: number;
}

const user = reactive<UserObject>({
  name: '',
  ci: '',
  contract: '',
  amount: 0
})

function handleSubmit() {
  isLoading.value = true;
  if (ci.value === 'V12345678') {
    setTimeout(() => {
      userFound.value = true
      isLoading.value = false;

      Object.assign(user, {
        name: 'John',
        ci: 'V12345678',
        contract: '12345678901',
        amount: 500
      })

    }, 2000);
  }
}

function processPayment() {}
</script>


<style lang="scss">
.my-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #ddd;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f5f5f5;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #ddd;
  }
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