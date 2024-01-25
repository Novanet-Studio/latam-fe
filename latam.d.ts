declare namespace Latam {
  type PaymentStrapiRecord = {
    dtc_nombre_apellido: string;
    dtc_cedula_identidad: string;
    dtc_contrato: string;
    dtc_zona: string;
    dfp_forma_pago: string;
    dfp_transaccion: string;
    dfp_banco_emisor: string;
    dfp_fecha: string | Date;
    dfp_monto: string;
    dtb_nombre_apellido: string;
    dtb_telefono: string;
    dtb_cedula_identidad: number; // Int
    dtb_correo: string;
  };

  type PaymentFormData = {
    fullname: string;
    identification: string;
    contractNumber: string;
    zone: string;
    paymentWay: string;
    amount: string;
    transactionNumber: string;
    issuingBank: string;
    date: Date;
    // dtb = Datos Titular Cuenta Bancaria
    dtbFullname: string;
    dtbPhone: string;
    dtbEmail: string;
    dtbIdentification: string;
  };

  type Form = {
    ci: string;
    contract: string;
    fullName: string;
    amount: number | string;
    phone: string;
    bank: string;
    paymentDate: string;
    paymentReference: string;
    status: '' | 'error' | 'pending' | 'success';
  }

  interface UserData {
    estado: string;
    datos?: (DatosEntity)[] | null;
  }

  interface DatosEntity {
    id: number;
    nombre: string;
    estado: string;
    correo: string;
    telefono: string;
    movil: string;
    cedula: string;
    pasarela: string;
    codigo: string;
    direccion_principal: string;
    servicios?: (ServiciosEntity)[] | null;
    facturacion: Facturacion;
  }

  interface ServiciosEntity {
    id: number;
    idperfil: number;
    nodo: number;
    costo: string;
    ipap: string;
    mac: string;
    ip: string;
    instalado: string;
    pppuser: string;
    ppppass: string;
    tiposervicio: string;
    status_user: string;
    coordenadas: string;
    direccion: string;
    snmp_comunidad: string;
    perfil: string;
  }

  interface Facturacion {
    facturas_nopagadas: number;
    total_facturas: string;
  }

  interface BillingResponse {
    code: string;
    facturas: Billing[];
    mensaje: string;
  }

  interface Billing {
    IDFactura: number;
    detalle: string;
    valor: string;
  }
}
