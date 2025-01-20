export default function useValidations() {
  const form = inject("form") as Latam.Form;
  const showOtp = inject("showOtp") as Ref<boolean>;
  const paymentOption = inject("paymentOption") as Ref<Latam.PaymentOption>;
  const paymentMethod = inject("paymentMethod") as Ref<Latam.PaymentMethod>;

  function pagoMovilValidation() {
    if (paymentOption.value === "miBanco" && !showOtp.value) {
      return (
        form.phone.length > 0 &&
        form.ci.length > 0 &&
        form.bank.length > 0 &&
        form.paymentDate.length > 0
      );
    }

    if (paymentOption.value === "miBanco" && showOtp.value) {
      return (
        form.phone.length > 0 &&
        form.ci.length > 0 &&
        form.bank.length > 0 &&
        form.paymentDate.length > 0 &&
        form.otp!.length > 0
      );
    }

    return (
      form.phone.length > 0 &&
      form.ci.length > 0 &&
      form.bank.length > 0 &&
      form.paymentDate.length > 0 &&
      form.dynamicKey.length > 0 &&
      form.type!.length > 0
    );
  }

  function transferenceValidation() {
    return (
      form.accountNumber!.length > 0 &&
      form.bank.length > 0 &&
      form.paymentDate.length > 0 &&
      form.reference!.length > 0
    );
  }

  function checkPaymentReportValidation() {
    if (paymentMethod.value === "pagoMovil") {
      return pagoMovilValidation();
    }

    if (paymentMethod.value === "transference") {
      return transferenceValidation();
    }

    return false;
  }

  return {
    pagoMovilValidation,
    transferenceValidation,
    checkPaymentReportValidation,
  };
}
