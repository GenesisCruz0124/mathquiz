const LEVEL_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export default function ScoreBoard({ score, streak, effectivePreset, trend }) {
  return (
    <div className="score-board">
      <div className="score-item">
        <span className="score-item-label">Score</span>
        <span className="score-item-value">{score}</span>
      </div>
      <div className="score-item">
        <span className="score-item-label">Streak</span>
        <span className="score-item-value">{streak}</span>
      </div>
      <div className="score-item">
        <span className="score-item-label">Difficulty</span>
        <span className="score-item-value">
          {LEVEL_LABELS[effectivePreset]}
          {trend === 'up' && ' ↑'}
          {trend === 'down' && ' ↓'}
        </span>
      </div>
    </div>
  )
}
