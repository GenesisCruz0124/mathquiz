import { useEffect, useRef, useState } from 'react'

export default function Timer({ seconds, onExpire }) {
  const [remaining, setRemaining] = useState(seconds)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [seconds])

  useEffect(() => {
    if (remaining === 0) onExpireRef.current()
  }, [remaining])

  const isLow = remaining <= 3

  return (
    <div className={`timer ${isLow ? 'timer-low' : ''}`}>
      <div className="timer-bar" style={{ width: `${(remaining / seconds) * 100}%` }} />
      <span className="timer-text">{remaining}s</span>
    </div>
  )
}
