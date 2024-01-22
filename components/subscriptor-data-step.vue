<template>
    <div v-if="stepper.isCurrent('subscriptor-data')" class="subscriptor-data">
      <base-input
        label="Número de contrato"
        id="contract"
        name="contract"
        disabled
      />
      <base-input
        label="Nombre y Apellido"
        id="fullname"
        name="fullname"
        disabled
      />
      <base-input label="Cédula de identidad" id="ci" name="ci" disabled />
      <div class="amount-wrapper">
        <base-input label="Monto a pagar" id="amount" name="amount" disabled />
        <button class="amount-wrapper__btn" @click="() => copy(userData.datos?.[0].servicios?.[0].costo ?? '')">
          <font-awesome-icon :icon="copied ? 'check' : 'copy'" />
        </button>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useClipboard } from '@vueuse/core';

const stepper = inject("stepper") as any;
const userData = inject("userData") as Latam.UserData;
const form = inject("form") as Latam.Form;

const { setValues } = useForm();
const { copy, copied } = useClipboard({
  legacy: true
});

setValues({
  contract: form.contract,
  fullname: userData.datos?.[0].nombre,
  ci: userData.datos?.[0].cedula,
  amount: userData.datos?.[0].servicios?.[0].costo
});
</script>

<style lang="scss">
.subscriptor-data {
  display: flex;

  .amount-wrapper {
    position: relative;

    &__btn {
      position: absolute;
      right: 4.5rem;
      top: 2.7rem;
      border: none;
    }
  }

  & .formulario__form__grupo {
    width: 286px;
  }

  & .formulario__form__grupo input {
    width: 14rem !important;
  }
}
</style>
