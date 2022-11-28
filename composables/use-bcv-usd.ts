interface BcvUsdResponse {
  name: string;
  pair: string;
  sources: {
    BCV: {
      name: string;
      quote: string;
    };
  };
}

export default function useBcvUsd() {
  const { bcvUsdApi } = useRuntimeConfig().public;
  const usd = ref('');

  onMounted(async () => {
    try {
      const response = await fetch(bcvUsdApi);
      const result: BcvUsdResponse = await response.json();
      const quote = Number(result.sources.BCV.quote).toFixed(2);
      usd.value = quote;
    } catch (err) {
      console.log(err);
    }
  });

  return usd;
}
