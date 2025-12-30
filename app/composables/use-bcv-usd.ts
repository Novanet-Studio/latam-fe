export default function useBcvUsd() {
  const usd = ref("");

  const { executeGetUsdVesConvertion } = useLatamServices();

  onMounted(async () => {
    try {
      const { data: result } = await executeGetUsdVesConvertion();

      const quote = transformAmount(String(result.value?.rate));

      usd.value = quote;
    } catch (err) {
      const form = inject("form") as Latam.Form;

      form.errorMessage = "Error al obtener VES/USD rate convertion";
      console.log(err);
    }
  });

  return usd;
}
