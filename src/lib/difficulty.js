export const DIFFICULTIES = ['easy', 'medium', 'hard']

export const MIN_LEVEL = 0
export const MAX_LEVEL = 9

export const PRESET_CENTER_LEVEL = {
  easy: 1,
  medium: 4,
  hard: 7,
}

export const PRESET_BAND = {
  easy: { min: 0, max: 2 },
  medium: { min: 3, max: 5 },
  hard: { min: 6, max: 9 },
}

export const PRESET_SECONDS_PER_QUESTION = {
  easy: 15,
  medium: 10,
  hard: 7,
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

// Levels increase by max number range and unlock subtraction / negative
// results as they climb, so adjacent levels feel like small steps rather
// than jumps between presets.
export function levelToParams(level) {
  const clamped = clamp(level, MIN_LEVEL, MAX_LEVEL)
  const maxNumber = 10 + clamped * 10
  const allowSubtraction = clamped >= 1
  const allowNegativeResults = clamped >= 6
  return { maxNumber, allowSubtraction, allowNegativeResults }
}

export function getPresetBand(preset) {
  const band = PRESET_BAND[preset]
  if (!band) throw new Error(`Unknown difficulty preset: ${preset}`)
  return band
}

export function getStartingLevel(preset) {
  const center = PRESET_CENTER_LEVEL[preset]
  if (center === undefined) throw new Error(`Unknown difficulty preset: ${preset}`)
  return center
}

export function getSecondsPerQuestion(preset) {
  return PRESET_SECONDS_PER_QUESTION[preset]
}

export function levelToPresetLabel(level) {
  for (const preset of DIFFICULTIES) {
    const band = PRESET_BAND[preset]
    if (level >= band.min && level <= band.max) return preset
  }
  return DIFFICULTIES[DIFFICULTIES.length - 1]
}

// history: array of booleans (true = correct), most recent last.
// Returns the next effective level, clamped to the preset's band.
export function nextDifficultyLevel(currentLevel, history, preset) {
  const band = getPresetBand(preset)
  const recent = history.slice(-3)
  const lastTwo = history.slice(-2)

  let next = currentLevel
  if (recent.length === 3 && recent.every((correct) => correct === true)) {
    next = currentLevel + 1
  } else if (lastTwo.length === 2 && lastTwo.every((correct) => correct === false)) {
    next = currentLevel - 1
  }

  return clamp(next, band.min, band.max)
}
