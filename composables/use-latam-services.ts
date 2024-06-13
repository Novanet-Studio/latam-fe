interface BankData {
  nombre: string;
  codigo: string;
}

interface PaymentResponse {
  codres: string;
  descRes: string;
  autorizacionISO: string;
  traceISO: string;
  autorizacionIBSMonto: string;
  autorizacionIBSComision: string;
  montoComision: string;
  referencia: string;
  fecha: string; // DD/MM/YYYY
  hora: string; // HH:MM:SS
  claveDinamica: number;
  monto: string;
  numeroLote: string;
}

interface ConformationResponse {
  mensaje: string;
  status: "OK" | "Error";
}

export default function() {
  const { latamServicesApiUrl } = useRuntimeConfig().public;

  const URL = `${latamServicesApiUrl}/api/v1`;

  async function executeGetClientDetails(ci: string) {
    return useFetch<any>(`${URL}/user/get-client-details`, {
      method: "POST",
      body: {
        cedula: ci,
      }
    })
  }

  async function executeCheckDebts(ci: string) {
    return useFetch<Latam.BillingResponse>(`${URL}/user/consulta-deuda`, {
      method: "POST",
      body: {
        cedula: ci,
      }
    })
  }

  async function executeRegisterPay(body = {}) {
    return useFetch<Latam.BillingResponse>(`${URL}/user/registrar-pago`, {
      method: "POST",
      body
    })
  }

  async function executeGetBanks(body = {}) {
    return useFetch<BankData[]>(`${URL}/bt/bancos`, {
      method: "POST",
      body
    })
  }
  
  async function executeBtPay(body = {}) {
    return useFetch<PaymentResponse>(`${URL}/bt/pago`, {
      method: "POST",
      body
    })
  }

  async function executeConformation(body = {}) {
    return useFetch<ConformationResponse>(`${URL}/bt/conformacion`, {
      method: "POST",
      body
    })
  }

  async function executeRequestMiBancoOTP(body = {}) {
    return useFetch(`${URL}/mibanco/request-otp`, {
      method: "POST",
      body
    })
  }

  async function executeMiBancoPayment(body = {}) {
    return useFetch(`${URL}/mibanco/pay`, {
      method: "POST",
      body
    })
  }

  return {
    executeGetClientDetails,
    executeCheckDebts,
    executeRegisterPay,
    executeGetBanks,
    executeBtPay,
    executeConformation,
    executeRequestMiBancoOTP,
    executeMiBancoPayment
  }
}