import { inject } from "vue";
import { useStepper } from "@vueuse/core";

import CheckSubscriptionStep from "~/components/check-subscription-step.vue";
import PaymentOptionStep from "~/components/payment-option-step.vue";
import SubscriptorDataStep from "~/components/subscriptor-data-step.vue";
import PaymentReportStep from "~/components/payment-report-step.vue";
import StatusStep from "~/components/status-step.vue";

export default function useStepperApp() {
  const form = inject("form") as Latam.Form;
  const paymentOption = inject("paymentOption") as Ref<Latam.PaymentOption>;
  const showOtp = inject("showOtp") as Ref<boolean>;
  const { checkPaymentReportValidation } = useValidations();

  const stepper = useStepper({
    "check-subscription": {
      title: "Contrato de servicio",
      isValid: () => form.contract.length > 0,
    },
    "payment-option": {
      title: "Medio de pago",
      isValid: () => paymentOption.value.length > 0,
    },
    "subscriptor-data": {
      title: "Datos del subscriptor",
      isValid: () => true,
    },
    "payment-report": {
      title: "Reporte de pago",
      isValid: () => checkPaymentReportValidation(),
    },
    status: {
      title: "Estatus de pago",
      isValid: () => true,
    },
  });

 const activeComponent = computed(() => {
    if (stepper.isCurrent("check-subscription")) {
      return CheckSubscriptionStep;
    } else if (stepper.isCurrent("payment-option")) {
      return PaymentOptionStep;
    } else if (stepper.isCurrent("subscriptor-data")) {
      return SubscriptorDataStep;
    } else if (stepper.isCurrent("payment-report")) {
      return PaymentReportStep;
    } else if (stepper.isCurrent("status")) {
      return StatusStep;
    }
  });

  const isFirstOrLast = computed(
    () => stepper.isFirst.value || stepper.isLast.value
  );

  const nextBtnLabel = computed(() => {
    if (stepper.isLast.value) {
      if (form.status === "success") {
        return "Regresar al inicio";
      }

      if (form.status === "pending") {
        return "...";
      }

      return "Intentar de nuevo";
    } else if (
      stepper.isCurrent("payment-report") &&
      paymentOption.value === "miBanco" &&
      !showOtp.value
    ) {
      return "Solicitar clave";
    } else if (
      (stepper.isCurrent("payment-report") &&
        paymentOption.value === "miBanco" &&
        showOtp.value) ||
      (stepper.isCurrent("payment-report") &&
        paymentOption.value === "bancoTesoro")
    ) {
      return "Confirmar";
    } else {
      return "Siguiente";
    }
  });

  function allStepsBeforeAreValid(index: number): boolean {
    return !Array(index)
      .fill(null)
      .some((_, i) => !stepper.at(i)?.isValid());
  }

  return {
    stepper,
    activeComponent,
    isFirstOrLast,
    nextBtnLabel,
    allStepsBeforeAreValid,
  };
}
