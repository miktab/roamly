'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module7() {
  const moduleId = 7
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
    
    // Update progress to module 8 (completing module 7)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 7 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 7</div>
                <h1 className="text-3xl font-bold text-white">THE ACCELERATOR PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Traffic Engine: Your First 100 Visitors</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Simple, free strategies to get the right people to your page.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold text-white mb-2">Flipping the "Open" Sign</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  You have built your store. The product is on the shelves and your salesperson, the sales page, is ready to greet customers. Now we face the oldest problem in commerce: getting people in the door.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Most people get this wrong. They post their link once on social media, hear crickets, and assume their product is a failure. They fall for the myth, "If you build it, they will come." This is a lie.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    Traffic is not an accident. It is the result of deliberate action. This module gives you the simple, actionable strategy to bring your first qualified visitors to your page.
                  </p>
                </div>
              </div>

              {/* The Two Traffic Lanes */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🚦</span>
                  <h3 className="text-2xl font-bold text-white">Hunting vs. Farming</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  There are only two ways to get traffic online. Understanding the difference is critical to your success right now.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-orange-400 mb-2">🚜 Farming (Passive Traffic)</div>
                    <p className="text-slate-300 text-sm">This is planting seeds that grow over time. Things like SEO, blogging, and building a big YouTube channel. It is powerful for the long term, but it is slow. It can take months or years to see a return.</p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-emerald-400 mb-2">🏹 Hunting (Active Traffic)</div>
                    <p className="text-slate-300 text-sm">This is going out and finding your customers where they already are. It is manual, direct, and it produces results today. This involves direct outreach and engaging in existing communities.</p>
                  </div>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                  <p className="font-semibold text-lg text-red-400 mb-2">
                    At this stage, farming is a trap.
                  </p>
                  <p className="text-slate-300">
                    Trying to rank on Google or build a social media following before you have consistent sales is a path to burnout. You will waste months creating content with no idea if your offer even works. Your entire focus for now must be on hunting. It provides instant feedback and your first sales.
                  </p>
                </div>
              </div>

              {/* Hunting Strategies */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🗺️</span>
                  <h3 className="text-2xl font-bold text-white">Your Hunting Ground: The Watering Holes</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  You do not need to create an audience from scratch. Your audience already exists, gathered together in digital "watering holes." You found these in Module 2. Reddit, Facebook groups, Slack channels, specific Twitter circles. Your job is not to build a new river, but to go to the river where everyone is already drinking.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">Tactic 1: The Value Bomb</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Find a thread where someone is asking for help with the exact problem you solve. Do not just drop your link. Write a genuinely helpful, detailed comment that partially solves their problem. Give away your knowledge freely.
                    </p>
                    <div className="bg-blue-900/20 rounded-lg p-4">
                      <div className="text-blue-300 mb-2">At the very end, add a soft call to action.</div>
                      <div className="text-slate-300 text-sm italic">"I am super passionate about this stuff. I actually put together a full system that walks through this entire process. No pressure to check it out, but it’s there if you're interested: [Your Link]"</div>
                      <p className="text-white mt-3 text-sm font-semibold">This positions you as an expert, not a spammer.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">Tactic 2: The Direct and Honest DM</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Identify an individual who is a perfect fit for your product. Maybe they posted a question or shared a frustration. Send them a direct message that is respectful and transparent.
                    </p>
                    <div className="bg-purple-900/20 rounded-lg p-4 text-sm italic">
                      "Hey, [Name]. I saw your post in the Freelance Writers group about feeling stuck with low paying clients. I remember that feeling well. I actually just helped a client triple their rates and packaged the method I used into a small course. Might not be for you, but thought I'd share the link in case it’s helpful. [Your Link]"
                    </div>
                     <p className="text-white mt-3 text-sm font-semibold">The key is low pressure and genuine empathy. You are offering a potential solution, not demanding a sale.</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg p-6 border border-emerald-500/30">
                    <h4 className="text-xl font-bold text-emerald-400 mb-4">Tactic 3: Share Your Case Study</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Your personal network (LinkedIn, Twitter, even Facebook) is a warm audience. Do not just post "Buy my new course!" Instead, tell a story.
                    </p>
                    <div className="bg-emerald-900/20 rounded-lg p-4 text-sm italic">
                      "It's been an interesting month. I started working with a new freelance writer who was stuck making $20 an hour on Upwork. We implemented a few simple positioning changes and a new outreach script. Last week, they signed a $5,000 project. It was so cool seeing their confidence transform. I documented the whole process so other writers can do the same. So proud of what we built."
                    </div>
                     <p className="text-white mt-3 text-sm font-semibold">A story about another person's success is a powerful way to sell without selling. You can link to your sales page in the comments or your bio.</p>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Drive Your First 25 Visitors</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    Theory is useless without action. Your mission is to use the hunting tactics to drive your first 25 real, qualified visitors to your sales page.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Identify three "Watering Holes."</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">List three specific online locations where your ideal customers hang out. (e.g., r/digitalnomad, "Web Designers" Facebook Group, #solopreneur on Twitter).</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Perform 10 "Hunting" Actions.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Over the next week, execute at least 10 actions. This could be 5 value bomb comments, 3 DMs, and 2 social media posts telling your story. Keep a simple log of your actions.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Track Your Visitors.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Use the analytics on your sales page platform (like Carrd or Lemon Squeezy) or a free link shortener like Bitly to track how many clicks you get. The goal is to see traffic that results from your direct efforts.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Grade: Am I Done?</h5>
                  <p className="text-slate-300 mb-4">
                    This module is complete when you can answer "yes" to the following question.
                  </p>
                  
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have I performed at least 10 hunting actions and driven a minimum of 25 targeted visitors to my sales page?</span>
                    </div>
                  </div>
                  <p className="text-slate-300 mt-3 text-sm">Do not move on until this is done. Getting this feedback loop running is the whole point. You will see what messages resonate and what channels work. You might even make your first automated sale.</p>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    Action is the antidote to fear.
                  </p>
                  <p className="text-slate-300">
                    Putting yourself out there is scary. But it's the only way forward. Every comment you post, every DM you send, is an act of building your future. Once you make your first sale without speaking to anyone, the world changes.
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
              {isCompleted ? "Module completed! Your traffic engine is running." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have driven your first 25 qualified visitors to your sales page, you have completed the objective.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-6">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-8">
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