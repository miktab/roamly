'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module4() {
  const moduleId = 4
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
        // Module 4 has access if currentModule is >= 4
        setHasAccess(progress.currentModule >= moduleId)
        // Module 4 is completed if currentModule is > 4
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
    
    // Update progress to module 5 (completing module 4)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 4 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 4</div>
                <h1 className="text-3xl font-bold text-white">THE ENGINE PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Concierge MVP: Delivering Your First Result</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">How to manually deliver an amazing result for your first client, and secretly build your product at the same time.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Welcome */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-bold text-white mb-2">The Hardest Part is Over</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Let's be very clear. If you are here, you have done what very few people ever do. You pushed past the fear of rejection, you made an offer, and you got a "yes." You earned your first dollar online. You have proven that a stranger is willing to pay you to solve a problem. That is everything.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    The game is no longer about validation. The game is now about execution. The question is no longer "Will they pay for this?" The question is "How do I deliver a world class result?"
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    This module is about how to deliver that result while simultaneously building the foundation of your scalable product.
                  </p>
                </div>
              </div>

              {/* The Two Hats */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎩</span>
                  <h3 className="text-2xl font-bold text-white">You Now Wear Two Hats</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  Right now, you do not just have one job. You have two. Understanding this distinction is critical and will save you from a huge, common mistake.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-emerald-400 mb-2">🎩 Hat 1: The Coach / Consultant</div>
                    <p className="text-slate-300 text-sm">Your primary job is to get your founding client an incredible result. This is your only priority with them. Do whatever it takes. Get on calls, create custom documents, answer their DMs. You are their guide. Your goal is a glowing testimonial and a life you have changed.</p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-purple-400 mb-2">🎩 Hat 2: The Product Manager</div>
                    <p className="text-slate-300 text-sm">Your second job, which you do in the background, is to be a system architect. You must observe and document everything you are doing to get your client the result. You are not just solving the problem; you are creating a repeatable process for solving the problem.</p>
                  </div>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                  <p className="text-red-400 font-semibold text-lg mb-2">
                    The fatal mistake is only wearing the first hat.
                  </p>
                  <p className="text-slate-300">
                    If you only act as a consultant, you will finish your work with a happy client but nothing to sell to the next 100 people. You will have a service, not a business. We are building a freedom machine, and a service that depends entirely on you is just a higher paying job.
                  </p>
                </div>
              </div>

              {/* The Delivery & Documentation System */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚙️</span>
                  <h3 className="text-2xl font-bold text-white">The Delivery & Documentation System</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  This sounds complicated, but we have a simple system for it. You will perform the concierge service for your client, and every action you take will create a reusable 'asset'. These assets become the Lego bricks of your future product.
                </p>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">1. The "Blueprint Binder"</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      The first thing you will do is create a central repository. This can be a Google Drive folder, a Notion workspace, whatever you prefer. Name it "[Product Name] - V1 Blueprint". This is your lab.
                    </p>
                    
                    <div className="bg-blue-900/20 rounded-lg p-4">
                      <p className="font-semibold text-blue-300 mb-2">Every single thing you create for your client goes in here.</p>
                      <ul className="space-y-2 text-sm text-slate-300 list-disc ml-5">
                        <li>The welcome email you send them? <span className="text-blue-200">Asset: "Welcome Email Template.doc"</span></li>
                        <li>A checklist you make to guide them through a step? <span className="text-blue-200">Asset: "Step 1 Checklist.pdf"</span></li>
                        <li>A quick video you record to explain a concept? <span className="text-blue-200">Asset: "Concept X Explainer.mp4"</span></li>
                        <li>The recording of your call with them? <span className="text-blue-200">Asset: "Client Call 1 Recording.mp4"</span></li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">2. The "Do It, Document It" Rule</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Your process is simple. First, you do the thing you need to do to help your client. Then, you immediately document it as a template or asset inside your Blueprint Binder.
                    </p>
                    
                    <div className="bg-purple-900/20 rounded-lg p-4">
                      <p className="text-white font-semibold mb-2">Example Workflow:</p>
                      <ol className="space-y-2 text-sm list-decimal ml-5">
                        <li className="text-slate-300">You need to send your client a list of tasks for the week. You write the email and send it.</li>
                        <li className="text-slate-300">IMMEDIATELY after, you go to your Blueprint Binder. You create a new document called "Weekly Task Email Template.doc". You copy and paste the email you just sent, but you remove the client's specific details and replace them with placeholders like "[CLIENT NAME]" and "[TASK 1]".</li>
                      </ol>
                      <p className="text-purple-400 font-semibold mt-3">You just created your first product asset. This process takes an extra 3 minutes but saves you from ever having to start from scratch again.</p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-500/30">
                    <h4 className="text-xl font-bold text-orange-400 mb-4">3. The Rule of Three: Your Productization Trigger</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      How do you know what parts of your service should become a permanent part of your product? You follow the Rule of Three.
                    </p>
                    
                    <div className="bg-orange-900/20 rounded-lg p-4">
                      <p className="text-orange-400 font-semibold text-lg">
                        If you explain the same concept, answer the same question, or walk through the same process three times, it MUST become a scalable asset.
                      </p>
                      <p className="text-slate-300 mt-2">
                        You do not explain it a fourth time. You create a canonical, reusable piece of content (a detailed PDF guide, a high quality video walkthrough, a Notion template) and you send that instead.
                      </p>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mt-4">
                      This is how your service naturally evolves into a product. You are not guessing what your customers need. You are building exactly what they ask for, systematizing the answers, and turning your knowledge into a sellable asset.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Outcome */}
              <div className="bg-emerald-900/20 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
                <p className="text-slate-300 leading-relaxed mb-4">
                  By the time you have successfully guided your first client from their Point A to Point B, you will have two incredible things:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">⭐</div>
                    <div className="text-emerald-400 font-semibold mb-2">1. A Case Study & Testimonial</div>
                    <p className="text-slate-300 text-sm">The most powerful marketing asset in the world. Real proof that your system works.</p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">📦</div>
                    <div className="text-purple-400 font-semibold mb-2">2. A Folder of Product "Bricks"</div>
                    <p className="text-slate-300 text-sm">Your Blueprint Binder will contain the curriculum, the worksheets, the templates, and the videos that will become Version 1 of your scalable digital product.</p>
                  </div>
                </div>
                
                <p className="text-white font-bold text-lg mt-6">
                  You have not just coached someone. You have built the assembly instructions for your money making machine.
                </p>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Build Your Delivery Blueprint</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    It is time to put on both hats. Your mission is to serve your client and build your system.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Create Your Blueprint Binder.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Create a dedicated folder in Google Drive or a workspace in Notion. Name it "[Product Name] - V1 Blueprint".</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Onboard Your Client.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Schedule your first call. Send them their first email. Start the process of delivering the result you promised.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Create and Share Your First Asset.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Following the "Do It, Document It" rule, create your very first reusable asset. This can be the Welcome Email Template, a "First Steps" checklist, or a "Quick Start" video. Keep it simple.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Post Your Proof in the WhatsApp Community</h5>
                  
                  <p className="text-slate-300 mb-4">
                    To mark this assignment as complete, you are going to share proof of your work. This is for accountability and to show others what is possible. Post one of the following:
                  </p>
                  
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>A screenshot of your Blueprint Binder folder showing at least one asset file inside.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>A public link (e.g., Google Doc, Loom video) to the first reusable asset you created.</span>
                    </div>
                  </div>

                  <p className="text-slate-300 mt-4 text-sm">
                    Use the hashtag #Blueprint to show you are on task. This is how we track progress and keep the momentum going.
                  </p>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    Action creates clarity.
                  </p>
                  <p className="text-slate-300 mb-3">
                    Do not worry about getting it perfect. The goal is to start the process. Your product will not be built in a flash of genius. It will be built brick by brick, by serving a real person with a real problem.
                  </p>
                  <p className="text-emerald-400 font-bold">
                    In the next module, we will take all these bricks you are creating and assemble them into your Minimum Viable Product.
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
              {isCompleted ? "Module completed! Your product blueprint is underway." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have onboarded your first client and created your first product asset, mark this module complete.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-3">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-5">
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