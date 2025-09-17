'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module10() {
  const moduleId = 10
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
    
    // Update progress to module 11 (completing module 10)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 10 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 10</div>
                <h1 className="text-3xl font-bold text-white">THE ACCELERATOR PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Owned Asset: Building Your Email List</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">How to build the single most valuable asset in your online business.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🏰</div>
                <h2 className="text-3xl font-bold text-white mb-2">From Rented Land to Owned Land</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  You now have a content engine. You are creating pillars and splinters, attracting people on social media. Your follower count might be growing. This feels good. It feels like progress. But it is a dangerous illusion.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  A follower on Twitter or a subscriber on YouTube is not your customer. You do not own that relationship. You are borrowing it. You are a tenant building a beautiful house on someone else's land.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    The landlord, Mark Zuckerberg or Elon Musk, can change the rules overnight. An algorithm shift can tank your reach. An account suspension, mistaken or not, can wipe out your entire business in an instant. This is not a foundation for freedom. It is a foundation of risk.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    This module is about building your fortress on land you own. That land is your email list.
                  </p>
                </div>
              </div>

              {/* Why Email is King */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">👑</span>
                  <h3 className="text-2xl font-bold text-white">Why Email Is Your Most Important Asset</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  In a world of fleeting trends, email remains the undisputed king of digital marketing for three simple reasons.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-400 mb-2">1. Ownership</div>
                    <p className="text-slate-300 text-sm">No one can take your email list from you. You can export it, move it to another provider, and use it however you wish. It is a portable, durable asset that is immune to platform whims.</p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-purple-400 mb-2">2. Direct Access</div>
                    <p className="text-slate-300 text-sm">When you post on social media, you are hoping the algorithm shows your content to a fraction of your followers. When you send an email, you have a direct, unfiltered line of communication into a person's private inbox.</p>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-emerald-400 mb-2">3. Conversion</div>
                    <p className="text-slate-300 text-sm">People who give you their email address are signaling a higher level of interest than a casual follower. They are warmer leads. As a result, email consistently outperforms every other channel for generating actual sales.</p>
                  </div>
                </div>
                <p className="text-white font-bold text-lg text-center">An email list is not just a marketing channel. It is the core asset of your digital business.</p>
              </div>

               {/* The Simple Email System */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚙️</span>
                  <h3 className="text-2xl font-bold text-white">The Simple Email System</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Our goal is to convert followers from "rented land" into subscribers on "owned land." We do this with a two part system: a bribe and an automated handshake.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">Part 1: The Lead Magnet (The Ethical Bribe)</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      An email address is valuable. You must offer something of value in return. This is your lead magnet. It is a free, high value resource that solves a specific, urgent problem for your audience.
                    </p>
                    <div className="bg-blue-900/20 rounded-lg p-4 text-sm">
                      <p className="text-blue-300 font-semibold mb-3">A great lead magnet is:</p>
                      <ul className="list-disc ml-5 space-y-2 text-slate-300">
                        <li><strong>Specific:</strong> Not "A Guide to Marketing," but "The 5 Cold Email Scripts That Booked Me 3 Meetings This Week."</li>
                        <li><strong>Instantly Actionable:</strong> A checklist, a template, a resource list, a short video tutorial. Something they can use right away.</li>
                        <li><strong>Easy to Consume:</strong> It should deliver a quick win in under 10 minutes.</li>
                      </ul>
                      <p className="text-white font-semibold mt-3">You will offer this lead magnet on your social profiles, at the end of your content, and on your website.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">Part 2: The Welcome Sequence (The Automated Handshake)</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      When someone joins your list, you do not just send them the lead magnet and disappear. You use an automated email sequence to build a relationship while you are sleeping. A simple 3 email sequence is all you need to start.
                    </p>
                    <div className="bg-purple-900/20 rounded-lg p-4">
                      <div className="space-y-4 text-sm text-slate-300">
                        <div>
                          <p><strong className="text-white">Email 1 (Sent Immediately): Deliver the Goods.</strong> The subject line is simple: "Here's your [Lead Magnet Name]." The email delivers the link and warmly welcomes them.</p>
                        </div>
                        <div>
                          <p><strong className="text-white">Email 2 (Sent 1 Day Later): The Story.</strong> This is where you connect. You share your 'origin story' related to the problem they have. Why do you care? What struggle did you overcome? You build empathy.</p>
                        </div>
                        <div>
                          <p><strong className="text-white">Email 3 (Sent 3 Days Later): The Soft Pitch.</strong> You provide one more valuable tip or insight. Then, you seamlessly transition into mentioning your main product. "If you found this helpful, you might be interested in my full [Product Name], which is the complete step by step system for achieving [The Outcome]. You can learn more here."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Build Your Welcome Machine</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    This is a pure building block module. Your mission is to construct the automated system that converts followers to subscribers and begins building a relationship.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Create Your Lead Magnet.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Choose a simple, specific problem you can solve quickly. Create the checklist, template, or short video. Do not spend more than two hours on this. "Done" is better than "perfect."</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Write Your 3 Welcome Emails.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">In a single document, write the full copy for your 3 part automated sequence: Delivery, Story, and Soft Pitch.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Set It Up.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Sign up for a free or trial account with an email service provider like ConvertKit or MailerLite. Create a landing page for your lead magnet and paste your welcome emails into an automated sequence.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Grade Checklist</h5>
                   <p className="text-slate-300 mb-4">You have completed this module when you have a live landing page link. Test it yourself. Enter your email and confirm that you receive the first automated email with your lead magnet inside.</p>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Is your lead magnet created and uploaded?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Are your 3 welcome sequence emails written and loaded into your email tool?</span>
                    </div>
                     <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Do you have a live landing page where someone can sign up?</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    This is your money printing machine.
                  </p>
                  <p className="text-slate-300">
                    Every person who enters this sequence is a potential customer being nurtured on autopilot. This machine works while you travel, sleep, or work on your next idea. It is a cornerstone of a sovereign life.
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
              {isCompleted ? "Module completed! Your email system is live." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once your lead magnet is created and your automated welcome sequence is live, you are ready to scale.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-9">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-11">
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