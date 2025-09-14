'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module3() {
  const moduleId = 3
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
        // Module 3 has access if currentModule is >= 3
        setHasAccess(progress.currentModule >= moduleId)
        // Module 3 is completed if currentModule is > 3
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
    
    // Update progress to module 4 (completing module 3)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 3 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 3</div>
                <h1 className="text-3xl font-bold text-white">THE ENGINE PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Offer & The First Dollar</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Turn your validated problem into your first paying customer - before you build anything</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Module Content</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                Welcome back. If you're watching this, it means you did the work. You stepped into the arena. You took a fuzzy idea, sharpened it into a hypothesis, and shared it with the community.
              </p>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                A hypothesis is not a business. A business is an exchange of value for money. In Module 2, we found a painful problem. In this module, we're going to do the single most important thing in your entrepreneurial journey: <strong className="text-emerald-400">get your first dollar</strong> for solving that problem... before you build anything.
              </p>

              <div className="bg-red-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400 mb-4">🧠 The Builder's Trap</h3>
                <p className="text-slate-300 mb-3">Here is the predictable, tragic path of 99% of aspiring entrepreneurs:</p>
                <ul className="space-y-2 text-slate-300 ml-4">
                  <li>• They get an idea and get excited</li>
                  <li>• They retreat into "The Builder's Trap"</li>
                  <li>• They spend months building the perfect product in isolation</li>
                  <li>• They finally launch to... crickets. Silence.</li>
                </ul>
                <p className="text-emerald-400 font-semibold mt-4">Our mantra: Sell first, build second.</p>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">🎯 The Core Concept</h3>
                <p className="text-slate-300 mb-4">
                  You are not selling a "product" or "course." You are selling a <strong>transformation</strong> - a bridge from their current painful reality (Point A) to their desired future (Point B).
                </p>
                <p className="text-slate-300">
                  Your first offer is a <strong className="text-emerald-400">Concierge Service</strong> - a high-touch "Founding Member" program where you personally walk your first few clients across the bridge.
                </p>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Your Irresistible Offer Stack</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="text-emerald-400 font-semibold">Layer 1: The Core Promise (The Outcome)</h4>
                    <p className="text-slate-300 text-sm">The specific transformation you'll deliver</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="text-teal-400 font-semibold">Layer 2: The Delivery Mechanism (The "How")</h4>
                    <p className="text-slate-300 text-sm">High-touch, personal delivery methods</p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h4 className="text-cyan-400 font-semibold">Layer 3: Risk Reversal & Bonuses</h4>
                    <p className="text-slate-300 text-sm">Guarantees and bonuses that eliminate fear</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">🔍 Finding "Patient Zero"</h3>
                <p className="text-slate-300 mb-4">You need one person to say yes - your first case study. Two approaches:</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-emerald-400 font-semibold mb-2">1. Warm Outreach (The "Feedback" Method)</h4>
                    <p className="text-slate-300 text-sm">Ask friends/colleagues who fit your audience for "feedback" on your idea</p>
                  </div>
                  <div>
                    <h4 className="text-teal-400 font-semibold mb-2">2. Cold Outreach (The "Digital Detective" Method)</h4>
                    <p className="text-slate-300 text-sm">Find people who posted about your problem in forums/groups</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-900/30 rounded-lg p-6 mb-8 border border-emerald-500/30">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">💰 The Moment of Truth - Making the Ask</h3>
                <p className="text-slate-300 mb-4">
                  Listen 80% of the time. Dig deep into their pain. Then make your offer with confidence.
                </p>
                <p className="text-emerald-400 font-semibold">
                  Price range: $200-$500 for founding members. High enough for validation, low enough for impulse buy.
                </p>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">⚡ Key Learning Objectives</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Avoid "The Builder's Trap" by selling before building</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Craft an irresistible 3-layer offer stack</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Master warm and cold outreach strategies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Get your first paying customer or valuable market feedback</span>
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
              {isCompleted ? "Module completed! You got your first dollar and validated your offer. Time to deliver!" : "Get your first paying customer or valuable market feedback to complete this module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">📝 Your Assignment: Get Your First Dollar</h3>
              <div className="text-left max-w-3xl mx-auto">
                <p className="text-slate-300 mb-6">
                  Your mission is to get your first "yes" or your first "no." Both are incredibly valuable.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-emerald-400 font-semibold mb-2">Step 1: Build Your Irresistible Offer Stack</h4>
                    <p className="text-slate-300 text-sm">Write out your 3-layer offer: Core Promise, Delivery Mechanism, and Risk Reversal/Bonuses</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-emerald-400 font-semibold mb-2">Step 2: Create Your "Patient Zero" Hit List</h4>
                    <p className="text-slate-300 text-sm">Identify 5 real people you can contact with their names and contact methods</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-emerald-400 font-semibold mb-2">Step 3: Initiate Contact</h4>
                    <p className="text-slate-300 text-sm">Reach out to at least 3 people this week. Goal: book one call</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-emerald-400 font-semibold mb-2">Step 4: Have the Conversation & Make the Ask</h4>
                    <p className="text-slate-300 text-sm">Listen 80%, understand their pain, then clearly state your offer and price</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-emerald-400 font-semibold mb-2">Step 5: Post Your Result</h4>
                    <p className="text-slate-300 text-sm">Share your success or learnings in the WhatsApp community</p>
                  </div>
                </div>
              </div>
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
            
            <Link href="/order/product/RemoteReadyBootcamp/module-2">
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