import getFullPrice from './getFullPrice';

export default function getPrice(dollarMount: string, dollarPrice: string) {
  const dollar = dollarPrice.trim();
  const totalPrice = getFullPrice(dollarMount, dollar);
  return totalPrice;
}
