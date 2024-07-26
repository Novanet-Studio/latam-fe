<script setup lang="ts">
import AppLogin from "~/components/app-login.vue";
import AppWizard from "~/components/app-wizard.vue";
import { getCode } from "~/data/codes"

const { public: { latamServicesApiUrl } } = useRuntimeConfig();
const NOTIFY_SSE_URL = `${latamServicesApiUrl}/api/v1/mibanco/notify`;

const { status, data, error, close, open } = useEventSource(NOTIFY_SSE_URL, undefined, {
  immediate: false,
  autoReconnect: true
});

useHead({
  meta: [
    {
      "http-equiv": "Content-Security-Policy",
      content: "upgrade-insecure-requests",
    },
  ],
});

const isAuthenticated = ref(false);
const isLoading = ref(false);
const isSending = ref(false);
const paymentMethod = ref<Latam.PaymentMethod>("pagoMovil");
const paymentOption = ref<Latam.PaymentOption>("");
const userData = reactive<Latam.UserData>({
  estado: "",
  datos: null,
});

const form = reactive<Latam.Form>({
  ci: "",
  contract: "",
  fullName: "",
  amount: 0,
  vesAmount: "",
  phone: "",
  bank: "",
  paymentDate: "",
  dynamicKey: "",
  status: "", // error | pending | success
});

const showOtp = ref(false)
const count = ref(0)

const activeComponent = computed(() =>
  isAuthenticated.value ? AppWizard : AppLogin
);

provide("form", form);
provide("paymentMethod", paymentMethod)
provide("paymentOption", paymentOption)
provide("userData", userData);
provide("isLoading", isLoading);
provide("isSending", isSending);
provide("isAuthenticated", isAuthenticated);
provide("showOtp", showOtp);
provide("sse", { status, data, error, close, open });

watch(data, () => {
  console.log('status ->', status.value)
  console.log('data ->', data.value)
  if (status.value === "OPEN" && data.value) {
    const msgId = atob(localStorage.getItem("msgId") || "");
    const parsed = JSON.parse(data.value);

    // This means something went wrong
    if (parsed?.message === "OK") {
      push.warning({
        title: "Estatus de pago",
        message: "El pago ha sido aceptado, mas no procesado, revise sus datos o intente mas tarde",
      })

      form.status = "success";
      close()
      return
    }
    
    const statusCode = parsed?.CstmrPmtStsRpt?.OrgnlGrpInfAndSts?.GrpSts;

    if (!statusCode) {
      push.warning({
        title: "Estatus de pago",
        message: "El pago ha sido aceptado, mas no procesado, revise sus datos o intente mas tarde",
      })

      form.status = "success";
      close()
      return
    }

    if (statusCode === "ACCP") {
        push.success({
          title: "Estatus de pago",
          message: getCode(statusCode),
        })
        form.status = "success";
      } else {
        push.error({
          title: "Estatus de pago",
          message: getCode(statusCode),
        })
        form.status = "error";
      }

    if (msgId === parsed.CstmrPmtStsRpt.GrpHdr.MsgId) {
      //TODO: verify if its the same request (?)
    }

    setTimeout(() => {
      close()
    }, 3000)
  }
})

watch(error, () => {
  if (error.value) {
    count.value++
  }

  if (count.value === 5) {
    push.error({
      title: "Estatus de pago",
      message: "No hubo respuesta del servidor.",
    })
    form.status = "error";
    close()
  }
})
</script>

<template>
  <main class="report-view">
    <section class="hero">
      <div class="hero__internet">
        <div class="hero__internet__box">
          <div class="hero__internet__icon"></div>
          <div class="hero__internet__info">
            <h1 class="hero__internet__title">Realiza tus pagos</h1>
            <p class="hero__internet__text">
              Ponemos a tu disposición el botón de pago del Banco del Tesoro
              para que puedas pagar de forma rápida y segura
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="payment">
      <h2 class="payment__title">Haz tus pagos de forma rápida y segura</h2>
      <p>
        Sigue las indicaciones del formulario multipasos mostrado a
        continuación, las datos de acceso son los mismos que utilizas en el
        portal Acceso a Clientes. Una vez realizado el pago es obligatorio hacer
        la notificacion del mismo por WhatsApp al 0414 3021751.
      </p>
    </section>

    <section class="report">
      <div v-if="isLoading" class="loader-wrapper">
        <app-loader class="loader-wrapper__main" />
      </div>

      <transition name="fade" mode="out-in">
        <component :is="activeComponent" />
      </transition>
    </section>
  </main>
</template>

<style scoped lang="scss">
.loader-wrapper__main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  z-index: 100;
}
</style>
