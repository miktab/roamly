"use client"

import { useEffect, useState } from "react"

interface CountdownBarProps {
  startDate: string
  title: string
  className?: string
}

interface TimeRemaining {
  hours: number
  minutes: number
  seconds: number
  total: number
}

export default function CountdownBar({ startDate, title, className = "" }: CountdownBarProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const calculateTimeRemaining = (): TimeRemaining | null => {
    const now = new Date().getTime()
    const start = new Date(startDate).getTime()
    const diff = start - now

    if (diff <= 0) {
      return null // Product is already available
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return {
      hours,
      minutes,
      seconds,
      total: diff
    }
  }

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = calculateTimeRemaining()
      setTimeRemaining(remaining)
      
      // Only show if less than 1 hour away
      if (remaining && remaining.total <= 3600000) { // 3600000ms = 1 hour
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial calculation
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  if (!isVisible || !timeRemaining) {
    return null
  }

  // Calculate progress percentage (reverse - closer to 0 means more progress)
  const progressPercentage = Math.max(0, 100 - ((timeRemaining.total / 3600000) * 100))

  return (
    <div className={`bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <span className="text-orange-800 font-semibold text-sm">
          🚀 {title} unlocks in less than 1 hour!
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-orange-700">
          <span>Time remaining</span>
          <span className="font-mono font-medium">
            {timeRemaining.hours.toString().padStart(2, '0')}:
            {timeRemaining.minutes.toString().padStart(2, '0')}:
            {timeRemaining.seconds.toString().padStart(2, '0')}
          </span>
        </div>
        
        <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="text-xs text-orange-600 text-center">
          Get ready for your transformation journey!
        </div>
      </div>
    </div>
  )
}
