'use client'
import Link from "next/link"
import { CheckCircle, Lock, Bot, Cpu, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module1() {
  const moduleId = 1
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [showWaitModal, setShowWaitModal] = useState(false)
  const [waitTime, setWaitTime] = useState({ hours: 0, minutes: 0, totalMinutes: 0 })
  const [canCompleteAt, setCanCompleteAt] = useState(new Date())

  useEffect(() => {
    async function checkProgress() {
      // Updated product key
      const product = 'AiDigitalCourse'
      const progress = await fetchUserProgress(product)
      
      if (progress) {
        // Module 1 has access if currentModule is >= 1
        setHasAccess(progress.currentModule >= moduleId)
        // Module 1 is completed if currentModule is > 1
        setIsCompleted(progress.currentModule > moduleId)
      } else {
        // Module 1 is always accessible (first module)
        setHasAccess(true)
        setIsCompleted(false)
      }
      setIsLoading(false)
    }
    checkProgress()
  }, [])

  const handleCompleteModule = async () => {
    setIsUpdating(true)
    // Updated product key
    const product = 'AiDigitalCourse'
    
    // Update progress to module 2 (completing module 1)
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
            <Link href="/order/product/AiDigitalCourse" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
              ← Back to Course
            </Link>
            
            <div className="bg-slate-800 rounded-lg p-8 text-center">
              <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Module 1 - Locked</h1>
              <p className="text-slate-300 mb-6">
                You need to complete the previous modules first to access this content.
              </p>
              <Link href="/order/product/AiDigitalCourse">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
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
          <Link href="/order/product/AiDigitalCourse" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
            ← Back to Course
          </Link>

          {/* Module Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 mb-8 shadow-lg shadow-indigo-900/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-indigo-100 text-sm">Module 1</div>
                <h1 className="text-3xl font-bold text-white">THE AI REVOLUTION</h1>
              </div>
            </div>
            <p className="text-indigo-100 text-lg">Understanding the new wealth economy and your role in it.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to the New Era</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  History is defined by moments where the playing field resets. The Industrial Revolution. The Internet. The Smartphone. And now, <strong>Artificial Intelligence.</strong>
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  If you are reading this, you are in the top 1% of early adopters. While the rest of the world is worried about AI taking their jobs, you are here to learn how to make it build your business.
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  My name is Tom. I spent years trading my time for money, working long hours to build complex systems manually. When AI tools like ChatGPT and Midjourney emerged, I didn't see a shortcut; I saw a multiplier. I realized a single person could now output the work of a 10-person agency.
                </p>
              </div>

              {/* The Shift */}
              <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg p-6 mb-8 border-l-4 border-indigo-400">
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>The Paradigm Shift:</strong>
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  In the old economy, you were paid for <strong>labor</strong>. <br />
                  <em>"I will write this article for $100."</em> <br />
                  <em>"I will design this logo for $200."</em>
                </p>
                
                <p className="text-slate-300 leading-relaxed">
                  In the AI economy, you are paid for <strong>orchestration</strong>.
                  You are no longer the violin player; you are the conductor. Your job is to direct the AI to create assets that work for you while you sleep.
                </p>
              </div>

              {/* The Realization */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-6 mb-8 border border-indigo-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="text-indigo-400 w-6 h-6"/>
                  <h3 className="text-xl font-bold text-white">Why Digital Products Make Sense</h3>
                </div>

                <p className="text-slate-300 leading-relaxed mb-4">
                  This course focuses specifically on <strong className="text-indigo-400">Digital Products</strong> (Courses, E-books, Templates, Art Packs). Why?
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                        <div className="text-indigo-400 font-bold mb-2">Build Once, Sell Infinite</div>
                        <p className="text-slate-300 text-sm">Unlike a physical shirt or a consulting hour, a digital file costs $0 to duplicate. You make it once, and sell it 10,000 times.</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                        <div className="text-indigo-400 font-bold mb-2">Zero Inventory</div>
                        <p className="text-slate-300 text-sm">No warehouses. No shipping costs. No broken items. Just pure profit margin.</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                        <div className="text-indigo-400 font-bold mb-2">AI Speed</div>
                        <p className="text-slate-300 text-sm">What used to take a month to write or design can now be generated, refined, and packaged in a single afternoon.</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                        <div className="text-indigo-400 font-bold mb-2">Global Market</div>
                        <p className="text-slate-300 text-sm">Your store is open 24/7 to the entire planet. You make money while you sleep.</p>
                    </div>
                </div>
              </div>

              {/* What This System Covers */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🗺️</span>
                  <h3 className="text-2xl font-bold text-white">The 10-Day Roadmap</h3>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="text-center font-semibold bg-slate-600/50 p-3 text-indigo-400">Phase</div>
                    <div className="text-center font-semibold bg-slate-600/50 p-3 text-indigo-400">Methods</div>
                    <div className="text-center font-semibold bg-slate-600/50 p-3 text-indigo-400">Outcome</div>
                    
                    <div className="p-4 border-r border-slate-600">
                      <div className="font-semibold text-white">Strategy</div>
                    </div>
                    <div className="p-4 border-r border-slate-600">
                      <div className="text-slate-300">Market Research & Tool Selection</div>
                    </div>
                    <div className="p-4">
                      <div className="text-slate-300">Finding a "Blue Ocean" niche where people are begging for solutions.</div>
                    </div>
                    
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="font-semibold text-white">Creation</div>
                    </div>
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="text-slate-300">Generative AI (Text & Image)</div>
                    </div>
                    <div className="p-4 border-t border-slate-600">
                      <div className="text-slate-300">A high-quality, market-ready digital product created in 48 hours.</div>
                    </div>
                    
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="font-semibold text-white">Automation</div>
                    </div>
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="text-slate-300">Funnels & Social Agents</div>
                    </div>
                    <div className="p-4 border-t border-slate-600">
                      <div className="text-slate-300">A system that drives traffic and processes sales automatically.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Trap */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-2xl font-bold text-white">The "Shiny Object" Trap</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  There are 5,000+ new AI tools released every month. The biggest mistake beginners make is trying to learn them all.
                </p>
                
                <div className="bg-red-900/20 rounded-lg p-4 mb-6 border border-red-500/30">
                  <p className="text-red-400 font-semibold text-lg mb-2">
                   You do not need more tools. You need a system.
                  </p>
                  <p className="text-slate-300">
                   We will be focusing on the "Big 3": ChatGPT (Logic), Midjourney (Visuals), and basic Automation (Connection). Everything else is noise.
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-2">
                  <strong className="text-indigo-400">Your Action Plan:</strong>
                </p>
                <p className="text-slate-300 leading-relaxed">
                   In this course, we stop consuming content about AI and start building with it. Every module requires you to create something. No theory without practice.
                </p>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-8 border-2 border-indigo-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🛠️</div>
                  <h3 className="text-3xl font-bold text-indigo-400 mb-2">Assignment: Build Your HQ</h3>
                </div>
                
                <div className="bg-indigo-900/20 rounded-lg p-4 mb-6 border border-indigo-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    Before we build the business, we must set up the workshop. Today's task is simple but foundational.
                  </p>
                </div>
                
                <div className="bg-indigo-800/20 rounded-lg p-6 mb-8 border border-indigo-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-indigo-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <div className="text-indigo-300 font-semibold">Account Setup: AI Text</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Ensure you have an account with ChatGPT (Plus is recommended for GPT-4) or Claude.ai.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-indigo-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <div className="text-indigo-300 font-semibold">Account Setup: AI Visuals</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Create a Discord account and join the Midjourney server, or sign up for Leonardo.ai (free alternative).</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-indigo-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                        <div className="text-indigo-300 font-semibold">Define Your Freedom Goal</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Write down exactly how much monthly passive income you need to quit your job or fund your lifestyle.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600/50">
                  <h5 className="text-lg font-bold text-white mb-4">Why the Goal Matters</h5>
                  <p className="text-slate-300 text-sm italic mb-4">"If you don't know where you are going, any road will get you there."</p>
                  <p className="text-slate-300 text-sm">
                    Most people say "I want to be rich." That is vague. <br/>
                    A real goal is: <em>"I need $5,000/month to cover my rent, food, and travel."</em> <br/>
                    Once you have a number, it's just math. If you sell a $50 AI product, you need 100 sales. That is achievable.
                  </p>
                </div>
                
                <div className="bg-indigo-900/20 rounded-lg p-6 border border-indigo-500/30 mt-6">
                  <h5 className="text-lg font-bold text-indigo-400 mb-4">Commit to the Process</h5>
                  
                  <div className="bg-slate-800/60 rounded-lg p-4 mb-4">
                    <div className="text-indigo-400 font-mono mb-2">To: roamlyofficial@gmail.com</div>
                    <div className="text-indigo-400 font-mono">Subject: AI HQ Ready - [Your Full Name]</div>
                  </div>
                  
                  <div className="text-slate-300 mb-4">
                    <strong>Send an email confirming you are set up:</strong>
                  </div>
                  
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-indigo-400">•</span>
                      <span>Confirm you have your AI accounts ready.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-indigo-400">•</span>
                      <span>State your Monthly Freedom Number (e.g., $4,000/mo).</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-indigo-400">•</span>
                      <span>Include your WhatsApp number for the community group.</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-indigo-300 font-bold text-xl">
                    Set up your tools. Send the email.
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
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: isCompleted ? "100%" : "0%" }}
                ></div>
              </div>
              <span className="text-indigo-400 font-semibold">{isCompleted ? "100%" : "0%"}</span>
            </div>
            <p className="text-slate-400 mt-2">
              {isCompleted ? "Module completed! You can now access the next module." : "Complete the assignment to unlock Module 2."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-lg p-6 mb-8 border border-indigo-500/30 text-center">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have your AI accounts ready and your goal set, click below to unlock Niche Discovery.
              </p>
              <Button 
                onClick={handleCompleteModule}
                disabled={isUpdating}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-lg"
              >
                {isUpdating ? "Completing..." : `Complete Module ${moduleId} →`}
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            
            <Button variant="outline" disabled>
              Previous Module
            </Button>
            
            
            <Link href="/order/product/AiDigitalCourse">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
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