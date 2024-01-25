export default function generateUniqueNumbers() {
  let uniqueNumbers = new Set();

  while (uniqueNumbers.size < 12) {
    uniqueNumbers.add(Math.floor(Math.random() * 100) + 1);
  }

  return Array.from(uniqueNumbers).join('');
}