<script lang="ts" setup>
import { useForm } from "vee-validate";
import banks from "@/data/banks.json";

const form = inject("form") as Latam.Form;
const showOtp = inject("showOtp") as Ref<boolean>;
const paymentOption = inject("paymentOption") as Ref<Latam.PaymentOption>;
const paymentMethod = inject("paymentMethod") as Ref<Latam.PaymentMethod>;

const { copy, copied } = useClipboard({
  legacy: true,
});

const {
  dateLocale,
  amountVes,
  schema,
  // banksOptions,
  capitalize,
  handlePayload,
} = await usePaymentReport(paymentMethod.value);
const vesUsd = useBcvUsd();

// Get banks from json
const banksOptions = banks.map(({ legalName, code }) => ({
  text: legalName,
  value: code,
}));

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

const typeOptions = [
  {
    text: "V",
    value: "V",
  },
  {
    text: "E",
    value: "E",
  },
  {
    text: "J",
    value: "J",
  },
  {
    text: "P",
    value: "P",
  },
  {
    text: "R",
    value: "R",
  },
  {
    text: "G",
    value: "G",
  },
  {
    text: "C",
    value: "C",
  },
];

setFieldValue("amount", "Bs.S " + form.amount);

watch(vesUsd, () => {
  console.log(`<<< vesUsd.value >>>`, vesUsd.value);

  const value = Number(vesUsd.value) * Number(form.amount);
  const amount = transformAmount(value.toString(), true);
  amountVes.value = amount;

  setFieldValue("amount", "Bs.S " + amount);
});

watch(
  () => values.ci,
  (ci) => {
    const capitalized = capitalize(ci);
    setFieldValue("ci", capitalized);
  }
);

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
    <div class="group">
      <select-input
        label="Tipo"
        id="type"
        name="type"
        default-text="Tipo de documento"
        :options="typeOptions"
      />
      <base-input
        style="width: 12rem"
        label="Cédula de identidad"
        id="ci"
        name="ci"
        placeholder="Ejemplo: 00000000"
      />
    </div>
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
      v-if="paymentOption !== 'miBanco'"
      label="Clave dinámica"
      id="dynamicKey"
      name="dynamicKey"
      placeholder="123456"
    />
    <base-input
      v-if="paymentOption === 'miBanco' && showOtp"
      label="Clave de pago"
      id="otp"
      name="otp"
      placeholder="543210"
    />
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
@import "@/assets/scss/_mixins.scss";

.main-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.main-section .group {
  display: flex;
  gap: 1rem;
  width: 100%;

  :deep(.formulario__form__grupo #ci) {
    width: 15rem !important;
  }
}

.group :deep(.formulario__form__grupo #type) {
  width: 4rem !important;
  margin-left: 1rem !important;
}

.group :deep(.formulario__form__grupo label[for="type"]) {
  margin-left: 1rem !important;
}

/*----------------------------------- Mobile Portrait (320px) -----------------------------------*/
@include responsive(20em) {
  .main-section {
    margin-top: 1rem;
    grid-template-columns: repeat(1, 1fr);
    gap: 0;

    .group :deep(.formulario__form__grupo #type) {
      width: 3rem !important;
      margin-left: 0;
    }

    .group :deep(.formulario__form__grupo #ci) {
      width: 10rem !important;
    }
    .group {
      display: flex;
      justify-content: center;
    }
  }
}

/*---- 
  Tablet Portrait (768px)
----*/
@include responsive(48em) {
  .main-section {
    .group {
      width: 28rem;
      justify-content: inherit;
    }

    .group :deep(.formulario__form__grupo #type) {
      width: 4rem !important;
    }

    .group :deep(.formulario__form__grupo #ci) {
      width: 20rem !important;
    }
  }
}

/*---- 
  Small Desktop (1280px)
----*/
@include responsive(80em) {
  .main-section {
    grid-template-columns: repeat(3, 1fr);
  }

  .main-section .group {
    width: 18rem;
  }

  .main-section .group :deep(.formulario__form__grupo #ci) {
    width: 10rem !important;
  }
}

/*---- 
  Large Desktop (1920px)
----*/
@include responsive(120em) {
  .main-section .group {
    justify-content: center;
  }
}
</style>
