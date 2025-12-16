<script lang="ts" setup>
import { useForm } from "vee-validate";
import { object, string, date } from "yup";
import { paymentMapper } from "~/utils/mapper";
import banks from "../utils/banks";
import {
  getPaymentMessageQuery,
  postCreatePaymentQuery,
} from "~/schemas/payment-queries";

const mensaje_formulario = ref("");
const isSendingForm = ref(false);
const isModalVisible = ref(false);
const dateLocale = ref("es-VE");

const graphql = useStrapiGraphQL();
const bcvUsd = useBcvUsd();

const schema = object({
  fullname: string().required("El campo es requerido"),
  identification: string()
    .matches(/^[0-9]+$/, "Deben ser solo dígitos")
    .required("El campo es requerido"),
  contractNumber: string()
    .matches(/^[0-9]+$/, "Deben ser solo dígitos")
    .required("El campo es requerido"),
  zone: string().required("El campo es requerido"),
  paymentWay: string().required("El campo es requerido"),
  amount: string().required("El campo es requerido"),
  transactionNumber: string()
    .matches(/^[0-9]+$/, "Deben ser solo dígitos")
    .required("El campo es requerido"),
  issuingBank: string().required("El campo es requerido"),
  date: date().required("El campo es requerido"),
  // dtb = Datos Titular Cuenta Bancaria
  dtbFullname: string().required("El campo es requerido"),
  dtbPhone: string().required("El campo es requerido"),
  dtbEmail: string()
    .email("Email no es válido")
    .required("El campo es requerido"),
  dtbIdentification: string()
    .matches(/^[0-9]+$/, "Deben ser solo dígitos")
    .required("El campo es requerido"),
});

const { handleSubmit, values, errors, resetForm } =
  useForm<Latam.PaymentFormData>({
    initialValues: {
      fullname: "",
      identification: "",
      contractNumber: "",
      amount: "",
      zone: "",
      paymentWay: "",
      transactionNumber: "",
      issuingBank: "",
      date: new Date(),
      dtbFullname: "",
      dtbPhone: "",
      dtbEmail: "",
      dtbIdentification: "",
    },
    validationSchema: schema,
  });

const paymentOptions = [
  {
    text: "Transferencia bancaria",
    value: "transferencia_bancaria",
  },
  {
    text: "Pago móvil",
    value: "pago_movil",
  },
];

const bankOptions = banks.map(({ name }) => ({
  text: name,
  value: name,
}));

const showModal = () => (isModalVisible.value = true);
const closeModal = () => (isModalVisible.value = false);

const isButtonDisabled = computed(() => {
  const allValues = Object.values(values);
  const len = allValues.length;
  const inputs = allValues.filter((value) => value);
  const inputErrors = Object.keys(errors.value).length;

  if (inputErrors > 0) return true;
  if (inputs.length !== len) return true;

  return false;
});

const submitForm = handleSubmit(async (values) => {
  try {
    isSendingForm.value = true;
    const data = paymentMapper(values);
    await graphql<any>(postCreatePaymentQuery, { data });
    showModal();
  } catch (err) {
    console.log(err);
    alert("Hubo un error al registrar tu pago.");
  } finally {
    isSendingForm.value = false;
    resetForm();
  }
});

const { data: planesInternet } = await useAsyncData(
  "form-message-payment",
  async () => {
    try {
      const response = await graphql<any>(getPaymentMessageQuery);

      if (response?.data?.mensaje_formulario) {
        return response?.data?.mensaje_formulario;
      }

      return "";
    } catch (error) {
      console.error(error);
      return "";
    }
  },
  {
    default: () => [],
  }
);

mensaje_formulario.value = planesInternet.value;
</script>

<template>
  <section class="formulario formreporte">
    <h2 class="formulario__titulo">Confirmación de Pagos TV por cable</h2>
    <p class="formulario__texto">
      {{ mensaje_formulario }} <br />
      Tipo de cambio de referencia BCV $USD {{ bcvUsd }} Bs.
    </p>
    <form class="formulario__form" @submit.prevent="submitForm">
      <h3 class="formulario__form__titulo">Datos titular contrato</h3>
      <base-input label="Nombre y Apellido" id="fullname" name="fullname" />
      <base-input
        label="Cédula de identidad"
        id="identification"
        name="identification"
      />
      <base-input
        label="Número de contrato"
        id="contractNumber"
        name="contractNumber"
      />
      <base-input label="Zona" id="zone" name="zone" />

      <h3 class="formulario__form__titulo">Datos forma de pago</h3>

      <select-input
        label="Zona"
        default-text="Seleccione forma de pago"
        id="paymentWay"
        name="paymentWay"
        :options="paymentOptions"
      />

      <base-input
        label="Número de transacción"
        id="transactionNumber"
        name="transactionNumber"
      />

      <select-input
        label="Banco emisor"
        default-text="Seleccione un banco"
        id="issuingBank"
        name="issuingBank"
        :options="bankOptions"
      />

      <date-picker-input
        label="Fecha de operación"
        placeholder="Selecccione la fecha"
        format="dd-MM-yyyy"
        :locale="dateLocale"
        name="date"
      />

      <form-currency label="Monto" id="amount" name="amount" />

      <h3 class="formulario__form__titulo">Datos titular cuenta bancaria</h3>

      <base-input
        label="Nombre y apellido"
        id="dtbFullname"
        name="dtbFullname"
      />
      <base-input label="Teléfono" id="dtbPhone" name="dtbPhone" />
      <base-input
        label="Cédula de identidad"
        id="dtbIdentification"
        name="dtbIdentification"
      />
      <base-input label="Correo electrónico" id="dtbEmail" name="dtbEmail" />

      <form-button
        type="submit"
        :is-loading="isSendingForm"
        :disabled="isButtonDisabled"
      >
        Reportar pago
      </form-button>
    </form>
    <Modal
      v-show="isModalVisible"
      title="Tu pago ha sido reportado"
      text="Gracias por enviarnos la información de pago. Para cualquier otra información por favor envíanos un mensaje por WhatsApp"
      @close="closeModal"
    />
  </section>
</template>
