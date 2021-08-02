export default function formatCurrency(value) {
  const FORMAT_REGEX = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g

  const mount = value
    .toFixed(2)
    .replace(FORMAT_REGEX, '$1.')
    .split('')

  const dotDecimalPosition = mount.length - 3

  mount.splice(dotDecimalPosition, 1, ',')

  return `Bs.S ${mount.join('')}`
}
