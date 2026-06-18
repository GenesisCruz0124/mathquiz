import { useState } from 'react'
import DifficultySelector from './components/DifficultySelector.jsx'
import QuizScreen from './components/QuizScreen.jsx'
import HighScores from './components/HighScores.jsx'
import { getHighScores, recordScore } from './lib/highScores.js'
import './App.css'

export default function App() {
  const [stage, setStage] = useState('idle')
  const [preset, setPreset] = useState(null)
  const [finalScore, setFinalScore] = useState(0)
  const [highScores, setHighScores] = useState(getHighScores())

  function startQuiz(selectedPreset) {
    setPreset(selectedPreset)
    setStage('playing')
  }

  function finishQuiz(score) {
    setFinalScore(score)
    setHighScores(recordScore(preset, score))
    setStage('finished')
  }

  function playAgain() {
    setPreset(null)
    setStage('idle')
  }

  return (
    <div className="app">
      {stage === 'idle' && <DifficultySelector onSelect={startQuiz} />}
      {stage === 'playing' && <QuizScreen preset={preset} onFinish={finishQuiz} />}
      {stage === 'finished' && (
        <HighScores score={finalScore} preset={preset} highScores={highScores} onPlayAgain={playAgain} />
      )}
    </div>
  )
}
