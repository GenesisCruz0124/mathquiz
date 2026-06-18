import { useMemo, useState } from 'react'
import { generateQuestion } from '../lib/questionGenerator.js'
import {
  getSecondsPerQuestion,
  getStartingLevel,
  levelToParams,
  levelToPresetLabel,
  nextDifficultyLevel,
} from '../lib/difficulty.js'
import Timer from './Timer.jsx'
import ScoreBoard from './ScoreBoard.jsx'

const TOTAL_QUESTIONS = 10

export default function QuizScreen({ preset, onFinish }) {
  const [level, setLevel] = useState(() => getStartingLevel(preset))
  const [question, setQuestion] = useState(() => generateQuestion(levelToParams(getStartingLevel(preset))))
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [history, setHistory] = useState([])
  const [questionIndex, setQuestionIndex] = useState(1)
  const [feedback, setFeedback] = useState(null)
  const [trend, setTrend] = useState(null)

  const seconds = getSecondsPerQuestion(preset)
  const effectivePreset = useMemo(() => levelToPresetLabel(level), [level])

  function advance(wasCorrect, newScore) {
    const newHistory = [...history, wasCorrect].slice(-3)
    const newLevel = nextDifficultyLevel(level, newHistory, preset)

    if (newLevel !== level) {
      setTrend(newLevel > level ? 'up' : 'down')
      setHistory([])
    } else {
      setTrend(null)
      setHistory(newHistory)
    }

    if (questionIndex >= TOTAL_QUESTIONS) {
      onFinish(newScore)
      return
    }

    setLevel(newLevel)
    setQuestion(generateQuestion(levelToParams(newLevel)))
    setAnswer('')
    setQuestionIndex((prev) => prev + 1)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (answer.trim() === '') return

    const wasCorrect = Number(answer) === question.answer
    const newScore = wasCorrect ? score + 1 : score
    setFeedback(wasCorrect ? 'correct' : 'wrong')
    setScore(newScore)
    setStreak((prev) => (wasCorrect ? prev + 1 : 0))

    setTimeout(() => {
      setFeedback(null)
      advance(wasCorrect, newScore)
    }, 400)
  }

  function handleExpire() {
    setFeedback('wrong')
    setStreak(0)
    setTimeout(() => {
      setFeedback(null)
      advance(false, score)
    }, 400)
  }

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <span className="quiz-progress">
          Question {questionIndex} / {TOTAL_QUESTIONS}
        </span>
        <Timer key={questionIndex} seconds={seconds} onExpire={handleExpire} />
      </div>

      <ScoreBoard score={score} streak={streak} effectivePreset={effectivePreset} trend={trend} />

      <form className={`question-card ${feedback ? `feedback-${feedback}` : ''}`} onSubmit={handleSubmit}>
        <p className="question-text">
          {question.a} {question.operation} {question.b} = ?
        </p>
        <input
          type="number"
          inputMode="numeric"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          autoFocus
          disabled={feedback !== null}
        />
        <button type="submit" disabled={feedback !== null}>
          Submit
        </button>
      </form>
    </div>
  )
}
