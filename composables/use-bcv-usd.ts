export default function useBcvUsd() {
  const form = inject("form") as Latam.Form;
  const usd = ref("");

  const { executeGetUsdVesConvertion } = useLatamServices();

  onMounted(async () => {
    try {
      const { data: result } = await executeGetUsdVesConvertion();

      const quote = transformAmount(String(result.value?.rate));

      usd.value = quote;
    } catch (err) {
      form.errorMessage = "Error al obtener VES/USD rate convertion";
      console.log(err);
    }
  });

  return usd;
}
