<template>
  <div v-if="stepper.isCurrent('payment-report')" class="payment-report">
    <base-input label="Teléfono" id="phone" name="phone" />
    <base-input label="Cédula de identidad" id="ci" name="ci" />
    <select-input
      v-if="banksOptions"
      label="Banco emisor"
      id="bank"
      name="bank"
      default-text="Selecciona el banco"
      :options="banksOptions"
    />
    <date-picker-input label="Fecha de operación" placeholder="Selecccione la fecha" format="dd-MM-yyyy" :locale="dateLocale" id="paymentDate" name="paymentDate" />
    <base-input label="Numero de referencia" id="reference" name="reference" />
    <base-input label="Monto" id="amount" name="amount" disabled />
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string, date } from "yup";

const dateLocale = ref("es-VE");
const stepper = inject("stepper") as any;
const userData = inject("userData") as Latam.UserData;

const schema = object({
  phone: string().required("El campo es requerido"),
  ci: string().required("El campo es requerido"),
  bank: string().required("El campo es requerido"),
  paymentDate: date().required("El campo es requerido"),
  reference: string().required("El campo es requerido"),
  amount: string(),
});

const { setFieldValue } = useForm({
  initialValues: {
    phone: '',
    ci: '',
    bank: '',
    paymentDate: new Date(),
    reference: '',
    amount: '',
  },
  validationSchema: schema,
  validateOnMount: true,
});

const { btBaseApi } = useRuntimeConfig().public;
const { data: banks } = await useFetch<{ nombre: string; codigo: string }[]>(`${btBaseApi}/bancos`, {
  method: 'POST'
})

const banksOptions = computed(() => {
  return banks.value?.map((bank: any) => ({
    text: bank.nombre,
    value: bank.codigo
  })) || []
});

setFieldValue('amount', 'Bs.S ' + userData.datos?.[0].servicios?.[0].costo);
</script>

<style lang="scss">
.payment-report {
  margin-top: 2rem;
  width: 100% !important;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);

  select {
    width: 21rem;
    background: #fff;
    padding: .5rem;
  }

  & .formulario__form__grupo input {
    width: 20rem !important;
  }
}
</style>
