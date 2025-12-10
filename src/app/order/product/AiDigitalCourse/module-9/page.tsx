'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module9() {
  const moduleId = 9
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
    
    // Update progress to module 10 (completing module 9)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 9 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 9</div>
                <h1 className="text-3xl font-bold text-white">THE ACCELERATOR PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Content Engine: From Hunting to Farming</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Build a system that brings customers to you, so you can stop chasing them.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🌱</div>
                <h2 className="text-3xl font-bold text-white mb-2">The Green Light</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Through the iterative process of the last two modules, you have achieved something rare. You found a combination of Message and Audience that works. Maybe you made your first few sales. Maybe you just saw a spike in clicks from a specific subreddit. You have found a signal in the noise.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  This signal is the green light. It confirms you are on the right path. Now, we shift strategies. Manual "hunting" got you here, but it is a cap on your growth and your freedom. You cannot send DMs from a beach in Thailand indefinitely. 
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    The goal now is to build durable assets that generate traffic automatically. It is time to stop hunting for your food every day and start farming. We are going to build your Content Engine.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    A content engine is a system that turns your expertise into a magnet for your ideal customers, working for you 24/7.
                  </p>
                </div>
              </div>

              {/* The "Pick One" Principle */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">☝️</span>
                  <h3 className="text-2xl font-bold text-white">The "Pick One" Principle</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  The fastest way to fail at content is to try to be everywhere. You will try to master YouTube, TikTok, LinkedIn, Twitter, and a blog all at once. You will produce mediocre content for all of them and burn out in a month.
                </p>
                
                <div className="bg-red-900/20 rounded-lg p-4 mb-6 border border-red-500/30">
                  <p className="font-semibold text-lg text-red-400 mb-2">
                    You must choose one primary platform.
                  </p>
                  <p className="text-slate-300">
                    This is your "home stadium." This is where you will create your best, most thoughtful work. The choice should be based on two questions: Where does your audience spend their time? And what format best suits your natural skills?
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">Are you a Writer?</div>
                    <p className="text-slate-300 text-sm">Your platform is Twitter/X or LinkedIn. You will create written content that is easy to consume and share.</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">Are you a Speaker?</div>
                    <p className="text-slate-300 text-sm">Your platform is YouTube or a podcast. You will create video or audio content that builds a deep connection.</p>
                  </div>
                   <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">Are you a Teacher?</div>
                    <p className="text-slate-300 text-sm">Your platform is a blog. You will create detailed, search optimized articles that serve as long term assets.</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">Are you a Visualist?</div>
                    <p className="text-slate-300 text-sm">Your platform is Instagram or Pinterest. You will create compelling images, infographics, and carousels.</p>
                  </div>
                </div>
              </div>

               {/* The Pillar and Splinter Strategy */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🏛️</span>
                  <h3 className="text-2xl font-bold text-white">The Pillar and Splinter Strategy</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Once you pick your platform, you will use a simple, powerful system to create content efficiently. You do not need to come up with new ideas every day. You will create one big idea and repurpose it intelligently.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">The Pillar: Your Core Idea</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Once a week, you will create one significant piece of content on your chosen primary platform. This is your Pillar. It is your most thoughtful work.
                    </p>
                    <div className="bg-blue-900/20 rounded-lg p-4 text-sm">
                      <ul className="list-disc ml-5 space-y-2 text-slate-300">
                        <li>A 1,500 word blog post that solves a major problem.</li>
                        <li>A 10 minute YouTube video that walks through a complex process.</li>
                        <li>A 30 tweet thread on Twitter that tells a compelling story.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">The Splinters: Your Distribution Network</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      You will then break your Pillar down into smaller pieces of content, or "Splinters," for other platforms. These drive awareness and direct people back to your Pillar or your product.
                    </p>
                    <div className="bg-purple-900/20 rounded-lg p-4">
                      <div className="text-purple-300 mb-2 font-semibold">Example: Your Pillar is a 10 minute YouTube video.</div>
                      <div className="text-slate-300 text-sm">
                        <ul className="list-disc ml-5 space-y-2">
                          <li><strong className="text-white">Splinter 1:</strong> Trim three 60 second clips from the video for YouTube Shorts and TikTok.</li>
                          <li><strong className="text-white">Splinter 2:</strong> Turn the main points into a 5 slide carousel for LinkedIn.</li>
                          <li><strong className="text-white">Splinter 3:</strong> Pull out five interesting quotes and schedule them as tweets.</li>
                          <li><strong className="text-white">Splinter 4:</strong> Post the full video link in relevant Facebook groups with a compelling description.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-center text-emerald-400 font-semibold">From one hour of work, you create a week's worth of content across multiple platforms.</p>
                </div>
              </div>


              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Build Your First Content Package</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    Your mission is to build one complete Pillar and Splinter package. You do not have to publish it yet. The goal is to build the asset.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Choose Your Primary Platform.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Commit to one. Write it down.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Brainstorm and Choose One Pillar Topic.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">What is the most valuable question you can answer for your audience in one piece of content? Write down the title.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Create Your Pillar Content.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Write the full article, script and record the video, or compose the full thread. Get it to 90% done.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">4</div>
                        <div className="text-yellow-300 font-semibold">Create Three Splinters.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Derive three smaller pieces of content from your pillar. Save them in a folder, ready to be deployed.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Grade Checklist</h5>
                  <p className="text-slate-300 mb-4">
                    Before you continue, ensure you have a "ready to publish" folder containing:
                  </p>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>One completed Pillar content piece (e.g. video file, text document).</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>At least three completed Splinter content pieces derived from the pillar.</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    You have just built a system for growth.
                  </p>
                  <p className="text-slate-300">
                    This repeatable process is the foundation of scalable income. By consistently executing this strategy, you build a library of assets that attract, nurture, and convert customers while you focus on what is next.
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
              {isCompleted ? "Module completed! Your content engine is built." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have your first full content package created, you have mastered this system.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-8">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-10">
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