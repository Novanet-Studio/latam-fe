interface UseWizardParams {
  stepper: any;
  billingData: Latam.Billing;
}

export default function useWizardSubmit({
  stepper,
  billingData,
}: UseWizardParams) {
  const form = inject("form") as Latam.Form;
  const paymentMethod = inject("paymentMethod") as Ref<Latam.PaymentMethod>;
  const isSending = inject("isSending") as Ref<boolean>;
  const showOtp = inject("showOtp") as Ref<boolean>;

  const { executeCheckDebts } = useLatamServices();
  const { pagoMovilPayment, transferencePayment } = usePayments({
    stepper,
    billingData,
  });

  const router = useRouter();

  async function submit() {
    if (stepper.isCurrent("subscriptor-data")) {
      const notification = push.promise("Procesando solicitud...");
      isSending.value = true;

      try {
        const { data: billing } = await executeCheckDebts(form.ci);

        if (billing.value?.code === "160") {
          notification.resolve("No tienes facturas por pagar");
          return;
        }

        form.amount = billing.value!.facturas[0].valor;

        Object.assign(billingData, billing.value!.facturas[0]);

        notification.resolve("Consulta realizada");
        stepper.goToNext();

        return;
      } catch (error: any) {
        notification.reject(error.message);
      } finally {
        isSending.value = false;
      }
    }

    if (
      stepper.isCurrent("payment-report") &&
      !stepper.current.value!.isValid()
    ) {
      push.info("Debe completar todos los campos");
      return;
    }

    if (
      stepper.isCurrent("payment-report") &&
      showOtp.value &&
      form.otp!.length < 6
    ) {
      push.info("La clave pago debe contener al menos 6 digitos");
      return;
    }

    if (
      stepper.isCurrent("payment-report") &&
      stepper.current.value!.isValid()
    ) {
      if (paymentMethod.value === "pagoMovil") {
        pagoMovilPayment();
      } else if (paymentMethod.value === "transference") {
        transferencePayment();
      }

      return;
    }

    if (form.status === "error") {
      console.log(`<<< te tengo >>>`);

      form.errorMessage = "";

      stepper.goTo("subscriptor-data");
    }
    if (form.status === "success" && stepper.isLast.value) router.push("/");
    if (stepper.current.value!.isValid()) {
      stepper.goToNext();
    }
  }

  return submit;
}
