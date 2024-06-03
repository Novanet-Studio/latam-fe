<script lang="ts" setup>
import { useForm } from "vee-validate";

const form = inject("form") as Latam.Form;

const { copy, copied } = useClipboard({
  legacy: true,
});

const {
  dateLocale,
  amountVes,
  schema,
  banksOptions,
  capitalize,
  handlePayload,
} = await usePaymentReport();
const vesUsd = useBcvUsd();

const { setFieldValue, values, validate } = useForm({
  initialValues: {
    phone: "",
    ci: "",
    bank: "",
    paymentDate: new Date(),
    dynamicKey: "",
    amount: "",
  },
  validationSchema: schema,
});


setFieldValue("amount", "Bs.S " + form.amount);

watch(vesUsd, () => {
  const value = Number(vesUsd.value) * Number(form.amount);
  const amount = transformAmount(value.toString(), true);
  amountVes.value = amount;

  setFieldValue("amount", "Bs.S " + amount);
});

watch(() => values.ci, (ci) => {
  const capitalized = capitalize(ci);
  setFieldValue("ci", capitalized);
})

watch(values, async () => {
  const res = await validate();

  if (res.valid) {
    const payload = handlePayload({
      form,
      values,
    });

    Object.assign(form, payload);
  }
});

</script>

<template>
  <section class="main-section">
    <base-input
      label="Teléfono"
      id="phone"
      name="phone"
      placeholder="Ejemplo: 04123456789"
    />
    <base-input
      label="Cédula de identidad"
      id="ci"
      name="ci"
      placeholder="Ejemplo: V00000000"
    />
    <select-input
      label="Banco emisor"
      id="bank"
      name="bank"
      default-text="Selecciona el banco"
      :options="banksOptions"
    />
    <date-picker-input
      label="Fecha de operación"
      placeholder="Selecccione la fecha"
      format="dd-MM-yyyy"
      :locale="dateLocale"
      id="paymentDate"
      name="paymentDate"
    />
    <base-input
      label="Clave dinámica"
      id="dynamicKey"
      name="dynamicKey"
      placeholder="123456"
    />
    <!-- <base-input label="Monto" id="amount" name="amount" readonly /> -->
    <div class="amount-wrapper">
      <base-input label="Monto a pagar" id="amount" name="amount" readonly />
      <button
        type="button"
        class="amount-wrapper__btn"
        @click.prevent="() => copy(amountVes ?? '')"
      >
        <font-awesome-icon :icon="copied ? 'check' : 'copy'" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.main-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 1rem;
  margin-top: 3rem;
}
</style>