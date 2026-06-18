import { describe, it, expect } from 'vitest'
import { generateQuestion } from '../src/lib/questionGenerator.js'

describe('generateQuestion', () => {
  it('keeps operands within maxNumber bounds', () => {
    for (let i = 0; i < 200; i++) {
      const q = generateQuestion({ maxNumber: 10, allowSubtraction: true, allowNegativeResults: true })
      expect(q.a).toBeGreaterThanOrEqual(1)
      expect(q.a).toBeLessThanOrEqual(10)
      expect(q.b).toBeGreaterThanOrEqual(1)
      expect(q.b).toBeLessThanOrEqual(10)
    }
  })

  it('only generates addition when subtraction is disallowed', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateQuestion({ maxNumber: 10, allowSubtraction: false, allowNegativeResults: false })
      expect(q.operation).toBe('+')
      expect(q.answer).toBe(q.a + q.b)
    }
  })

  it('never produces negative results when disallowed', () => {
    for (let i = 0; i < 200; i++) {
      const q = generateQuestion({ maxNumber: 50, allowSubtraction: true, allowNegativeResults: false })
      expect(q.answer).toBeGreaterThanOrEqual(0)
    }
  })

  it('can produce negative results when allowed', () => {
    const results = []
    for (let i = 0; i < 200; i++) {
      const q = generateQuestion({ maxNumber: 10, allowSubtraction: true, allowNegativeResults: true })
      results.push(q.answer)
    }
    expect(results.some((answer) => answer < 0)).toBe(true)
  })

  it('answer matches the stated operation', () => {
    for (let i = 0; i < 200; i++) {
      const q = generateQuestion({ maxNumber: 100, allowSubtraction: true, allowNegativeResults: true })
      const expected = q.operation === '+' ? q.a + q.b : q.a - q.b
      expect(q.answer).toBe(expected)
    }
  })
})
