'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module25() {
  const moduleId = 25
  const productId = 'AiContentChallenge'
  
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [showWaitModal, setShowWaitModal] = useState(false)
  const [waitTime, setWaitTime] = useState({ hours: 0, minutes: 0, totalMinutes: 0 })
  const [canCompleteAt, setCanCompleteAt] = useState(new Date())

  useEffect(() => {
    async function checkProgress() {
      const progress = await fetchUserProgress(productId)
      
      if (progress) {
        setHasAccess(progress.currentModule >= moduleId)
        setIsCompleted(progress.currentModule > moduleId)
      } else {
        setHasAccess(false)
      }
      setIsLoading(false)
    }
    checkProgress()
  }, [])

  const handleCompleteModule = async () => {
    setIsUpdating(true)
    
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: productId,
        currentModule: moduleId + 1
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      setIsCompleted(true)
    } else if (data.error === 'WAIT_TIME_NOT_ELAPSED' && data.waitTime) {
      setWaitTime(data.waitTime)
      setCanCompleteAt(new Date(data.canCompleteAt))
      setShowWaitModal(true)
    }
    
    setIsUpdating(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading module...</div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
        <div className="px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <Link href={`/order/product/${productId}`} className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
              ← Back to Challenge
            </Link>
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-8 text-center">
              <Lock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Module 25 - Locked</h1>
              <p className="text-slate-400 mb-6">
                Complete the previous modules to unlock this content.
              </p>
              <Link href={`/order/product/${productId}`}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Back to Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Link href={`/order/product/${productId}`} className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
            ← Back to Challenge
          </Link>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 shadow-lg shadow-indigo-900/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-blue-100 text-sm font-medium tracking-wider">MODULE 25</div>
                <h1 className="text-3xl font-bold text-white">SPONSORSHIP READY</h1>
              </div>
            </div>
            <p className="text-blue-100 text-lg">Creating a media kit and preparing for brand deals.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💼</div>
                <h2 className="text-3xl font-bold text-white mb-2">SPONSORSHIP READY</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Welcome to Module 25. In this module, you'll master the key concepts and techniques needed to progress in your AI Content Challenge journey.
                </p>
                
                <div className="bg-slate-800/50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                  <p className="text-blue-300 font-semibold text-lg mb-2">Focus Area:</p>
                  <p className="text-slate-300">Creating a media kit and preparing for brand deals.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-lg p-8 mb-8 border border-indigo-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn</h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-800/50 p-5 rounded-lg border border-indigo-500/20">
                    <h4 className="text-white font-bold mb-2">📌 Core Concept</h4>
                    <p className="text-slate-400 text-sm">Master the fundamental principles and techniques required for this module.</p>
                  </div>

                  <div className="bg-slate-800/50 p-5 rounded-lg border border-indigo-500/20">
                    <h4 className="text-white font-bold mb-2">🛠️ Practical Application</h4>
                    <p className="text-slate-400 text-sm">Learn the tools and workflows you need to implement these concepts.</p>
                  </div>

                  <div className="bg-slate-800/50 p-5 rounded-lg border border-indigo-500/20">
                    <h4 className="text-white font-bold mb-2">💡 Real-World Examples</h4>
                    <p className="text-slate-400 text-sm">Study successful case studies and proven strategies from the field.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900/40 rounded-xl p-8 border-2 border-indigo-500/40 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-indigo-300 mb-2">Your Assignment</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-slate-900/60 rounded-lg p-4 border border-indigo-500/30 flex items-start gap-4">
                    <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">1</div>
                    <div>
                      <h4 className="text-white font-semibold">Primary Task</h4>
                      <p className="text-slate-400 text-sm">Complete the core assignment for this module. This is where you apply what you've learned.</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 rounded-lg p-4 border border-indigo-500/30 flex items-start gap-4">
                    <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">2</div>
                    <div>
                      <h4 className="text-white font-semibold">Practice & Experiment</h4>
                      <p className="text-slate-400 text-sm">Test the techniques and strategies you've learned in a real-world context.</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 rounded-lg p-4 border border-indigo-500/30 flex items-start gap-4">
                    <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">3</div>
                    <div>
                      <h4 className="text-white font-semibold">Reflection & Documentation</h4>
                      <p className="text-slate-400 text-sm">Document your learnings, insights, and progress as you move forward.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-lg p-6 mb-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Module Progress</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: isCompleted ? "100%" : "0%" }}
                ></div>
              </div>
              <span className="text-indigo-400 font-semibold">{isCompleted ? "100%" : "0%"}</span>
            </div>
            <p className="text-slate-400 mt-2">
              {isCompleted ? "Module completed! You've unlocked the next module." : "Complete the assignment to progress."}
            </p>
          </div>

          {!isCompleted && (
            <div className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 rounded-lg p-6 mb-8 border border-indigo-500/30 text-center">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">Ready to Progress?</h3>
              <p className="text-slate-300 mb-6">
                Once you've completed the assignment, click below to unlock the next module.
              </p>
              <Button 
                onClick={handleCompleteModule}
                disabled={isUpdating}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-lg w-full md:w-auto"
              >
                {isUpdating ? "Unlocking..." : `Complete Module ${moduleId} & Continue →`}
              </Button>
            </div>
          )}

          <div className="flex justify-between">
            <Link href={`/order/product/${productId}/module-${moduleId - 1}`}>
              <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-white">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href={`/order/product/${productId}/module-${moduleId + 1}`}>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Next Module →
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <WaitTimeModal 
        isOpen={showWaitModal}
        onClose={() => setShowWaitModal(false)}
        waitTime={waitTime}
        canCompleteAt={canCompleteAt}
      />
    </div>
  )
}
