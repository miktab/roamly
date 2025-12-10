'use client'
import Link from "next/link"
import { CheckCircle, Lock, Bot, Zap, Brain, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module1() {
  const moduleId = 1
  // Updated Product ID
  const productId = 'AiContentChallenge' 
  
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [showWaitModal, setShowWaitModal] = useState(false)
  const [waitTime, setWaitTime] = useState({ hours: 0, minutes: 0, totalMinutes: 0 })
  const [canCompleteAt, setCanCompleteAt] = useState(new Date())

  useEffect(() => {
    async function checkProgress() {
      const progress = await fetchUserProgress(productId)
      
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
    
    // Update progress to module 2 (completing module 1)
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: productId,
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading module...</div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
        <div className="px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <Link href={`/order/product/${productId}`} className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
              ← Back to Challenge
            </Link>
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-8 text-center">
              <Lock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Module 1 - Locked</h1>
              <p className="text-slate-400 mb-6">
                You need to complete the previous modules first to access this content.
              </p>
              <Link href={`/order/product/${productId}`}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Back to Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Navigation */}
          <Link href={`/order/product/${productId}`} className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
            ← Back to Challenge
          </Link>

          {/* Module Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 shadow-lg shadow-indigo-900/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-blue-100 text-sm font-medium tracking-wider">MODULE 1</div>
                <h1 className="text-3xl font-bold text-white">THE BLUEPRINT</h1>
              </div>
            </div>
            <p className="text-blue-100 text-lg">Understanding the Faceless Content Model & The 30-Day Goal.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Future of Content</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  The creator economy is shifting. For the last decade, success meant putting your face on camera, dancing to trends, and becoming a "personality." That era is ending.
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  We are entering the age of <strong className="text-indigo-400">Synthetic Media</strong>. A world where the idea is more valuable than the actor. Where you can build a media empire reaching millions of people without ever revealing your face or speaking a word into a microphone.
                </p>

                <p className="text-slate-300 leading-relaxed mb-6">
                  This challenge is not about luck. It's about engineering virality using a specific stack of Artificial Intelligence tools. Over the next 30 days, you won't just "post videos." You will build a digital asset class.
                </p>
              </div>

              {/* The Architecture */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-lg p-8 mb-8 border border-indigo-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">The Faceless Architecture</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Traditional content creation requires a writer, an actor, a camera crew, and an editor. In our model, AI agents replace the crew. You remain the Architect.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-5 border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="w-6 h-6 text-indigo-400" />
                      <h4 className="text-white font-bold">The Brain (Script)</h4>
                    </div>
                    <p className="text-slate-400 text-sm">We use LLMs (ChatGPT/Claude) to analyze successful psychological hooks and write high-retention scripts.</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-5 border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Bot className="w-6 h-6 text-indigo-400" />
                      <h4 className="text-white font-bold">The Voice (Audio)</h4>
                    </div>
                    <p className="text-slate-400 text-sm">We use Voice Cloning (ElevenLabs) to generate hyper-realistic narration that retains audience attention.</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-5 border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-6 h-6 text-indigo-400" />
                      <h4 className="text-white font-bold">The Eyes (Visuals)</h4>
                    </div>
                    <p className="text-slate-400 text-sm">We use Generative Art (Midjourney/DALL-E) & stock footage to create valid visual stimuli without filming.</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-5 border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-6 h-6 text-indigo-400" />
                      <h4 className="text-white font-bold">The Assembly (Edit)</h4>
                    </div>
                    <p className="text-slate-400 text-sm">We use CapCut and templates to assemble these pieces into viral assets in under 30 minutes.</p>
                  </div>
                </div>
              </div>

              {/* The 30 Day Logic */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📈</span>
                  <h3 className="text-2xl font-bold text-white">Why 30 Days?</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                   Algorithms on TikTok, Reels, and Shorts reward one thing above all else: <strong>Consistency</strong>.
                </p>
                
                <ul className="list-none space-y-4 pl-0">
                  <li className="flex gap-3 bg-slate-800/30 p-4 rounded-lg border-l-4 border-blue-500">
                    <span className="text-blue-400 font-bold">Days 1-7:</span>
                    <span className="text-slate-300">The "Sandbox" Phase. The algorithm learns who your content is for. Views may be low. This is normal.</span>
                  </li>
                  <li className="flex gap-3 bg-slate-800/30 p-4 rounded-lg border-l-4 border-indigo-500">
                    <span className="text-indigo-400 font-bold">Days 8-21:</span>
                    <span className="text-slate-300">The "Calibration" Phase. We look at data, refine the hooks, and improve the output.</span>
                  </li>
                  <li className="flex gap-3 bg-slate-800/30 p-4 rounded-lg border-l-4 border-purple-500">
                    <span className="text-purple-400 font-bold">Days 22-30:</span>
                    <span className="text-slate-300">The "Scale" Phase. One video usually pops here, dragging the previous 29 videos up with it.</span>
                  </li>
                </ul>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-8 border-2 border-indigo-500/40 mb-8 shadow-lg shadow-indigo-900/20">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-indigo-300 mb-2">Your Assignment: The 30-Day Contract</h3>
                </div>
                
                <div className="bg-indigo-950/40 rounded-lg p-6 mb-8 border border-indigo-400/20">
                  <p className="text-slate-300 leading-relaxed text-center">
                    Before we open the tools or choose a niche (Module 2), you must commit to the process. Success in this game is not about talent; it is about outlasting the people who quit on Day 4.
                  </p>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-slate-900/60 rounded-lg p-6 border border-indigo-500/30">
                        <h4 className="text-lg font-semibold text-white mb-4">Step 1: Write Your "Why" Statement</h4>
                        <p className="text-slate-400 mb-4">Open a document or note. Write down exactly <strong>why</strong> you are doing this. Is it to replace your salary? To sell your own product? To gain influence?</p>
                        <p className="text-sm text-indigo-300 italic">Example: "I am building this channel to generate $3k/month in affiliate commissions so I can pay off my car."</p>
                    </div>

                    <div className="bg-slate-900/60 rounded-lg p-6 border border-indigo-500/30">
                        <h4 className="text-lg font-semibold text-white mb-4">Step 2: The Commitment Contract</h4>
                        <p className="text-slate-400 mb-4">Copy and paste the text below into an email draft:</p>
                        
                        <div className="bg-black/30 p-4 rounded border border-slate-700 font-mono text-sm text-slate-300 mb-4">
                            "I, [Your Name], commit to the 30-Day AI Content Challenge.<br/><br/>
                            I pledge to post 1 piece of content every single day, regardless of view count, likes, or feelings.<br/><br/>
                            I understand that the first 10 videos might be bad, and that is the price of entry.<br/><br/>
                            My 'Why' is: [Insert Your Why]"
                        </div>
                        
                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                            <span>✉️ Send this email to: pledge@aicontentchallenge.com</span>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                  <p className="text-indigo-300 font-semibold mb-2">
                    Why email this?
                  </p>
                  <p className="text-slate-300 text-sm">
                    When you externalize a text, it becomes real. Internal promises are easily broken. External promises are binding. Once you send this, you have started.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Module Progress</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                  style={{ width: isCompleted ? "100%" : "0%" }}
                ></div>
              </div>
              <span className="text-indigo-400 font-semibold">{isCompleted ? "100%" : "0%"}</span>
            </div>
            <p className="text-slate-400 mt-2 text-sm">
              {isCompleted ? "Module completed! You can now access Module 2: NICHE DOWSING." : "Read the blueprint and send your pledge to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 rounded-lg p-6 mb-8 border border-indigo-500/30 text-center">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">I Have Sent My Pledge</h3>
              <p className="text-slate-300 mb-6">
                By clicking below, you confirm you have read the blueprint and sent your commitment email.
              </p>
              <Button 
                onClick={handleCompleteModule}
                disabled={isUpdating}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-lg w-full md:w-auto"
              >
                {isUpdating ? "Unlocking..." : `Complete Module ${moduleId} & Continue →`}
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" disabled className="border-slate-700 text-slate-500">
              Previous Module
            </Button>
            
            <Link href={`/order/product/${productId}`}>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Back to Challenge Dashboard →
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