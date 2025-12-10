'use client'
import Link from "next/link"
import { CheckCircle, Lock, Wrench, Bot, Mic, ImageIcon, Layers, CreditCard, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module3() {
  const moduleId = 3
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
        // Module 3 has access if currentModule is >= 3
        setHasAccess(progress.currentModule >= moduleId)
        // Module 3 is completed if currentModule is > 3
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
    
    // Update progress to module 4 (completing module 3)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 3 - Locked</h1>
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
                <div className="text-blue-100 text-sm font-medium tracking-wider">MODULE 3</div>
                <h1 className="text-3xl font-bold text-white">THE AI TOOL STACK</h1>
              </div>
            </div>
            <p className="text-blue-100 text-lg">Building your digital production studio for under $60/month.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🛠️</div>
                <h2 className="text-3xl font-bold text-white mb-2">The Factory Floor</h2>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6">
                You have a niche. Now you need a factory. In the old world, a "factory" meant cameras, lighting rigs, microphones, and actors.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                In this challenge, your factory is software. We are going to set up the "Holy Trinity" of AI content creation: <strong>Text, Audio, and Visuals</strong>.
              </p>

              {/* The Holy Trinity */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                   <Layers className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-2xl font-bold text-white">The Holy Trinity</h3>
                </div>

                <div className="grid gap-6">
                  
                  {/* Tool 1: Scripting */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-indigo-500/40 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-900/30 p-3 rounded-lg">
                        <Bot className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">1. The Brain (Scripting)</h4>
                        <p className="text-indigo-300 font-semibold text-sm mb-2">Tool: ChatGPT Plus (GPT-4) or Claude Pro</p>
                        <p className="text-slate-300 text-sm mb-4">
                          We need a Large Language Model (LLM) to write our scripts. 
                        </p>
                        <div className="bg-slate-900/50 p-3 rounded text-xs text-slate-400 border-l-2 border-green-500">
                          <strong>Why Paid?</strong> The free versions (GPT-3.5) create generic, robotic content. GPT-4 allows for nuance, humor, and mimicking specific writing styles.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tool 2: Visuals */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-indigo-500/40 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/30 p-3 rounded-lg">
                        <ImageIcon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">2. The Eyes (Visuals)</h4>
                        <p className="text-indigo-300 font-semibold text-sm mb-2">Tool: Midjourney (via Discord)</p>
                        <p className="text-slate-300 text-sm mb-4">
                          Midjourney is the undisputed king of artistic AI generation. It operates inside a chat app called Discord.
                        </p>
                        <div className="bg-slate-900/50 p-3 rounded text-xs text-slate-400 border-l-2 border-purple-500">
                          <strong>Alternative:</strong> If Discord is too confusing, use <strong>Leonardo.ai</strong>. It has a web interface and a decent free daily tier.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tool 3: Audio */}
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-indigo-500/40 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-900/30 p-3 rounded-lg">
                        <Mic className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">3. The Voice (Audio)</h4>
                        <p className="text-indigo-300 font-semibold text-sm mb-2">Tool: ElevenLabs</p>
                        <p className="text-slate-300 text-sm mb-4">
                          The gold standard for AI text-to-speech. It provides "hyper-realistic" voices that breathe, pause, and intonate like humans.
                        </p>
                        <div className="bg-slate-900/50 p-3 rounded text-xs text-slate-400 border-l-2 border-orange-500">
                          <strong>Warning:</strong> Do not use TikTok's built-in text-to-speech (the "Siri" voice). It kills retention on serious topics.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Assembler */}
              <div className="bg-slate-800/30 rounded-lg p-6 mb-8 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Wrench className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">The Assembler: CapCut</h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">
                    You need verified software to stitch these assets together. We use <strong>CapCut Desktop</strong> (PC/Mac).
                  </p>
                  <ul className="space-y-2 text-slate-400 text-sm list-disc pl-4">
                    <li>It has the best auto-captioning on the market.</li>
                    <li>It is free (though the Pro version has better effects).</li>
                    <li>It is optimized for vertical video (9:16).</li>
                  </ul>
              </div>

              {/* Cost Analysis */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-lg p-6 mb-8 border border-indigo-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">The Cost of Doing Business</h3>
                </div>
                <p className="text-slate-300 text-sm mb-6">
                  You are building a business. Businesses have expenses. Compared to buying a camera or hiring an editor, this is pennies.
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">ChatGPT Plus</span>
                    <span className="text-white">$20/mo</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Midjourney Basic</span>
                    <span className="text-white">$10/mo</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">ElevenLabs Starter</span>
                    <span className="text-white">$5/mo</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span className="text-indigo-400">Total Investment</span>
                    <span className="text-white">~$35 - $50 / mo</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 italic">
                  *You can cancel all of these after 30 days if you quit. But don't quit.
                </p>
              </div>

              {/* Assignment */}
              <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl p-8 border-2 border-indigo-500/40 mb-8 shadow-lg shadow-indigo-900/20">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🛠️</div>
                  <h3 className="text-3xl font-bold text-indigo-300 mb-2">Assignment: The Calibration Test</h3>
                </div>
                
                <div className="bg-indigo-950/40 rounded-lg p-6 mb-6 border border-indigo-400/20">
                  <p className="text-slate-300 text-center">
                    Today is Setup Day. We aren't making a full video yet. We are verifying that your factory works.
                  </p>
                </div>

                <div className="space-y-4">
                   <div className="bg-black/20 p-4 rounded border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-indigo-400" />
                        <span className="text-white font-semibold">Step 1: Text</span>
                      </div>
                      <p className="text-slate-400 text-sm">Open ChatGPT/Claude. Ask it: "Write a 30-word intro about the history of coffee." Save the text.</p>
                   </div>

                   <div className="bg-black/20 p-4 rounded border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-purple-400" />
                        <span className="text-white font-semibold">Step 2: Voice</span>
                      </div>
                      <p className="text-slate-400 text-sm">Create an ElevenLabs account. Paste that coffee text into the synthesizer. Download the audio file.</p>
                   </div>

                   <div className="bg-black/20 p-4 rounded border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-green-400" />
                        <span className="text-white font-semibold">Step 3: Image</span>
                      </div>
                      <p className="text-slate-400 text-sm">Open Midjourney (or Leonardo). Type <code className="bg-slate-800 px-1 rounded text-xs">/imagine prompt: a steaming cup of dark coffee, cinematic lighting, 8k --ar 9:16</code>. Save the image.</p>
                   </div>
                </div>
                
                <div className="mt-6 text-center">
                   <p className="text-slate-300 text-sm mb-4">
                     Do not proceed to Module 4 until you have successfully saved one text file, one audio mp3, and one image file.
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
              {isCompleted ? "Factory built! You are ready for Module 4: BRAND IDENTITY." : "Set up your accounts and test the tools to continue."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 rounded-lg p-6 mb-8 border border-indigo-500/30 text-center">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">My Tools Are Ready</h3>
              <p className="text-slate-300 mb-6">
                By clicking below, you confirm you have active accounts for LLM, Image Gen, and Voice Synthesis.
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
            
            <Link href={`/order/product/${productId}/module-2`}>
               <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-white">
                ← Previous Module
              </Button>
            </Link>
            
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