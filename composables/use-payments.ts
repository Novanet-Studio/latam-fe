import generateUniqueID from "generate-unique-id";

interface UsePaymentsParams {
  stepper: any;
  billingData: Latam.Billing;
}

export default function usePayments({
  stepper,
  billingData,
}: UsePaymentsParams) {
  const form = inject("form") as Latam.Form;
  const paymentOption = inject("paymentOption") as Ref<Latam.PaymentOption>;
  const showOtp = inject("showOtp") as Ref<boolean>;
  const isSending = inject("isSending") as Ref<boolean>;
  const { open } = inject("sse") as any;

  const {
    executeBtPay,
    executeConformation,
    executeRegisterPay,
    executeRequestMiBancoOTP,
    executeMiBancoPayment,
  } = useLatamServices();

  async function btPayment() {
    const notification = push.promise("Procesando pago...");

    try {
      form.status = "pending";

      // Procesar pago
      const paymentBody = {
        celular: form.phone,
        banco: form.bank,
        cedula: `${form.type}${form.ci}`,
        monto: form.vesAmount,
        token: form.dynamicKey,
        nombre: form.fullName,
      };

      const { data: payment, error: paymentError } = await executeBtPay(
        paymentBody
      );

      if (!payment?.value?.referencia) {
        form.status = "error";

        if (payment.value?.descRes) {
          form.errorMessage = payment.value?.descRes;
        }

        notification.reject(payment.value?.descRes);
        stepper.goToNext();
        return;
      }

      if (paymentError.value?.data?.error) {
        notification.reject(paymentError.value?.data?.error);
        form.status = "error";
        return;
      }

      // Conformacion de pago
      const conformationDate = payment.value.fecha
        .split("/")
        .reverse()
        .join("");

      const conformationBody = {
        referencia: payment.value.referencia,
        monto: form.vesAmount,
        banco: form.bank,
        fecha: conformationDate,
        celular: form.phone,
      };

      const { data: conformation, error: conformationError } =
        await executeConformation(conformationBody);

      if (conformation?.value?.status === "Error") {
        notification.reject(conformation.value.mensaje);
        form.status = "error";
        stepper.goToNext();
        return;
      }

      if (conformationError.value?.data?.error) {
        notification.reject(conformationError.value?.data?.error);
        form.status = "error";
        return;
      }

      // Report payment
      const paymentDate = payment.value.fecha.split("/").reverse().join("-");

      const { data: response, error: registerPaymentError } =
        await executeRegisterPay({
          IDFactura: billingData.IDFactura,
          valor: Number(form.amount),
          fecha: paymentDate,
          secuencial: Number(
            generateUniqueID({
              length: 15,
              useLetters: false,
            })
          ),
        });

      if (registerPaymentError.value?.data?.error) {
        notification.reject(registerPaymentError.value?.data?.error);
        form.status = "error";
        return;
      }

      if (response.value?.code === "170") {
        notification.reject(response.value?.mensaje);
        form.status = "error";
        return;
      }

      notification.resolve("Pago procesado correctamente");
      form.status = "success";
      stepper.goToNext();
    } catch (error) {
      notification.error("Hubo un error al procesar el pago");
      form.status = "error";
    }
  }

  async function miBancoPayment() {
    const notification = push.promise("Procesando pago...");

    try {
      isSending.value = true;
      form.status = "pending";

      const getShortFormatDate = () =>
        new Date()
          .toISOString()
          .replace(/\.(\d{3})Z$/, "")
          .replace("T", "")
          .replaceAll("-", "")
          .replaceAll(":", "");
      const getTimeFormatDate = () =>
        new Date().toISOString().replace(/\.(\d{3})Z$/, "") + "Z";
      const msgId = `000101${getShortFormatDate()}00000000`;

      // Procesar pago
      const paymentBody = {
        CstmrDrctDbtInitn: {
          GrpHdr: {
            MsgId: msgId,
            CreDtTm: getTimeFormatDate(),
            NbOfTxs: 1,
            // CtrlSum: 10.01,
            CtrlSum: Number(form.vesAmount.replace(",", ".")),
            InitgPty: {
              Id: {
                PrvtId: {
                  Othr: {
                    Id: "0071",
                  },
                },
              },
            },
            InitnSrc: {
              Nm: "0071",
              Prvdr: "SBTC",
              Vrsn: "1.0.1",
            },
          },
          PmtInf: [
            {
              Cdtr: {
                // Nombre Acreedor
                Nm: "Latin American Cable",
                Id: {
                  PrvtId: {
                    Othr: {
                      // Id: "V15555666",
                      Id: "J298946229",
                      SchmeNm: {
                        Cd: "SRIF",
                      },
                    },
                  },
                },
              },
              CdtrAcct: {
                Prxy: {
                  Tp: {
                    Cd: "CNTA",
                  },
                  // Id: "00011234567890123456",
                  Id: "01690001041000579342",
                },
              },
              CdtrAgt: {
                FinInstnId: {
                  ClrSysMmbId: {
                    ClrSysId: {
                      Cd: "NCCE",
                    },
                    // MmbId: "0102",
                    MmbId: "0169",
                  },
                },
              },
              DrctDbtTxInf: [
                {
                  PmtId: {
                    // InstrId: "20c6d352-68c1-4b58-b1d1-afad41b8229f",
                    InstrId: crypto.randomUUID(),
                    StsRsnInf: {
                      AddtlInf: form.otp,
                    },
                  },
                  PmtTpInf: {
                    LclInstrm: {
                      Cd: "050",
                    },
                  },
                  InstdAmt: {
                    // Amt: 10.01,
                    Amt: Number(form.vesAmount.replace(",", ".")),
                    Ccy: "VES",
                  },
                  DbtrAgt: {
                    FinInstnId: {
                      ClrSysMmbId: {
                        ClrSysId: {
                          Cd: "NCCE",
                        },
                        // MmbId: "0105",
                        MmbId: form.bank,
                      },
                    },
                  },
                  Dbtr: {
                    // Nm: "Nombre Deudor",
                    Nm: form.fullName,
                    Id: {
                      PrvtId: {
                        Othr: {
                          // Id: "V15555666",
                          Id: `${form.type}${form.ci}`,
                          SchmeNm: {
                            Cd: "SCID",
                          },
                        },
                      },
                    },
                  },
                  DbtrAcct: {
                    Prxy: {
                      Tp: {
                        // Cd: "CNTA",
                        Cd: "CELE",
                      },
                      // Id: "00011234567890123456",
                      Id: form.phone,
                    },
                  },
                  Purp: {
                    Cd: "002",
                  },
                  RmtInf: {
                    Ustrd: "DESCRIPCION DEL COBRO",
                  },
                },
              ],
            },
          ],
        },
      };

      console.log(`<<< paymentBody >>>`, paymentBody);

      const { error } = await executeMiBancoPayment(paymentBody);

      console.log(`<<< error >>>`, error);

      if (error.value?.message) {
        notification.error("Hubo un error al procesar el pago");

        if (error.value?.message) {
          form.errorMessage = error.value?.message;
        }

        form.status = "error";
       
        stepper.goToNext();
        return;
      }

      // When payment is executed, then we open the connection
      localStorage.setItem("msgId", btoa(msgId));
      setTimeout(() => {
        open();
      }, 1000);

      notification.resolve("Conexión con el banco exitosa");
       form.status = "success";
      stepper.goToNext();
    } catch (error) {
      notification.error("Hubo un error al procesar el pago");
      form.errorMessage = "Error al procesar el pago";
      form.status = "error";
    } finally {
      isSending.value = false;
    }
  }

  async function miBancoOtpRequest() {
    const notification = push.promise("Solicitando clave...");

    try {
      isSending.value = true;
      const getShortFormatDate = () =>
        new Date()
          .toISOString()
          .replace(/\.(\d{3})Z$/, "")
          .replace("T", "")
          .replaceAll("-", "")
          .replaceAll(":", "");
      const getTimeFormatDate = () =>
        new Date().toISOString().replace(/\.(\d{3})Z$/, "") + "Z";
      const msgId = `000101${getShortFormatDate()}00000000`;

      // otp
      const otpBody = {
        AuthstnReq: {
          GrpHdr: {
            MsgId: msgId,
            CreDtTm: getTimeFormatDate(),
            InstgAgt: {
              FinInstnId: {
                // Bussiness
                ClrSysMmbId: {
                  ClrSysId: {
                    Cd: "NCCE",
                  },
                  MmbId: "0169",
                },
              },
            },
            InstdAgt: {
              FinInstnId: {
                // Client
                ClrSysMmbId: {
                  ClrSysId: {
                    Cd: "NCCE",
                  },
                  // MmbId: "0102",
                  MmbId: form.bank,
                },
              },
            },
            InitgPty: {
              Id: {
                PrvtId: {
                  Othr: {
                    Id: "0071",
                  },
                },
              },
            },
            InitnSrc: {
              Nm: "0071",
              Prvdr: "SBTC",
              Vrsn: "1.0",
            },
          },
          Initn: {
            OrgnlTxRef: {
              InstdAmt: {
                Ccy: "VES",
                // Amt: 18.01,
                Amt: Number(form.vesAmount.replace(",", ".")),
              },
              MndtRltdInf: {
                MndtId: "01691234563993136694",
                Tp: {
                  LclInstrm: {
                    Cd: "050",
                  },
                },
              },
              Dbtr: {
                Id: {
                  PrvtId: {
                    Othr: {
                      // Id: "V19458201",
                      Id: `${form.type}${form.ci}`,
                      SchmeNm: {
                        Cd: "SCID",
                      },
                    },
                  },
                },
              },
              Cdtr: {
                Id: {
                  PrvtId: {
                    // Bussines Data
                    Othr: {
                      Id: "J298946229",
                      SchmeNm: {
                        Cd: "SRIF",
                      },
                    },
                  },
                },
              },
              DbtrAgt: {
                FinInstnId: {
                  ClrSysMmbId: {
                    ClrSysId: {
                      Cd: "NCCE",
                    },
                    // MmbId: "0102",
                    MmbId: form.bank,
                  },
                },
              },
              CdtrAgt: {
                FinInstnId: {
                  ClrSysMmbId: {
                    ClrSysId: {
                      Cd: "NCCE",
                    },
                    MmbId: "0169",
                  },
                },
              },
              DbtrAcct: {
                Prxy: {
                  Tp: {
                    Cd: "CELE",
                  },
                  Id: form.phone,
                  // Id: "04121231234",
                },
              },
              CdtrAcct: {
                Prxy: {
                  Tp: {
                    Cd: "CNTA",
                  },
                  Id: "01690001041000579342",
                },
              },
            },
          },
        },
      };

      console.log(`<<< otpBody >>>`, otpBody);

      await executeRequestMiBancoOTP(otpBody);

      notification.resolve("Clave de pago solicitada");
      showOtp.value = true;
      stepper.goTo("payment-report");
    } catch (error) {
      console.log("error =>", error);
      notification.error("Hubo un error al solicitar la clave de pago");
      form.errorMessage = "Error al solicitar la clave de pago";
    } finally {
      isSending.value = false;
    }
  }

  async function pagoMovilPayment() {
    if (paymentOption.value === "bancoTesoro") {
      await btPayment();
      return;
    }

    if (paymentOption.value === "miBanco" && !showOtp.value) {
      await miBancoOtpRequest();
      return;
    }

    if (paymentOption.value === "miBanco" && showOtp.value) {
      await miBancoPayment();
      return;
    }

    return;
  }

  async function transferencePayment() {}

  return {
    pagoMovilPayment,
    transferencePayment,
  };
}
