'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module6() {
  const moduleId = 6
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
    
    // Update progress to module 7 (completing module 6)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 6 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 6</div>
                <h1 className="text-3xl font-bold text-white">THE ACCELERATOR PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The One Page Sales Machine</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">How to write words that sell so you don’t have to.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">📜</div>
                <h2 className="text-3xl font-bold text-white mb-2">Your 24/7 Salesperson</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Congratulations. You have a product. It might be a collection of videos in a Notion page or assets in a private folder, but it is real. It is a machine capable of getting someone a result.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    But a machine with no operator does nothing. Right now, you are the only operator. You have to get on calls or send DMs to make a sale. To build real freedom, we need to replace you.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    Your replacement is a single page on the internet. A salesperson made of words that works tirelessly for you, day and night, anywhere in the world.
                  </p>
                </div>
              </div>

              {/* Psychology Shift */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🧠</span>
                  <h3 className="text-2xl font-bold text-white">The Psychology of Selling the Future</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  The most common mistake people make when writing a sales page is listing features. "You get 12 videos, 5 worksheets, and access to a community." Nobody actually wants those things.
                </p>

                <p className="text-slate-300 leading-relaxed mb-4">
                  People do not buy what your product <strong className="text-white">is</strong>. They buy what it <strong className="text-white">does</strong> for them. They buy the After state. They buy the future version of themselves.
                </p>

                <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                  <p className="font-semibold text-lg text-red-400 mb-2">
                    Stop selling the airplane. Sell Paris.
                  </p>
                  <p className="text-slate-300">
                    The videos, the worksheets, the tools... that is just the airplane. It is the boring vehicle. The destination—the confidence, the financial freedom, the first client, the view from the Eiffel Tower—that is what people truly desire. Your sales page is a travel brochure for a better life.
                  </p>
                </div>
              </div>

              {/* Anatomy of a Sales Page */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🧬</span>
                  <h3 className="text-2xl font-bold text-white">Anatomy of a Page That Sells</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  A good sales page is not a literary masterpiece. It is a logical argument that guides a reader from skepticism to a confident purchase. It has a specific structure. Follow this structure.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">1. The Headline: The Hook</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the most important part. 8 out of 10 people will read your headline but only 2 will read the rest. It must grab your ideal customer by the collar by calling them out and promising a specific outcome.
                    </p>
                    <div className="bg-blue-900/20 rounded-lg p-4">
                      <div className="text-blue-300 mb-2">A strong formula: <strong className="text-white">The [Adjective] Way for [Specific Audience] to [Achieve Desired Outcome] without [Common Pain].</strong></div>
                      <div className="text-slate-300 text-sm">Example: "The Proven System for New Freelancers to Land High Paying Clients Without Wasting Time on Bidding Sites."</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">2. The Problem: Agitate Their Pain</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Before you can sell the cure, you must diagnose the disease. Describe their current reality. Use the exact words you heard in your research. Show them you understand their frustration, their fear, their struggle.
                    </p>
                    <div className="bg-purple-900/20 rounded-lg p-4 text-sm italic">
                      "Are you tired of staring at a blinking cursor, wondering where your next client will come from? Do you feel like you are doing everything right but getting nowhere?"
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg p-6 border border-emerald-500/30">
                    <h4 className="text-xl font-bold text-emerald-400 mb-4">3. The Solution: Introduce the Promised Land</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Now paint a vivid picture of the 'After' state. What does life look like once their problem is solved? Do not just say "you will have more money." Say "Imagine waking up, checking your phone, and seeing two new client inquiries waiting for you, without you having to pitch or sell."
                    </p>
                    <p className="text-white font-semibold">After you paint this picture, you introduce your product as the bridge to get them there.</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-500/30">
                    <h4 className="text-xl font-bold text-orange-400 mb-4">4. The Proof: Earn Their Trust</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      People are skeptical. You need to prove you can deliver. Your client testimonial from Module 4 is your most powerful weapon here. Showcase it prominently. Use their name and photo if they allow it.
                    </p>
                    <div className="bg-orange-900/20 rounded-lg p-4 font-semibold text-center text-lg text-orange-300">
                      A specific, glowing testimonial is more valuable than any claim you can make about yourself.
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 rounded-lg p-6 border border-yellow-500/30">
                    <h4 className="text-xl font-bold text-yellow-400 mb-4">5. The Offer & Call to Action: Make it Irresistible and Clear</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Clearly state what they are buying and what it costs. Stack the value by listing everything they get. Then, eliminate any remaining fear with a rock solid guarantee. A simple "30 Day, 100% money back guarantee" is enough to show confidence.
                    </p>
                    <p className="text-slate-300 leading-relaxed">Finally, tell them exactly what to do with a big, clear button. "Get Instant Access Now." "Enroll Today." Do not be clever. Be clear.</p>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Write Your Sales Page Draft</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    This is a writing assignment. Your only goal is to produce the full text for your sales page. Forget about design for now. Just write.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Open a blank document.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Use Google Docs, Notion, or any simple text editor. Title it "[Product Name] Sales Page Copy V1."</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Write the full copy, section by section.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Following the structure from this module, write the content for each of the five parts: The Headline, The Problem, The Solution, The Proof, and The Offer. Do not edit as you go. Just get the ideas down.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Check Before Completing</h5>
                  <p className="text-slate-300 mb-4">
                    Before you mark this module as complete, read your draft out loud. Does it flow logically? Does it feel exciting? Does it sound like you? Review this checklist:
                  </p>
                  
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Is my headline specific to my audience and their desired outcome?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Does my 'Problem' section use emotional language my audience would use?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Is my client testimonial included and easy to see?</span>
                    </div>
                     <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Is my call to action clear and direct?</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    Words are the currency of the internet.
                  </p>
                  <p className="text-slate-300">
                    Learning to write compelling copy is perhaps the highest leverage skill you can develop. This document is the engine of your business. In the next module, we'll put fuel in that engine by driving your first visitors to this page.
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
              {isCompleted ? "Module completed! Your sales engine copy is written." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have a complete first draft of your sales page copy, you are ready to proceed.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-5">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-7">
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