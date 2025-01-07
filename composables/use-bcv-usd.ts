interface BcvUsdResponse {
  fuente: string;
  nombre: string;
  compra?: any;
  venta?: any;
  promedio: number;
  fechaActualizacion: string;
}

export default function useBcvUsd() {
  const { bcvUsdApi } = useRuntimeConfig().public;
  const usd = ref("");

  onMounted(async () => {
    try {
      const response = await fetch(bcvUsdApi);
      const result: BcvUsdResponse = await response.json();
      const quote = transformAmount(String(result.promedio));

      usd.value = quote;
    } catch (err) {
      console.log(err);
    }
  });

  return usd;
}
