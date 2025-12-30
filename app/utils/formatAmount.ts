const formatAmount = (amount: string | undefined): string => {
  if (!amount) return '';

  const transformed = amount!.replace(',', '_').replaceAll('.', ',').replace('_', '.')
  
  return `Bs.S ${transformed}`
}

export default formatAmount;
