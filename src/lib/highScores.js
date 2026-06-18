const STORAGE_KEY = 'mathquiz.highScores'

const DEFAULT_SCORES = { easy: 0, medium: 0, hard: 0 }

export function getHighScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_SCORES }
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_SCORES, ...parsed }
  } catch {
    return { ...DEFAULT_SCORES }
  }
}

export function recordScore(difficulty, score) {
  const scores = getHighScores()
  if (score > scores[difficulty]) {
    scores[difficulty] = score
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  }
  return scores
}
