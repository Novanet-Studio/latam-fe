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

interface BcvUsdResponse {
  status: "ERROR" | "SUCCESS";
  rate: number;
}

export default function () {
  const { latamServicesApiUrl } = useRuntimeConfig().public;

  const URL = `${latamServicesApiUrl}/api/v1`;

  //? Users - Mikrowisp
  async function executeGetClientDetails(ci: string) {
    return useFetch<any>(`${URL}/user/get-client-details`, {
      method: "POST",
      body: {
        cedula: ci,
      },
    });
  }

  async function executeCheckDebts(ci: string) {
    return useFetch<Latam.BillingResponse>(`${URL}/user/consulta-deuda`, {
      method: "POST",
      body: {
        cedula: ci,
      },
    });
  }

  async function executeRegisterPay(body = {}) {
    return useFetch<Latam.BillingResponse>(`${URL}/user/registrar-pago`, {
      method: "POST",
      body,
    });
  }

  //? BtD - Banco del Tesoro
  async function executeGetBanks(body = {}) {
    return useFetch<BankData[]>(`${URL}/bt/bancos`, {
      method: "POST",
      body,
    });
  }

  async function executeBtPay(body = {}) {
    return useFetch<PaymentResponse>(`${URL}/bt/pago`, {
      method: "POST",
      body,
    });
  }

  async function executeConformation(body = {}) {
    return useFetch<ConformationResponse>(`${URL}/bt/conformacion`, {
      method: "POST",
      body,
    });
  }

  //? MB - MiBanco
  async function executeRequestMiBancoOTP(body = {}) {
    return useFetch(`${URL}/mibanco/request-otp`, {
      method: "POST",
      body,
    });
  }

  async function executeMiBancoPayment(body = {}) {
    return useFetch(`${URL}/mibanco/pay`, {
      method: "POST",
      body,
    });
  }

  //? UsdVes - current usd/ves convertion
  async function executeGetUsdVesConvertion() {
    return useFetch<BcvUsdResponse>(`${URL}/usdVes/get-usd-ves-current`, {
      method: "GET",
    });
  }

  return {
    //? Users - Mikrowisp
    executeGetClientDetails,
    executeCheckDebts,
    executeRegisterPay,

    //? BtD - Banco del Tesoro
    executeGetBanks,
    executeBtPay,
    executeConformation,

    //? MB - MiBanco
    executeRequestMiBancoOTP,
    executeMiBancoPayment,

    //? UsdVes - current usd/ves convertion
    executeGetUsdVesConvertion,
  };
}
