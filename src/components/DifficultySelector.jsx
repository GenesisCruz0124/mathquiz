import { getHighScores } from '../lib/highScores.js'

const PRESETS = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
]

export default function DifficultySelector({ onSelect }) {
  const highScores = getHighScores()

  return (
    <div className="difficulty-selector">
      <h1>Math Quiz</h1>
      <p>Choose a difficulty to start</p>
      <div className="difficulty-options">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`difficulty-button difficulty-${preset.id}`}
            onClick={() => onSelect(preset.id)}
          >
            <span className="difficulty-label">{preset.label}</span>
            <span className="difficulty-high-score">Best: {highScores[preset.id]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
