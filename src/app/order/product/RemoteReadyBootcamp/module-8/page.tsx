'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module8() {
  const moduleId = 8
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [showWaitModal, setShowWaitModal] = useState(false)
  const [waitTime, setWaitTime] = useState({ hours: 0, minutes: 0, totalMinutes: 0 })
  const [canCompleteAt, setCanCompleteAt] = useState(new Date())

  useEffect(() => {
    async function checkProgress() {
      const product = 'RemoteReadyBootcamp'
      const progress = await fetchUserProgress(product)
      
      if (progress) {
        // Module 8 has access if currentModule is >= 8
        setHasAccess(progress.currentModule >= moduleId)
        // Module 8 is completed if currentModule is > 8
        setIsCompleted(progress.currentModule > moduleId)
      } else {
        // No progress means only module 1 is accessible
        setHasAccess(false)
      }
      setIsLoading(false)
    }
    checkProgress()
  }, [])

  const handleCompleteModule = async () => {
    setIsUpdating(true)
    const product = 'RemoteReadyBootcamp'
    
    // Update progress to module 9 (completing module 8)
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product,
        currentModule: moduleId + 1
      })
    })

    const data = await response.json()
    
    if (response.ok) {
      setIsCompleted(true)
    } else if (data.error === 'WAIT_TIME_NOT_ELAPSED' && data.waitTime) {
      // Show wait time modal
      setWaitTime(data.waitTime)
      setCanCompleteAt(new Date(data.canCompleteAt))
      setShowWaitModal(true)
    }
    
    setIsUpdating(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading module...
      <WaitTimeModal 
        isOpen={showWaitModal}
        onClose={() => setShowWaitModal(false)}
        waitTime={waitTime}
        canCompleteAt={canCompleteAt}
      /></div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <Link href="/order/product/RemoteReadyBootcamp" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
              ← Back to Course
            </Link>
            
            <div className="bg-slate-800 rounded-lg p-8 text-center">
              <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Module 8 - Locked</h1>
              <p className="text-slate-300 mb-6">
                You need to complete the previous modules first to access this content.
              </p>
              <Link href="/order/product/RemoteReadyBootcamp">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Back to Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Navigation */}
          <Link href="/order/product/RemoteReadyBootcamp" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
            ← Back to Course
          </Link>

          {/* Module Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-emerald-100 text-sm">Module 8</div>
                <h1 className="text-3xl font-bold text-white">PRICING STRATEGIES</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Master pricing psychology and value-based pricing models</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Module Content</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                This module focuses on master pricing psychology and value-based pricing models. You'll learn practical strategies, tools, and techniques that successful remote workers use to excel in this area. The content includes step-by-step guides, real-world examples, and actionable frameworks you can implement immediately.
              </p>
              
              <div className="bg-slate-700/30 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">⚡ Key Learning Objectives</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Master the fundamentals of master pricing psychology and value-based pricing models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Implement proven strategies and best practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Apply practical tools and techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Create actionable plans for immediate implementation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: isCompleted ? "100%" : "0%" }}
                ></div>
              </div>
              <span className="text-emerald-400 font-semibold">{isCompleted ? "100%" : "0%"}</span>
            </div>
            <p className="text-slate-400 mt-2">
              {isCompleted ? "Module completed! You can now access the next module." : "Complete this module to unlock the next one."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you've completed the learning objectives above, click the button below to mark this module as complete and unlock the next module.
              </p>
              <Button 
                onClick={handleCompleteModule}
                disabled={isUpdating}
                className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-lg"
              >
                {isUpdating ? "Completing..." : `Complete Module ${moduleId} →`}
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            
            <Link href="/order/product/RemoteReadyBootcamp/module-7">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            
            <Link href="/order/product/RemoteReadyBootcamp">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Back to Course →
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