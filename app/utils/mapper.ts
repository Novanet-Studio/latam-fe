/**
 * Return a simple date for example, "2022-11-07" from ISO string
 * @param date Any date to get a simple date
 * @returns {string}
 */
const getDate = (date: Date) => {
  const toISO = date.toISOString();
  const simpleDate = toISO.split('T');

  return simpleDate[0];
};

export const paymentMapper = (
  data: Latam.PaymentFormData
): Latam.PaymentStrapiRecord => ({
  dtc_nombre_apellido: data.fullname,
  dtc_cedula_identidad: data.identification,
  dtc_contrato: data.contractNumber,
  dtc_zona: data.zone,
  dfp_forma_pago: data.paymentWay,
  dfp_transaccion: data.transactionNumber,
  dfp_banco_emisor: data.issuingBank,
  dfp_fecha: getDate(data.date),
  dfp_monto: data.amount,
  dtb_nombre_apellido: data.dtbFullname,
  dtb_telefono: data.dtbPhone,
  dtb_cedula_identidad: Number(data.dtbIdentification),
  dtb_correo: data.dtbEmail,
});
