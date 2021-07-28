export const formatCurrency = (value) => {
  const totalMount = []

  if (!value.length) {
    return '0'
  }

  const cents = value.slice(-2)

  value
    .slice(0, -2)
    .split('')
    .reverse()
    .map((value, index) => {
      if (index % 3 === 0) {
        totalMount.push('.')
      }

      totalMount.push(value)
    })
    
  const transformed = totalMount
    .reverse()
    .slice(0, -1)
    .concat([',', ...cents])
    .join('')

  const formatted = `Bs.S ${transformed}`

  return formatted
}

export const unformatCurrency = (value) => {
  const unformatted = value
    .replace('Bs.S ', '')
    .replace(/\./g, '')
    .replace(',', '')

  return unformatted
}
