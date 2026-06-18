export default function HighScores({ score, preset, highScores, onPlayAgain }) {
  return (
    <div className="high-scores">
      <h1>Quiz Complete</h1>
      <p className="final-score">
        You scored {score} / 10 on {preset}
      </p>
      <table className="high-scores-table">
        <thead>
          <tr>
            <th>Difficulty</th>
            <th>Best score</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(highScores).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}
