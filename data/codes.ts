/**
 * Listado de codigos retornados por el SSE para las transacciones de Mi Banco
 */
export const codes: { [key: string]: string } = {
  AB01: 'Tiempo de espera agotado',
  AB07: 'Agente fuera de línea',
  AC00: 'Operación en Espera de Respuesta del Receptor',
  AC01: 'Número de cuenta incorrecto',
  AC04: 'Cuenta cancelada',
  AC06: 'Cuenta bloqueada',
  AC09: 'Moneda no válida',
  ACCP: 'Operación Aceptada',
  AG01: 'Transacción Restringida',
  AG09: 'Pago no recibido',
  AG10: 'Agente suspendido o excluido',
  AM02: 'Monto de la transacción no permitido',
  AM04: 'Saldo insuficiente',
  AM05: 'Operación duplicada',
  BE01: 'Datos del cliente no corresponden a la cuenta',
  BE20: 'Longitud del nombre invalida',
  CH20: 'Número de decimales incorrecto',
  CUST: 'Cancelación solicitada por el deudor',
  DS02: 'Operación Cancelada',
  DT03: 'Fecha de procesamiento no bancaria no válida',
  DU01: 'Identificación de mensaje duplicado',
  ED05: 'Liquidación Fallida',
  FF05: 'Código del producto incorrecto',
  FF07: 'Código del sub producto incorrecto',
  MD01: 'No posee afiliación',
  MD09: 'Afiliación inactiva',
  MD15: 'Monto incorrecto',
  MD21: 'Cobro no permitido',
  MD22: 'Afiliación suspendida',
  RC08: 'Código del Banco no existe en el sistema de compensación/Liquidación',
  RJCT: 'Operación Rechazada',
  TKCM: 'Código único de operación de débito incorrecto.',
  TM01: 'Fuera del horario permitido',
  VE01: 'Rechazo técnico'
}

export function getCode(code: string): string {
  return codes[code]
}

export default codes
