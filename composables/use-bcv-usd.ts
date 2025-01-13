interface BcvUsdResponse {
  fuente: string;
  nombre: string;
  compra?: any;
  venta?: any;
  promedio: number;
  fechaActualizacion: string;
}

export default function useBcvUsd() {
  const usd = ref("");

  const { executeGetUsdVesConvertion } = useLatamServices();

  onMounted(async () => {
    try {
      const { data: result } = await executeGetUsdVesConvertion();

      const quote = transformAmount(String(result.value?.promedio));

      usd.value = quote;
    } catch (err) {
      console.log(err);
    }
  });

  return usd;
}
