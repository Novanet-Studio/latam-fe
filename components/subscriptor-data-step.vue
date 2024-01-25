<script lang="ts" setup>
import { useForm } from "vee-validate";
import { useClipboard } from "@vueuse/core";

const stepper = inject("stepper") as any;
const userData = inject("userData") as Latam.UserData;
const form = inject("form") as Latam.Form;

const { setValues } = useForm();
const { copy, copied } = useClipboard({
  legacy: true,
});

const data = userData.datos?.[0].servicios?.find(
  (item: Latam.ServiciosEntity) => item.id === Number(form.contract)
);

setValues({
  contract: form.contract,
  fullname: userData.datos?.[0].nombre,
  ci: userData.datos?.[0].cedula,
  amount: formatAmount(data?.costo),
});

form.fullName = userData.datos?.[0]?.nombre || "";
</script>

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
      <button
        type="button"
        class="amount-wrapper__btn"
        @click.prevent="
          () => copy(userData.datos?.[0].servicios?.[0].costo ?? '')
        "
      >
        <font-awesome-icon :icon="copied ? 'check' : 'copy'" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.subscriptor-data {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;

  .amount-wrapper {
    position: relative;

    &__btn {
      position: absolute;
      right: 0.5rem;
      top: 2.7rem;
      border: none;
    }
  }

  & .formulario__form__grupo input {
    width: 14rem !important;
  }
}
</style>
