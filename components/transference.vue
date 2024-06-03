<script lang="ts" setup>
import { useForm } from "vee-validate";
const form = inject("form") as Latam.Form;

const {
  dateLocale,
  banksOptions,
  handlePayload,
} = await usePaymentReport();

const { values, validate } = useForm({
  initialValues: {
    account: "",
    bank: "",
    paymentDate: new Date(),
    reference: "",
  },
  // validationSchema: schema,
});

watch(values, async () => {
  const res = await validate();

  if (res.valid) {
    const payload = handlePayload({
      form,
      values,
      paymentMethod: "transference",
    });

    Object.assign(form, payload);
  }
});

</script>

<template>
  <section class="main-section">
    <select-input
      label="Banco emisor"
      id="bank"
      name="bank"
      default-text="Selecciona el banco"
      :options="banksOptions"
    />
    <base-input
      label="Número de cuenta"
      id="account"
      name="account"
      placeholder="Ej: 1234567890..."
    />
    <base-input
      label="Referencia"
      id="reference"
      name="reference"
      placeholder="123456"
    />
    <date-picker-input
      label="Fecha del pago"
      placeholder="Selecccione la fecha"
      format="dd-MM-yyyy"
      :locale="dateLocale"
      id="paymentDate"
      name="paymentDate"
    />
  </section>
</template>

<style lang="scss" scoped>
.main-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  margin-top: 3rem;
}
</style>
