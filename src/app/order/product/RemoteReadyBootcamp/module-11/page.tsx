'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module11() {
  const moduleId = 11
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
    
    // Update progress to module 12 (completing module 11)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 11 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 11</div>
                <h1 className="text-3xl font-bold text-white">THE SOVEREIGN PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">Systems and Escape Velocity</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">How to fire yourself from your own business and achieve true freedom.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-3xl font-bold text-white mb-2">The Ghost in the Machine</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  You have come a very long way. You turned a problem into a product. You built a sales page, a traffic source, and an email list. You have a business. But if you look closely, you will see that you have also built yourself a job.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Right now, you are the ghost in the machine. You are the one creating the content, answering the emails, tweaking the sales page, and posting the splinters. Your business works, but it needs you. To reach escape velocity, the point where your business funds your life without consuming it, you must remove yourself from the day to day operations.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    This is the final hurdle. It requires a profound psychological shift. You must stop thinking like a freelancer who does tasks and start thinking like a CEO who builds systems.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    Your goal is not to do the work. Your goal is to design a system that does the work for you.
                  </p>
                </div>
              </div>

               {/* The Freedom Audit */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔍</span>
                  <h3 className="text-2xl font-bold text-white">The Freedom Audit</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                   You cannot optimize what you do not measure. Your time is your most finite resource. Before you can buy it back, you must know where it is being spent.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                   Every task you perform in your business falls into one of two categories: high leverage creative work or low leverage repetitive work.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                 <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-emerald-400 mb-2">High Leverage ($1,000/hr)</div>
                    <p className="text-slate-300 text-sm">Strategic decisions, inventing new products, building partnerships, forming your company's vision. These are tasks only you can do.</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-red-400 mb-2">Low Leverage ($10/hr)</div>
                    <p className="text-slate-300 text-sm">Scheduling social media posts, editing videos, answering common customer service questions, formatting blog posts. These are repetitive tasks that can be documented and handed off.</p>
                  </div>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                  <p className="font-semibold text-lg text-red-400 mb-2">
                    Most founders spend their days on ten dollar tasks.
                  </p>
                  <p className="text-slate-300">
                   They feel busy and productive, but they are stuck. True freedom comes from ruthlessly eliminating, automating, or delegating all low leverage work so you can focus on the tasks that truly grow the business.
                  </p>
                </div>
              </div>


              {/* The EAD Framework */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-2xl font-bold text-white">The E.A.D. Framework: Buying Back Your Time</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Once you know where your time goes, you can reclaim it using a simple three step framework. For every low leverage task, you will ask these questions in order.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 rounded-lg p-6 border border-red-500/30">
                    <h4 className="text-xl font-bold text-red-400 mb-4">1. ELIMINATE: Can I just stop doing this?</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the most powerful and overlooked step. We create work for ourselves out of habit or perfectionism. Do you really need to check your sales stats every hour? Does that Instagram post truly need another revision?
                    </p>
                    <div className="bg-red-900/20 rounded-lg p-4 text-sm">
                      <p className="text-red-300 font-semibold">Challenge every task. Ask, "What would happen if I did not do this?" Often, the answer is "nothing." Eliminating a task is pure profit. It costs you nothing and returns 100% of your time.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">2. AUTOMATE: Can a machine do this for me?</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      If a task cannot be eliminated, it must be automated. We have already done this with our email welcome sequence. But this applies everywhere.
                    </p>
                    <div className="bg-blue-900/20 rounded-lg p-4 text-sm">
                      <ul className="list-disc ml-5 space-y-2 text-slate-300">
                        <li>Use a tool like Buffer or Hypefury to schedule all your social media posts for the week in one sitting.</li>
                        <li>Use Zapier to connect your apps. When someone buys your product, Zapier can automatically add them to a "customer" email list and send them a welcome note.</li>
                        <li>Use a service like Descript to automatically edit and pull clips from your pillar videos.</li>
                      </ul>
                       <p className="text-blue-300 font-semibold mt-3">Investing a few hours to set up an automation can save you hundreds of hours in the long run.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">3. DELEGATE: Can someone else do this for me?</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the final and most powerful step. For any repetitive task that cannot be eliminated or automated, you must delegate it. This means making your first hire: a virtual assistant (VA).
                    </p>
                    <div className="bg-purple-900/20 rounded-lg p-4">
                       <p className="text-purple-300 mb-3 font-semibold">Start small. Hire a VA for just 5 hours a week from a platform like Upwork or OnlineJobs.ph. Create a simple "Standard Operating Procedure" (SOP) by recording a Loom video of you doing the task once. Your first delegated task could be taking your Pillar content and creating and scheduling all the Splinter posts. This single action can free up hours every week.</p>
                       <p className="text-white font-semibold">Delegating is not an expense. It is buying back your time so you can invest it in thousand dollar per hour activities.</p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Design Your Freedom Blueprint</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    It is time to conduct an audit of your own business and create a plan to systematically fire yourself from the low leverage tasks.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Perform Your Time Audit.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Open a document. List every single business related task you have done in the past week, from checking email to posting on social media.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Apply the E.A.D. Framework.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Next to each task, label it with "Eliminate," "Automate," or "Delegate." Be honest and ruthless.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Draft Your First SOP.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Pick one task from your "Delegate" list. Record a short (under 5 minutes) screen share video of you performing that task, explaining it as you go. Save this video. This is your first Standard Operating Procedure.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Grade Checklist</h5>
                   <p className="text-slate-300 mb-4">You have completed this module when you have an actionable document for reclaiming your time. Check your work:</p>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Do you have a comprehensive list of your weekly business tasks?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Has every task been categorized as Eliminate, Automate, or Delegate?</span>
                    </div>
                     <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have you created and saved at least one video SOP for a task you plan to delegate?</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    You are now designing your freedom.
                  </p>
                  <p className="text-slate-300">
                    This blueprint is the final step in creating a business that serves your life, not the other way around. As you execute this plan, you will reach escape velocity, where your income is no longer tied to your hours. That is when the real adventure begins.
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
              {isCompleted ? "Module completed! Your freedom blueprint is designed." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have a clear plan to buy back your time, the path to sovereignty is open.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-10">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-12">
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