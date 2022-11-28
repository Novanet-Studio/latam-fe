export const getFullPrice = (
  dollarMount: string,
  dollarPrice: string
): string => {
  let totalMount: any = [];
  const dollar = +dollarMount;
  const dollarBsPrice = +dollarPrice;
  const total = dollar * dollarBsPrice;
  const totalArray = total.toFixed(2).split('');
  const cents = totalArray.slice(-2);

  totalArray
    .slice(0, -3)
    .reverse()
    .map((value, index) => {
      if (index % 3 === 0) {
        totalMount.push('.');
      }

      totalMount.push(value);
    });

  const totalString = totalMount.reverse().concat(cents);

  totalString[totalString.length - 3] = ',';

  return totalString.join('');
};

export default getFullPrice;
