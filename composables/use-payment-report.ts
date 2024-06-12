import { object, string, date } from "yup";

export default async function (method = "bancoTesoro") {
  const dateLocale = useState("dateLocale", () => "es-VE");
  const amountVes = useState("amountVes", () => "");

  const vesUsd = useBcvUsd();
  const { executeGetBanks } = useLatamServices();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const { data: banks } = await executeGetBanks();

  const banksOptions = computed(() => {
    return (
      banks.value?.map((bank: { nombre: string; codigo: string }) => ({
        text: bank.nombre,
        value: bank.codigo,
      })) || []
    );
  });

  const schema = object({
    phone: string().required("El campo es requerido"),
    ci: string()
      .required("El campo es requerido")
      .test(
        "regex",
        "Formato de cédula incorrecto",
        (item: any, _content: any) => {
          const ciRegex = /^V\d{6,}$/;

          return ciRegex.test(item);
        }
      ),
    bank: string().required("El campo es requerido"),
    paymentDate: date().required("El campo es requerido"),
    ...(method === "bancoTesoro"
      ? {
          dynamicKey: string().required("El campo es requerido"),
        }
      : {}),
    amount: string(),
  });

  const handlePayload = ({
    values,
    form,
    paymentMethod = "pagoMovil",
  }: any) => {
    const date = new Date(values.paymentDate);
    const paymentDate = `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCDate()}`;

    if (paymentMethod === "pagoMovil") {
      const value = Number(vesUsd.value) * Number(form.amount);
      const vesAmount = transformAmount(value.toString(), true);

      const payload: Partial<Latam.Form> = {
        vesAmount,
        paymentDate,
        amount: form.amount,
        phone: values.phone,
        ci: values.ci,
        bank: values.bank,
        dynamicKey: values.dynamicKey,
      };

      return payload;
    }

    return {
      paymentDate,
      accountNumber: values.account,
      reference: values.reference,
      bank: values.bank,
      amount: transformAmount(form.amount),
      otp: values.otp,
    } as Partial<Latam.Form>;
  };

  return {
    dateLocale,
    amountVes,
    schema,
    banksOptions,
    capitalize,
    handlePayload,
  };
}
