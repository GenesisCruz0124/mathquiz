import { describe, it, expect } from 'vitest'
import { nextDifficultyLevel, getPresetBand, getStartingLevel, levelToParams } from '../src/lib/difficulty.js'

describe('nextDifficultyLevel', () => {
  it('bumps level up after three consecutive correct answers', () => {
    const level = nextDifficultyLevel(4, [true, true, true], 'medium')
    expect(level).toBe(5)
  })

  it('does not bump up after only two consecutive correct answers', () => {
    const level = nextDifficultyLevel(4, [false, true, true], 'medium')
    expect(level).toBe(4)
  })

  it('drops level down after two consecutive wrong answers', () => {
    const level = nextDifficultyLevel(4, [true, false, false], 'medium')
    expect(level).toBe(3)
  })

  it('does not drop after a single wrong answer', () => {
    const level = nextDifficultyLevel(4, [true, true, false], 'medium')
    expect(level).toBe(4)
  })

  it('clamps at the top of the preset band', () => {
    const band = getPresetBand('medium')
    const level = nextDifficultyLevel(band.max, [true, true, true], 'medium')
    expect(level).toBe(band.max)
  })

  it('clamps at the bottom of the preset band', () => {
    const band = getPresetBand('medium')
    const level = nextDifficultyLevel(band.min, [false, false], 'medium')
    expect(level).toBe(band.min)
  })
})

describe('getStartingLevel', () => {
  it('returns a level within the matching preset band', () => {
    for (const preset of ['easy', 'medium', 'hard']) {
      const level = getStartingLevel(preset)
      const band = getPresetBand(preset)
      expect(level).toBeGreaterThanOrEqual(band.min)
      expect(level).toBeLessThanOrEqual(band.max)
    }
  })
})

describe('levelToParams', () => {
  it('increases maxNumber as level increases', () => {
    const low = levelToParams(0)
    const high = levelToParams(9)
    expect(high.maxNumber).toBeGreaterThan(low.maxNumber)
  })

  it('disallows subtraction at the lowest level', () => {
    expect(levelToParams(0).allowSubtraction).toBe(false)
  })

  it('allows negative results only at high levels', () => {
    expect(levelToParams(0).allowNegativeResults).toBe(false)
    expect(levelToParams(9).allowNegativeResults).toBe(true)
  })
})
