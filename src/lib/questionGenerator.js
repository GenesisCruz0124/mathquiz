function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// params: { maxNumber, allowSubtraction, allowNegativeResults }
export function generateQuestion(params) {
  const { maxNumber, allowSubtraction, allowNegativeResults } = params
  const operation = allowSubtraction && Math.random() < 0.5 ? '-' : '+'

  let a = randomInt(1, maxNumber)
  let b = randomInt(1, maxNumber)

  if (operation === '-' && !allowNegativeResults && b > a) {
    ;[a, b] = [b, a]
  }

  const answer = operation === '+' ? a + b : a - b

  return { a, b, operation, answer }
}
