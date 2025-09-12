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
                <h1 className="text-3xl font-bold text-white">THE FOUNDATION PHASE</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">The One Thing You Need Before You Can Succeed</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to Remote Ready</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  If you're sitting here wondering if you've made the right choice, let me put your mind at ease. You have. If you're ready to stop dreaming about a life of freedom and start building one, buckle up. The work starts now.
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  My name is Tom. I wasn't born an entrepreneur, and I'm not a trust-fund traveler. My story started on the path you're told to want.
                </p>
                
                <div className="bg-slate-700/30 rounded-lg p-4 mb-6 text-center">
                  <img 
                    src="/products/RemoteReadyBootcamp/module-1/stanford.jpg" 
                    alt="A younger Tom at Stanford University" 
                    className="w-full max-w-md mx-auto rounded-lg mb-2"
                  />
                  {/* <p className="text-slate-400 text-sm">[Image: Tom in a modern, collaborative office space, clearly a high-level tech company like Google or Atlassian]</p> */}
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  I walked the well trodden path, with the university degree followed by a career deep in the heart of the tech world. I was building someone else's dream, very effectively, and getting paid well to do it.
                </p>
              </div>

              {/* The Shift */}
              <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg p-6 mb-8 border-l-4 border-emerald-400">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Then, the sudden rise of AI triggered a revelation: the entire concept of a stable, 40-year career was evaporating. The corporate ladder was turning into a treadmill. I realized I was spending the best years of my life optimizing for a future that might not exist.
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>So I quit.</strong>
                </p>
                
                <p className="text-slate-300 leading-relaxed">
                  My first instinct was to do what I knew: build a tech startup. But I quickly learned that the venture-backed world is a gilded cage. It promised ownership but demanded my entire life, offering even less freedom than the job I'd just left. It was the wrong vehicle for the life I wanted.
                </p>
              </div>

              {/* The Realization */}
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg p-6 mb-8 border border-emerald-500/30">
                <p className="text-slate-300 leading-relaxed mb-4">
                  This realization led me to a different path—one that isn't about chasing billion-dollar valuations, but about building something small, profitable, and yours. A business designed from day one to serve your life.
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  And I'm here to tell you that <strong className="text-emerald-400">anyone can build this</strong>. It doesn't require a stroke of genius or a background in tech. It requires a process.
                </p>
                
                <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-orange-400">
                  <p className="text-orange-300 font-semibold text-lg mb-2">
                    But first, a hard truth.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    I hate to say it, but to succeed, you first have to fail. Or rather, you have to be willing to. I've had more failed business ideas than I can count before I found a repeatable system that worked. Later in this bootcamp, I'll share the unfiltered stories of my most spectacular failures so you can learn from my mistakes and have a good laugh at my expense.
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mt-4">
                  <strong className="text-emerald-400">This entire program is that system</strong>—a practical, step-by-step guide to building the machine for your freedom.
                </p>
              </div>

              {/* What This System Covers */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-2xl font-bold text-white">What This System Covers</h3>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="text-center font-semibold bg-slate-600/50 p-3 text-emerald-400">Phase</div>
                    <div className="text-center font-semibold bg-slate-600/50 p-3 text-emerald-400">Focus</div>
                    <div className="text-center font-semibold bg-slate-600/50 p-3 text-emerald-400">Outcome</div>
                    
                    <div className="p-4 border-r border-slate-600">
                      <div className="font-semibold text-white">Foundation</div>
                    </div>
                    <div className="p-4 border-r border-slate-600">
                      <div className="text-slate-300">Reprogramming your relationship with work.</div>
                    </div>
                    <div className="p-4">
                      <div className="text-slate-300">A crystal-clear vision of the identity you want to build.</div>
                    </div>
                    
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="font-semibold text-white">The Engine</div>
                    </div>
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="text-slate-300">Building a simple, profitable online business.</div>
                    </div>
                    <div className="p-4 border-t border-slate-600">
                      <div className="text-slate-300">Your first paying clients and consistent, repeatable income.</div>
                    </div>
                    
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="font-semibold text-white">The Accelerator</div>
                    </div>
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="text-slate-300">Scaling your income beyond your time.</div>
                    </div>
                    <div className="p-4 border-t border-slate-600">
                      <div className="text-slate-300">Systems that generate revenue while you sleep, explore, or learn.</div>
                    </div>
                    
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="font-semibold text-white">The Sovereign</div>
                    </div>
                    <div className="p-4 border-r border-slate-600 border-t border-slate-600">
                      <div className="text-slate-300">Global diversification and optimization.</div>
                    </div>
                    <div className="p-4 border-t border-slate-600">
                      <div className="text-slate-300">The strategic setup of bank accounts, residencies, and companies to lower taxes and increase freedom.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Section */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 mb-8 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🤝</span>
                  <h3 className="text-2xl font-bold text-white">You Are Not Alone: The Community</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  This isn't just a manual. This is an active, living ecosystem. The moment you complete the assignment below, you get access to our private brain trust:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-400">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">The Roamly WhatsApp Group</h4>
                    <p className="text-slate-300">A live community of fellow members building alongside you. Ask questions, share wins, and get immediate feedback.</p>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-purple-400">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">Direct Mentor Access</h4>
                    <p className="text-slate-300">You'll have access to me and other experienced mentors to guide you past the hurdles that stop most people.</p>
                  </div>
                </div>
              </div>

              {/* The Real Reason People Fail */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🧠</span>
                  <h3 className="text-2xl font-bold text-white">The Real Reason People Fail (And How You Won't)</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Let's be honest. The #1 challenge in becoming a successful remote entrepreneur isn't finding a good business idea. It's navigating the war against distraction that happens inside your own head.
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  When you work for yourself, there is no boss. When you travel, the world presents you with a million beautiful reasons to not work. The beach, a new city, an invitation from new friends—these are all easy, instant "yeses." Your work—the hard, focused effort that builds your future—is a difficult "yes."
                </p>
                
                <div className="bg-red-900/20 rounded-lg p-4 mb-6 border border-red-500/30">
                  <p className="text-red-400 font-semibold text-lg mb-2">
                    Relying on willpower to make that hard choice every day is a losing strategy.
                  </p>
                  <p className="text-slate-300">
                    Willpower is a muscle that gets tired. By the end of the day, or even after a long week, it will fail you.
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  So, what doesn't fail? <strong className="text-emerald-400">Identity.</strong>
                </p>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    A clear, powerful, and specific vision of the person you are becoming acts as a compass. A compass doesn't get tired; it just points North. When you know, without a doubt, who you are and where you are going, your decisions become automatic.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                      <div className="text-red-400 font-semibold mb-2">❌ Wrong Question</div>
                      <p className="text-slate-300 text-sm">"Should I work or go to the beach?"</p>
                    </div>
                    
                    <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                      <div className="text-emerald-400 font-semibold mb-2">✅ Right Question</div>
                      <p className="text-slate-300 text-sm">"What would the person I am becoming do?"</p>
                    </div>
                  </div>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    The answer is always obvious.
                  </p>
                </div>
                
                <div className="text-center mt-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-500/30">
                  <p className="text-white font-bold text-xl mb-2">
                    This is why, before we do anything else, we are going to design that identity.
                  </p>
                  <p className="text-slate-300">
                    This is not a "wish list." This is an act of engineering your future self.
                  </p>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Design Your Future Self</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    Your mission is to create the blueprint for your identity. This will become your compass.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Open a blank document. Title it "[Your Name]'s Future Self."</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Create a list of at least 20 specific, measurable traits, assets, and characteristics that this future version of you possesses.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Be ambitious and precise. This list is your personal definition of success.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-lg p-6 mb-6 border border-amber-400/40">
                  <h5 className="text-lg font-bold text-amber-400 mb-4">Examples to get you started:</h5>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Financial:</span>
                      <div className="text-slate-300">Earns $1,000 per day from my business.</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Assets:</span>
                      <div className="text-slate-300">Holds 4 different passports. Has bank accounts in Switzerland and Singapore.</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Lifestyle:</span>
                      <div className="text-slate-300">Works no more than 4 focused hours on any given day.</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Skills:</span>
                      <div className="text-slate-300">Is conversational in Spanish. Knows how to surf.</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Health:</span>
                      <div className="text-slate-300">Has a personal trainer and is in the best physical shape of their life.</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Location:</span>
                      <div className="text-slate-300">Spends summers in Lisbon and winters in Mexico City.</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Experience:</span>
                      <div className="text-slate-300">Takes a full month off every year to learn a new skill (e.g., scuba diving, cooking).</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-3">
                      <span className="text-amber-400 font-semibold">Standards:</span>
                      <div className="text-slate-300">Only works with clients who are respectful and inspiring.</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Email your completed blueprint to me.</h5>
                  
                  <div className="bg-slate-800/60 rounded-lg p-4 mb-4">
                    <div className="text-emerald-400 font-mono mb-2">To: roamlyofficial@gmail.com</div>
                    <div className="text-emerald-400 font-mono">Subject: My Future Self - [Your Full Name]</div>
                  </div>
                  
                  <div className="text-slate-300 mb-4">
                    <strong>In the body of the email, include:</strong>
                  </div>
                  
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Your list of 20+ items.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Your WhatsApp number to be added to the private community group.</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    I personally review every one of these.
                  </p>
                  <p className="text-slate-300 mb-3">
                    It's your entry ticket to the community and the first real step in your transformation. It proves you're serious, and it gives me the context I need to help you get there.
                  </p>
                </div>
                
                <div className="text-center mt-6">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-yellow-300 font-bold text-xl">
                    Do it now.
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