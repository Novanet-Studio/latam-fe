/**
 * Listado de codigos retornados por el SSE para las transacciones de Mi Banco
 */
export const codes: { [key: string]: string } = {
  AB01: "Tiempo de espera agotado",
  AB07: "Agente fuera de línea",
  AC00: "Operación en Espera de Respuesta del Receptor",
  AC01: "Número de cuenta incorrecto",
  AC04: "Cuenta cancelada",
  AC06: "Cuenta bloqueada",
  AC09: "Moneda no válida",
  ACCP: "Operación Aceptada",
  AG01: "Transacción Restringida",
  AG09: "Pago no recibido",
  AG10: "Agente suspendido o excluido",
  AM02: "Monto de la transacción no permitido",
  AM04: "Saldo insuficiente",
  AM05: "Operación duplicada",
  BE01: "Datos del cliente no corresponden a la cuenta",
  BE20: "Longitud del nombre invalida",
  CH20: "Número de decimales incorrecto",
  CUST: "Cancelación solicitada por el deudor",
  DS02: "Operación Cancelada",
  DT03: "Fecha de procesamiento no bancaria no válida",
  DU01: "Identificación de mensaje duplicado",
  ED05: "Liquidación Fallida",
  FF05: "Código del producto incorrecto",
  FF07: "Código del sub producto incorrecto",
  MD01: "No posee afiliación",
  MD09: "Afiliación inactiva",
  MD15: "Monto incorrecto",
  MD21: "Cobro no permitido",
  MD22: "Afiliación suspendida",
  RC08: "Código del Banco no existe en el sistema de compensación/Liquidación",
  RJCT: "Operación Rechazada",
  TKCM: "Código único de operación de débito incorrecto.",
  TM01: "Fuera del horario permitido",
  VE01: "Rechazo técnico",
};

export const failureReason: { [key: string]: string } = {
  AB01: "Tiempo de espera agotado",
  AB07: "Agente fuera de línea",
  AC00: "Operación en Espera de Respuesta del Receptor",
  AC01: "Número de cuenta incorrecto",
  AC04: "Cuenta cancelada",
  AC06: "Cuenta bloqueada",
  AC09: "Moneda no válida",
  AG01: "Transacción Restringida",
  AG09: "Pago no recibido",
  AG10: "Agente suspendido o excluido",
  AM02: "Monto de la transacción no permitido",
  AM04: "Saldo insuficiente",
  AM05: "Operación duplicada",
  BE01: "Datos del cliente no corresponden a la cuenta",
  BE20: "Longitud del nombre invalida",
  CH20: "Número de decimales incorrecto",
  CUST: "Cancelación solicitada por el deudor",
  DS02: "Operación Cancelada",
  DT03: "Fecha de procesamiento no bancaria no válida",
  DU01: "Identificación de mensaje duplicado",
  ED05: "Liquidación Fallida",
  FF05: "Código del producto incorrecto",
  FF07: "Código del sub producto incorrecto",
  MD01: "No posee afiliación",
  MD09: "Afiliación inactiva",
  MD15: "Monto incorrecto",
  MD21: "Cobro no permitido",
  MD22: "Afiliación suspendida",
  RC08: "Código del Banco no existe",
  RJCT: "Operación Rechazada",
  TKCM: "Nro de documento del sujeto incorrecto",
  TM01: "Fuera del horario permitido",
  VE01: "Rechazo técnico",
};

export function getCode(code: string): string {
  return codes[code];
}

export function getFailureReason(code: string): string {
  return failureReason[code];
}

export default codes;

/*


22525126

04242785127
V 3413756
31683289
0169


CI: V 3413756
Cel: 04242785127
Banco: Mi Banco
OTP: 31683289

*/


// makePaymentHandler

