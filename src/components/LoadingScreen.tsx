"use client"

import { useEffect, useState } from "react"
import { Globe, Plane, DollarSign, Map, Wifi, Coffee } from "lucide-react"

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message = "Loading Remote Ready Bootcamp..." }: LoadingScreenProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [progress, setProgress] = useState(0)

  const tips = [
    "🌎 Over 50 million people work remotely worldwide",
    "✈️ Digital nomads save 68% more money than office workers",
    "💰 Remote workers earn 22% more on average",
    "🏝️ Bali has become the #1 digital nomad destination",
    "📱 All you need is a laptop and internet connection",
    "🎯 Start earning your first $1000 online in 14 days"
  ]

  const icons = [Globe, Plane, DollarSign, Map, Wifi, Coffee]

  useEffect(() => {
    // Cycle through tips every 2 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 2000)

    // Simulate progress loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0 // Reset for continuous loop
        return prev + Math.random() * 15
      })
    }, 200)

    return () => {
      clearInterval(tipInterval)
      clearInterval(progressInterval)
    }
  }, [tips.length])

  const CurrentIcon = icons[currentTip % icons.length]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 w-32 h-20 bg-white/30 rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-24 h-16 bg-white/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-28 h-18 bg-white/35 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-gradient-to-r from-sky-300/20 to-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-indigo-300/20 to-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="text-center z-10 max-w-md mx-auto px-6">
        {/* Main Loading Animation */}
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 border-4 border-sky-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-sky-500 border-r-sky-400 rounded-full animate-spin"></div>
            
            {/* Inner pulsing circle with icon */}
            <div className="absolute inset-4 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <CurrentIcon className="w-8 h-8 text-white" />
            </div>
            
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="w-3 h-3 bg-sky-500 rounded-full absolute -top-1.5 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
              <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '2s' }}>
              <div className="w-2 h-2 bg-indigo-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-sky-100 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sky-600 text-sm mt-2 font-medium">{Math.round(Math.min(progress, 100))}% Ready</p>
        </div>

        {/* Loading Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {message}
        </h2>

        {/* Rotating Tips */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-sky-200 min-h-[80px] flex items-center">
          <div className="w-full">
            <p className="text-sky-700 font-medium text-sm mb-1">Did you know?</p>
            <p 
              key={currentTip}
              className="text-gray-700 font-medium animate-fade-in"
            >
              {tips[currentTip]}
            </p>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-gray-600 mt-6 text-sm">
          Preparing your journey to financial freedom...
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
