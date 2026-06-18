import { describe, it, expect, beforeEach } from 'vitest'
import { getHighScores, recordScore } from '../src/lib/highScores.js'

beforeEach(() => {
  localStorage.clear()
})

describe('getHighScores', () => {
  it('returns zeroed defaults when nothing is stored', () => {
    expect(getHighScores()).toEqual({ easy: 0, medium: 0, hard: 0 })
  })
})

describe('recordScore', () => {
  it('stores a new score for a difficulty', () => {
    const result = recordScore('easy', 10)
    expect(result.easy).toBe(10)
    expect(getHighScores().easy).toBe(10)
  })

  it('only overwrites when the new score is higher', () => {
    recordScore('medium', 20)
    const result = recordScore('medium', 15)
    expect(result.medium).toBe(20)
  })

  it('overwrites when the new score is strictly higher', () => {
    recordScore('hard', 5)
    const result = recordScore('hard', 8)
    expect(result.hard).toBe(8)
  })

  it('keeps other difficulties untouched', () => {
    recordScore('easy', 10)
    recordScore('medium', 20)
    expect(getHighScores()).toEqual({ easy: 10, medium: 20, hard: 0 })
  })
})
