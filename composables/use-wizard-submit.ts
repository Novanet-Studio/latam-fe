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
  const isLoading = inject("isLoading") as Ref<boolean>;

  const { executeCheckDebts } = useLatamServices();
  const { pagoMovilPayment, transferencePayment } = usePayments({
    stepper,
    billingData,
  });

  const router = useRouter();

  async function submit() {
    if (stepper.isCurrent("subscriptor-data")) {
      const notification = push.promise("Procesando solicitud...");
      isLoading.value = true;

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
        isLoading.value = false;
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
      stepper.current.value!.isValid()
    ) {
      if (paymentMethod.value === "pagoMovil") {
        pagoMovilPayment();
      } else if (paymentMethod.value === "transference") {
        transferencePayment();
      }

      return;
    }

    if (form.status === "error") stepper.goTo("subscriptor-data");
    if (form.status === "success" && stepper.isLast.value) router.push("/");
    if (stepper.current.value!.isValid()) stepper.goToNext();
  }

  return submit;
}