/*


<<< ON makePaymentHandler (body) {"CstmrDrctDbtInitn":{"GrpHdr":{"MsgId":"0001012025012218075000000000","CreDtTm":"2025-01-22T18:07:50Z","NbOfTxs":1,"CtrlSum":11.05,"InitgPty":{"Id":{"PrvtId":{"Othr":{"Id":"0071"}}}},"InitnSrc":{"Nm":"0071","Prvdr":"SBTC","Vrsn":"1.0.1"}},"PmtInf":[{"Cdtr":{"Nm":"Latin American Cable","Id":{"PrvtId":{"Othr":{"Id":"J298946229","SchmeNm":{"Cd":"SRIF"}}}}},"CdtrAcct":{"Prxy":{"Tp":{"Cd":"CNTA"},"Id":"01690001041000579342"}},"CdtrAgt":{"FinInstnId":{"ClrSysMmbId":{"ClrSysId":{"Cd":"NCCE"},"MmbId":"0169"}}},"DrctDbtTxInf":[{"PmtId":{"InstrId":"3d578eae-656c-4ee2-9739-76d24a46e9f8","StsRsnInf":{"AddtlInf":"31683289"}},"PmtTpInf":{"LclInstrm":{"Cd":"050"}},"InstdAmt":{"Amt":11.05,"Ccy":"VES"},"DbtrAgt":{"FinInstnId":{"ClrSysMmbId":{"ClrSysId":{"Cd":"NCCE"},"MmbId":"0169"}}},"Dbtr":{"Nm":"Alexander ","Id":{"PrvtId":{"Othr":{"Id":"V3413756","SchmeNm":{"Cd":"SCID"}}}}},"DbtrAcct":{"Prxy":{"Tp":{"Cd":"CELE"},"Id":"04242785127"}},"Purp":{"Cd":"002"},"RmtInf":{"Ustrd":"DESCRIPCION DEL COBRO"}}]}]}}


<<< TO RETURN emitSSEHandler (store) >>> {"canNotify":true,"data":{"CstmrPmtStsRpt":{"GrpHdr":{"MsgId":"BTCB012025012214050511866150","CreDtTm":"2025-01-22T14:05:08","InitgPty":{"Id":{"PrvtId":{"Othr":{"Id":"0071"}}}}},"OrgnlGrpInfAndSts":{"OrgnlMsgId":"0001012025012218045900000000","OrgnlCreDtTm":"2025-01-22T18:04:59Z","OrgnlNbOfTxs":1,"OrgnlCtrlSum":11.05,"GrpSts":"ACCP"},"OrgnlPmtInfAndSts":[{"TxInfAndSts":[{"OrgnlInstrId":"74ece64f-b802-4bff-915b-d2811a9415ba","OrgnlEndToEndId":"81692025012214050011866092","TxSts":"ACCP","OrgnlTxRef":{"InstdAmt":{"Amt":11.05,"Ccy":"VES"},"IntrBkSttlmDt":"2025-01-22","IntrBkSttlmNb":1,"PmtTpInf":{"LclInstrm":{"Cd":"050"}},"Dbtr":{"Nm":"Alexander ","Id":{"PrvtId":{"Othr":{"Id":"V3413756","SchmeNm":{"Cd":"SCID"}}}}},"DbtrAcct":{"Prxy":{"Tp":{"Cd":"CELE"},"Id":"04242785127"}},"DbtrAgt":{"FinInstnId":{"ClrSysMmbId":{"ClrSysId":{"Cd":"NCCE"},"MmbId":"0169"}}},"CdtrAgt":{"FinInstnId":{"ClrSysMmbId":{"ClrSysId":{"Cd":"NCCE"},"MmbId":"0169"}}},"Cdtr":{"Nm":"Latin American Cable","Id":{"PrvtId":{"Othr":{"Id":"J298946229","SchmeNm":{"Cd":"SRIF"}}}}},"CdtrAcct":{"Prxy":{"Tp":{"Cd":"CNTA"},"Id":"01690001041000579342"}},"Purp":{"Cd":"002"},"RmtInf":{"Ustrd":"DESCRIPCION DEL COBRO"}}}]}]}}}

<<< ON notifyHandler (body) {"CstmrPmtStsRpt":{"GrpHdr":{"MsgId":"BTCB012025012214075411866151","CreDtTm":"2025-01-22T14:07:58","InitgPty":{"Id":{"PrvtId":{"Othr":{"Id":"0071"}}}}},"OrgnlGrpInfAndSts":{"OrgnlMsgId":"0001012025012218075000000000","OrgnlCreDtTm":"2025-01-22T18:07:50Z","OrgnlNbOfTxs":1,"OrgnlCtrlSum":11.05,"GrpSts":"ACCP"},"OrgnlPmtInfAndSts":[{"TxInfAndSts":[{"OrgnlInstrId":"3d578eae-656c-4ee2-9739-76d24a46e9f8","OrgnlEndToEndId":"81692025012214075111866093","TxSts":"ACCP","OrgnlTxRef":{"InstdAmt":{"Amt":11.05,"Ccy":"VES"},"IntrBkSttlmDt":"2025-01-22","IntrBkSttlmNb":1,"PmtTpInf":{"LclInstrm":{"Cd":"050"}},"Dbtr":{"Nm":"Alexander ","Id":{"PrvtId":{"Othr":{"Id":"V3413756","SchmeNm":{"Cd":"SCID"}}}}},"DbtrAcct":{"Prxy":{"Tp":{"Cd":"CELE"},"Id":"04242785127"}},"DbtrAgt":{"FinInstnId":{"ClrSysMmbId":{"ClrSysId":{"Cd":"NCCE"},"MmbId":"0169"}}},"CdtrAgt":{"FinInstnId":{"ClrSysMmbId":{"ClrSysId":{"Cd":"NCCE"},"MmbId":"0169"}}},"Cdtr":{"Nm":"Latin American Cable","Id":{"PrvtId":{"Othr":{"Id":"J298946229","SchmeNm":{"Cd":"SRIF"}}}}},"CdtrAcct":{"Prxy":{"Tp":{"Cd":"CNTA"},"Id":"01690001041000579342"}},"Purp":{"Cd":"002"},"RmtInf":{"Ustrd":"DESCRIPCION DEL COBRO"}}}]}]}}

*/