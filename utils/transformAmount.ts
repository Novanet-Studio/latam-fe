export default function transformAmount(amount: string, pretty = false) {
  const [val, decimal] = amount.split('.');
  const quote = `${val}.${decimal.slice(0, 2)}`;

  if (pretty) {
    return quote.replace('.', ',')
  }

  return quote;
}