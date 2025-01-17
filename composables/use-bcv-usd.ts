export default function useBcvUsd() {
  const usd = ref("");

  const { executeGetUsdVesConvertion } = useLatamServices();

  onMounted(async () => {
    try {
      const { data: result } = await executeGetUsdVesConvertion();

      console.log(`<<< result >>>`, result);

      const quote = transformAmount(String(result.value?.rate));

      usd.value = quote;
    } catch (err) {
      console.log(err);
    }
  });

  return usd;
}
