'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
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
      const product = 'RemoteReadyBootcamp'
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
    const product = 'RemoteReadyBootcamp'
    
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
            <Link href="/order/product/RemoteReadyBootcamp" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
              ← Back to Course
            </Link>
            
            <div className="bg-slate-800 rounded-lg p-8 text-center">
              <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Module 1 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 1</div>
                <h1 className="text-3xl font-bold text-white">START HERE FOUNDATION PHASE</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Master the remote work mindset and set your success foundation</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Remote Ready Bootcamp</h2>
              <p className="text-emerald-300 text-lg">Your journey to location independence starts here</p>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {/* Introduction Section */}
              <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg p-6 mb-8 border-l-4 border-emerald-400">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">👋</span>
                  <h3 className="text-xl font-bold text-white m-0">Welcome to Roamly Remote Ready</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  You're here because you're curious about building a lifestyle of freedom—earning money online while having the flexibility to travel the world. 🗺️
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  That has been my life for the past 4 years. I've run businesses from different corners of the globe, and I can tell you something important right from the start: You don't need a huge budget, extraordinary skills, or even a perfect plan to begin. ✈️
                </p>
                
                <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💡</span>
                    <h4 className="text-emerald-400 font-semibold">What You Actually Need:</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed m-0">
                    Commitment, clarity, and the ability to keep yourself on track when no one else is watching.
                  </p>
                </div>
              </div>

              {/* Program Overview */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 mb-8 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-xl font-bold text-white m-0">What You'll Master in This Program</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  This bootcamp is designed to help you understand not only how to start your own digital business but also how to operate it effectively while living a flexible, location-independent life.
                </p>
                
                <div className="grid gap-4">
                  <div className="flex items-start gap-4 bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl">🚀</div>
                    <div>
                      <h4 className="text-emerald-400 font-semibold mb-2">What Digital Business to Start</h4>
                      <p className="text-slate-300 text-sm">How to find your niche, test business ideas, experiment, and eventually scale.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h4 className="text-emerald-400 font-semibold mb-2">Business Setup</h4>
                      <p className="text-slate-300 text-sm">Advertising, marketing, customer engagement, and turning strangers into paying clients.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl">🌎</div>
                    <div>
                      <h4 className="text-emerald-400 font-semibold mb-2">Running Your Business While Traveling</h4>
                      <p className="text-slate-300 text-sm">Choosing where to live, managing time zones, keeping costs low, and even optimizing taxes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transition */}
              <div className="text-center py-6 mb-8">
                <div className="text-4xl mb-4">🤔</div>
                <p className="text-slate-300 leading-relaxed text-lg">
                  But before we get into business strategies, there's something more fundamental at play.
                </p>
                <p className="text-emerald-400 leading-relaxed text-xl font-semibold mt-4">
                  The first thing we'll cover is not "what" to do, but how you'll show up.
                </p>
              </div>
              
              {/* Why Mindset Comes First */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 mb-8 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🧠</span>
                  <h3 className="text-2xl font-bold text-white m-0">Why Mindset Comes First</h3>
                </div>
                
                <div className="bg-red-900/20 rounded-lg p-4 mb-6 border border-red-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">⚠️</span>
                    <h4 className="text-red-400 font-semibold">The Hard Truth</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Most people who fail at remote work or digital entrepreneurship don't fail because the business model was bad. They fail because they couldn't stay consistent long enough to see results.
                  </p>
                </div>
                
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span>💯</span> Here's the reality:
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-slate-700/30 rounded-lg p-4">
                    <span className="text-xl">👤</span>
                    <p className="text-slate-300">Working remotely means no boss standing over you.</p>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-slate-700/30 rounded-lg p-4">
                    <span className="text-xl">🏖️</span>
                    <p className="text-slate-300">Traveling means distractions are everywhere—beautiful places, social invitations, the constant temptation to "relax because you deserve it."</p>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-slate-700/30 rounded-lg p-4">
                    <span className="text-xl">💪</span>
                    <p className="text-slate-300">Building an online business takes discipline, patience, and emotional resilience.</p>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                  <p className="text-emerald-400 font-semibold text-lg">
                    This first module is designed to help you build that mindset of discipline. 🎯
                  </p>
                </div>
              </div>
              
              {/* The Importance of Discipline */}
              <div className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 rounded-lg p-6 mb-8 border border-orange-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎖️</span>
                  <h3 className="text-2xl font-bold text-white m-0">The Importance of Discipline</h3>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6 border-l-4 border-orange-400">
                  <p className="text-orange-300 font-semibold text-lg">
                    "Discipline is the ability to do the things you said you would do, even when you don't feel like doing them."
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Let's think about this: For centuries, people have valued the idea of "your word is your bond." If you say you're going to do something, you follow through. That standard is more important now than ever—because as a remote entrepreneur, you're accountable only to yourself. 🤝
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">🏝️</div>
                    <p className="text-slate-300 text-sm">
                      Some days you'll be in Bali, Lisbon, or Mexico City, surrounded by opportunities to explore.
                    </p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-slate-300 text-sm">
                      But you'll need to remind yourself: You are not on permanent vacation. You are building something bigger—freedom.
                    </p>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg border border-emerald-500/30">
                  <div className="text-3xl mb-2">✈️ ⚖️ 💪</div>
                  <p className="text-emerald-400 font-bold text-xl">
                    Travel is the reward. But discipline is the price.
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mt-6">
                  The entrepreneurs who make remote life sustainable aren't the ones scrolling through Instagram pretending to work poolside. 📱❌ They are the ones who quietly, consistently keep promises to themselves every single day. ✅
                </p>
              </div>
              
              {/* Practical Mindset Shifts */}
              <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-lg p-6 mb-8 border border-teal-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔄</span>
                  <h3 className="text-2xl font-bold text-white m-0">Practical Mindset Shifts to Start Today</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-slate-700/30 rounded-lg p-6 border-l-4 border-teal-400">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🎯</span>
                      <h4 className="text-lg font-semibold text-teal-400 m-0">Think Long-Term Freedom, Not Short-Term Pleasure</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Every task done today compounds tomorrow. Each blog post written, sales call made, or design finished adds up to your freedom years from now. 📈
                    </p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-6 border-l-4 border-teal-400">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">👔</span>
                      <h4 className="text-lg font-semibold text-teal-400 m-0">Treat Yourself Like Your Own Boss</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Imagine there's someone above you reviewing your performance. Would they be satisfied with how you used your day? 📊
                    </p>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-6 border-l-4 border-teal-400">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🔗</span>
                      <h4 className="text-lg font-semibold text-teal-400 m-0">Build Micro-Habits, Not Big Resolutions</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      You don't need to commit to 10 hours of work per day. Start by proving to yourself you can be consistent—even if it's just for 1 focused hour daily. ⏰
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment</h3>
                  <div className="flex items-center justify-center gap-2 text-yellow-300">
                    <span className="text-xl">⏰</span>
                    <span className="text-lg font-semibold">30 Minutes</span>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🎯</span>
                    <h4 className="text-yellow-400 font-semibold">Today's Mission:</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Setting your foundation for the Remote Ready journey.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-800/20 to-orange-800/20 rounded-lg p-4 mb-8 border border-yellow-400/40">
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-yellow-400">🎪 Objective:</strong> Define your personal vision of remote work and set up a clear system of accountability.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-slate-800/60 rounded-lg p-6 border border-yellow-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">1</div>
                      <h5 className="text-xl font-bold text-yellow-300">Write Your "Why"</h5>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span className="text-sm">⏱️</span>
                        <span className="text-sm">10 min</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-3">
                        <span className="text-yellow-400 text-lg">❓</span>
                        <span className="text-slate-300">Why do you want to become remote ready?</span>
                      </div>
                      <div className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-3">
                        <span className="text-yellow-400 text-lg">🏠</span>
                        <span className="text-slate-300">What does your ideal remote lifestyle look like (day-to-day)?</span>
                      </div>
                      <div className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-3">
                        <span className="text-yellow-400 text-lg">💎</span>
                        <span className="text-slate-300">What 1–2 words capture your deepest motivation (freedom, growth, creativity, security, etc.)?</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/60 rounded-lg p-6 border border-yellow-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">2</div>
                      <h5 className="text-xl font-bold text-yellow-300">Create a Daily Non-Negotiable Habit</h5>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span className="text-sm">⏱️</span>
                        <span className="text-sm">10 min</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-3">
                        <span className="text-yellow-400 text-lg">🔄</span>
                        <span className="text-slate-300">Choose one simple, repeatable action that you'll commit to doing every day during this bootcamp</span>
                      </div>
                      <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-orange-400 text-sm">💡</span>
                          <span className="text-orange-400 text-sm font-semibold">Examples:</span>
                        </div>
                        <div className="text-slate-300 text-sm space-y-1">
                          <div>• 1 hour of focused learning</div>
                          <div>• 30 minutes of building/creating</div>
                          <div>• Daily progress journaling</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-3">
                        <span className="text-yellow-400 text-lg">✍️</span>
                        <span className="text-slate-300">Write it down as a promise to yourself.</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/60 rounded-lg p-6 border border-yellow-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">3</div>
                      <h5 className="text-xl font-bold text-yellow-300">Accountability Contract</h5>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span className="text-sm">⏱️</span>
                        <span className="text-sm">10 min</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-emerald-400">📜</span>
                          <span className="text-emerald-400 font-semibold">Your Contract:</span>
                        </div>
                        <p className="text-slate-300 italic">
                          "For the next 30 days, I will show up daily for myself and my future freedom by completing my habit."
                        </p>
                      </div>
                      <div className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-3">
                        <span className="text-yellow-400 text-lg">✍️</span>
                        <span className="text-slate-300">Sign it. Date it.</span>
                      </div>
                      <div className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-3">
                        <span className="text-yellow-400 text-lg">🤝</span>
                        <span className="text-slate-300">(Optional but powerful: Share it with another person in this program or a trusted friend to hold yourself accountable.)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Closing Section */}
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg p-8 mb-8 border border-emerald-500/30">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Congratulations!</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🏁</span>
                      <h4 className="text-emerald-400 font-semibold text-lg">You've Taken Your First Real Step</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      You've taken your first real step in becoming Remote Ready.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-800/20 to-teal-800/20 rounded-lg p-6 border border-emerald-400/40">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">💪</span>
                      <h4 className="text-emerald-400 font-semibold text-lg">You're Already Ahead</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Right now, you've done more than most people who dream of working and traveling, because you've begun by shaping the foundation: your mindset. 🧠✨
                    </p>
                  </div>
                  
                  <div className="text-center pt-4">
                    <div className="text-2xl mb-2">🚀</div>
                    <p className="text-emerald-300 font-semibold">
                      Ready to continue your Remote Ready journey?
                    </p>
                  </div>
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
            
            <Button variant="outline" disabled>
              Previous Module
            </Button>
            
            
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