<script lang="ts" setup>
import { useForm } from "vee-validate";
import { object, string, date } from "yup";

interface BankData {
  nombre: string;
  codigo: string;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const dateLocale = ref("es-VE");
const amountVes = ref("");
const stepper = inject("stepper") as any;
// const userData = inject("userData") as Latam.UserData;
const form = inject("form") as Latam.Form;

const { copy, copied } = useClipboard({
  legacy: true,
});

const schema = object({
  phone: string().required("El campo es requerido"),
  ci: string().required("El campo es requerido").test('regex', 'Formato de cédula incorrecto', (item, _content) => {
    const ciRegex = /^V\d{6,}$/;

    return ciRegex.test(item);
  }),
  bank: string().required("El campo es requerido"),
  paymentDate: date().required("El campo es requerido"),
  dynamicKey: string().required("El campo es requerido"),
  amount: string(),
});

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

const { latamServicesApiUrl } = useRuntimeConfig().public;
const { data: banks } = await useFetch<BankData[]>(
  `${latamServicesApiUrl}/bancos`,
  {
    method: "POST",
  }
);

const vesUsd = useBcvUsd();

const banksOptions = computed(() => {
  return (
    banks.value?.map((bank: BankData) => ({
      text: bank.nombre,
      value: bank.codigo,
    })) || []
  );
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
    const value = Number(vesUsd.value) * Number(form.amount);
    const vesAmount = transformAmount(value.toString(), true);
    const date = new Date(values.paymentDate);

    const payload: Partial<Latam.Form> = {
      vesAmount,
      amount: form.amount,
      phone: values.phone,
      ci: values.ci,
      bank: values.bank,
      paymentDate: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      dynamicKey: values.dynamicKey,
    };

    Object.assign(form, payload);
  }
});
</script>

<template>
  <div v-if="stepper.isCurrent('payment-report')" class="payment-report">
    <base-input label="Teléfono" id="phone" name="phone" placeholder="Ejemplo: 04123456789" />
    <base-input label="Cédula de identidad" id="ci" name="ci" placeholder="Ejemplo: V00000000"  />
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
    <base-input label="Clave dinámica" id="dynamicKey" name="dynamicKey" placeholder="123456" />
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
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.payment-report {
  margin-top: 2rem;
  width: 100% !important;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);

  select {
    background: #fff;

    &#bank {
      width: 21rem;
      padding: 0.5rem;
    }
  }

  .amount-wrapper {
    position: relative;

    &__btn {
      position: absolute;
      right: 0.5rem;
      top: 2.5rem;
      border: none;
    }
  }

  & .formulario__form__grupo input {
    width: 20rem !important;
  }

  .id-group {
    display: flex;
    gap: 1rem;

    .formulario__form__grupo:has(select) {
      width: 4rem;
    }

    input#type {
      width: 0.8rem;
    }

    input {
      width: 16rem !important;
    }
  }
}

/*---- 
  Mobile Portrait (320px)
----*/
@include responsive(20em) {
  .payment-report {
    grid-template-columns: 1fr;
    place-items: flex-start;

    select {
      &#bank {
        width: 15rem;
        padding: 0.5rem;
      }
    }

    & .formulario__form__grupo input {
      width: 15rem !important;
    }

    .id-group {
      gap: 1rem;

      .formulario__form__grupo:has(select) {
        width: 3rem;
      }

      input {
        width: 11rem !important;
      }
    }
  }
}

/*---- 
  Tablet Portrait (768px)
----*/
@include responsive(48em) {
  .payment-report {
    grid-template-columns: 1fr;
    place-items: center;

    select {
      &#bank {
        width: 25rem;
        padding: 0.5rem;
      }
    }

    & .formulario__form__grupo input {
      width: 25rem !important;
    }

    .id-group {
      .formulario__form__grupo:has(select) {
        width: 5rem;
      }

      input {
        width: 19rem !important;
      }
    }
  }
}

/*---- 
  Small Desktop (1280px)
----*/
@include responsive(80em) {
  .payment-report {
    grid-template-columns: repeat(3, 1fr);
    place-items: center;

    select {
      &#bank {
        width: 15rem;
        padding: 0.5rem;
      }
    }

    & .formulario__form__grupo input {
      width: 15rem !important;
    }

    .id-group {
      .formulario__form__grupo:has(select) {
        width: 4rem;
      }

      input {
        width: 12rem !important;
      }
    }
  }
}
</style>
