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
      <base-input label="Monto a pagar" id="amount" name="amount" disabled />
    </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';

const stepper = inject("stepper") as any;
const userData = inject("userData") as Latam.UserData;
const form = inject("form") as Latam.Form;

const { setValues } = useForm();

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

  & .formulario__form__grupo {
    width: 286px;
  }

  & .formulario__form__grupo input {
    width: 14rem !important;
  }
}
</style>
