"use client"

import { useEffect, useState } from "react"

interface TimerProps {
  initialMinutes: number
  onTimeUp?: () => void
}

export function Timer({ initialMinutes, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const minutes = Math.floor(timeLeft / 60)
  const progress = (timeLeft / (initialMinutes * 60)) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeUp, initialMinutes])

  return (
    <div className="relative h-12 w-12">
      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-200"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
        />
        <circle
          className="stroke-[#01805C] transition-all duration-1000 ease-linear"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeDasharray={`${progress * 2.827} 282.7`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold">{String(minutes).padStart(2, "0")}</span>
        <span className="text-xs">Min</span>
      </div>
    </div>
  )
}
