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
      setWaitTime(data.waitTime)
      setCanCompleteAt(new Date(data.canCompleteAt))
      setShowWaitModal(true)
    }
    
    setIsUpdating(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading module...</div>
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
                <h1 className="text-3xl font-bold text-white">THE ACCELERATOR PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Feedback Loop: Refining Your Engine</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">How to turn silence and "no" into your most valuable data.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🔬</div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Lab</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  You drove the traffic. You put your offer in front of real people. And now you are met with a result. For most people, that result is silence. A handful of clicks, maybe a few visitors, but zero sales.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Let me be direct. This is the single most common point of failure. The novice entrepreneur interprets this silence as proof that their idea is bad, that they are not cut out for this. They quit.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    As a professional, you must see this differently. You are not a failed artist. You are a scientist who just ran your first experiment. Silence is not failure. Silence is data. "No" is data. Your job now is to analyze that data and form a new hypothesis.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    This module teaches you how to read the data and iterate intelligently. This is the process that separates successful ventures from forgotten dreams.
                  </p>
                </div>
              </div>

              {/* The Two Levers */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔧</span>
                  <h3 className="text-2xl font-bold text-white">Your Two Levers of Control</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  When your machine is not working, it can feel overwhelming. There are a million things you could change. To simplify, understand that you only have two primary levers to pull. Everything falls under one of these two categories.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-400 mb-2">Lever 1: The Message</div>
                    <p className="text-slate-300 text-sm">This is your offer and your sales page. It is what people see. It includes your headline, your story, your proof, your price, and your call to action. It is the argument for why someone should buy.</p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-purple-400 mb-2">Lever 2: The Audience</div>
                    <p className="text-slate-300 text-sm">This is your traffic source. It is who sees the message. It includes the specific Reddit communities, the Facebook groups, or the type of people you are messaging directly. It is the quality and relevance of your visitors.</p>
                  </div>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                  <p className="font-semibold text-lg text-red-400 mb-2">
                    A great message to the wrong audience will fail. A weak message to the right audience will also fail.
                  </p>
                  <p className="text-slate-300">
                    Your job is not to guess. Your job is to diagnose which lever is broken and focus all your energy on fixing that one thing.
                  </p>
                </div>
              </div>

              {/* Your Diagnostic Tree */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🌳</span>
                  <h3 className="text-2xl font-bold text-white">The Diagnostic Tree: Finding the Bottleneck</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Follow this simple decision tree to find out where your problem is.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">Step 1: Check Your Clicks</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Look at the results of your "hunting" actions in Module 7. Did people click your links?
                    </p>
                    <div className="bg-blue-900/20 rounded-lg p-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-semibold text-red-400 mb-2">IF NO (or very few clicks) →</div>
                        <p className="text-slate-300 text-sm">The problem is your <strong className="text-white">Audience</strong> or your initial outreach. Your value bombs are not valuable, your DMs are seen as spam, or you are in the wrong watering holes. The message is not even getting a chance. Your problem is at the source. <strong className="text-white">Focus on fixing Lever 2.</strong></p>
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-400 mb-2">IF YES (You got 25+ visitors) →</div>
                        <p className="text-slate-300 text-sm">Congratulations, your hunting tactics are working. People are interested enough to click. The problem is not at the source. Proceed to the next step.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">Step 2: Check Your Sales</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Of the people who visited your page, did anyone buy?
                    </p>
                    <div className="bg-purple-900/20 rounded-lg p-4 grid md:grid-cols-2 gap-4">
                       <div>                       
                        <div className="font-semibold text-red-400 mb-2">IF NO (or maybe just one sale) →</div>
                        <p className="text-slate-300 text-sm">You have a healthy stream of interested people, but your sales page is not convincing them. The problem is your <strong className="text-white">Message</strong>. Your headline might be weak, your proof is not convincing, your price is wrong, or your story is not resonating. <strong className="text-white">Focus on fixing Lever 1.</strong> This is the most common problem to have.</p>
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-400 mb-2">IF YES (You got a few sales) →</div>
                        <p className="text-slate-300 text-sm">You have found Product Market Fit! Your message is resonating with your audience. Your primary job is no longer to fix what is broken. Your job is to scale. This means doing more of what works: more value bombs, more DMs, more traffic. Your job is to double down on Lever 2.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: The Performance Review</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    It is time to be an objective CEO. You are going to analyze your last week of work and create a plan for the next one.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Write Down Your Metrics.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Open a blank document. Write down three numbers: Total Actions Taken (from Module 7), Total Visitors to Page, and Total Sales.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Diagnose Your Bottleneck.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Using the Diagnostic Tree, identify your single biggest bottleneck. In one sentence, write down your conclusion. Example: "My problem is the Message because I got 50 visitors but zero sales."</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Propose One Change.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Based on your diagnosis, decide on <strong className="text-white">one single thing</strong> you will change for your next experiment. Do not try to change everything. If your problem is the Message, you might rewrite the headline. If it is the Audience, you might choose a new subreddit. Write this change down.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Grade Checklist</h5>
                  <p className="text-slate-300 mb-4">
                    Look at your document. Can you confidently answer "yes" to these questions?
                  </p>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have I written down my exact metrics for visitors and sales?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have I clearly identified if my problem is the "Message" or the "Audience"?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                       <span>Have I committed to changing only ONE specific variable for my next iteration?</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    This is the real work.
                  </p>
                  <p className="text-slate-300">
                    The entrepreneurial fantasy is a perfect launch. The reality is this loop: Launch. Measure. Learn. Repeat. By completing this analysis, you are doing the real work that builds profitable, resilient businesses.
                  </p>
                </div>
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
              {isCompleted ? "Module completed! You know what to do next." : "Complete the analysis to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have analyzed your results and created a new plan of action, you are ready to iterate.
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
            
            <Link href="/order/product/RemoteReadyBootcamp/module-9">
              <Button variant="outline">
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