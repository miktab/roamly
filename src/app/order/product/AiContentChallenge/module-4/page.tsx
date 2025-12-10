'use client'
import Link from "next/link"
import { CheckCircle, Lock, Palette, Fingerprint, Type, Layout, Image as ImageIcon, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module4() {
  const moduleId = 4
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
    
    // Update progress to module 5 (completing module 4)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 4 - Locked</h1>
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
                <div className="text-blue-100 text-sm font-medium tracking-wider">MODULE 4</div>
                <h1 className="text-3xl font-bold text-white">BRAND IDENTITY</h1>
              </div>
            </div>
            <p className="text-blue-100 text-lg">Since you don't have a face, your aesthetic is your face. Let's build it.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Intro */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🎨</div>
                <h2 className="text-3xl font-bold text-white mb-2">The Vibe Check</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Humans are visual creatures. When a viewer lands on your profile from a Short or Reel, they make a subconscious decision in less than 0.5 seconds: <strong>"Is this pro, or is this amateur?"</strong>
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  In the faceless game, you do not have eye contact or charisma to rely on. You have your branding. Your color palette, your logo, and your bio ARE your personality.
                </p>
                
                <div className="bg-gradient-to-r from-indigo-900/40 to-blue-900/40 rounded-lg p-6 mb-6 border border-indigo-500/30">
                  <p className="text-indigo-200 font-semibold text-center">
                    Today, we are using our Tool Stack (ChatGPT + Midjourney) to build a brand that looks like a media company from Day 1.
                  </p>
                </div>
              </div>

              {/* Step 1: Naming */}
              <div className="bg-slate-800/30 rounded-lg p-6 mb-8 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <Type className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">1. The Name</h3>
                </div>
                
                <p className="text-slate-300 mb-4">
                  Do not use your real name. Do not use numbers (e.g., <span className="text-red-400">CryptoKing993</span>). We want two words that sound authoritative or intriguing.
                </p>
                
                <div className="bg-black/40 p-4 rounded-lg border border-slate-700 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-purple-400 uppercase">ChatGPT Prompt</span>
                    <Copy className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white" />
                  </div>
                  <p className="font-mono text-sm text-slate-300">
                    "I am starting a TikTok/YouTube channel about [YOUR NICHE]. Give me 20 brand name ideas. They should be short (2 words max), memorable, and easy to spell. Avoid generic terms. Use styles like: Abstract, Authoritative, or Mysterious."
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-slate-400 font-mono">
                  <div className="bg-slate-900/50 p-2 rounded text-center">The Stoic Mind</div>
                  <div className="bg-slate-900/50 p-2 rounded text-center">Future Signal</div>
                  <div className="bg-slate-900/50 p-2 rounded text-center">Dark Logic</div>
                  <div className="bg-slate-900/50 p-2 rounded text-center">Wealth Vault</div>
                  <div className="bg-slate-900/50 p-2 rounded text-center">Apex Data</div>
                  <div className="bg-slate-900/50 p-2 rounded text-center">Neon History</div>
                </div>
              </div>

              {/* Step 2: The Logo (Visuals) */}
              <div className="bg-slate-800/30 rounded-lg p-6 mb-8 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <Fingerprint className="w-6 h-6 text-pink-400" />
                  <h3 className="text-2xl font-bold text-white">2. The Face (The Logo)</h3>
                </div>
                
                <p className="text-slate-300 mb-4">
                  Your profile picture will be very small on a mobile screen. Do not use complex scenes or text. Use a <strong>Mask</strong>, a <strong>Symbol</strong>, or an <strong>Abstract Shape</strong>.
                </p>

                 <div className="bg-black/40 p-4 rounded-lg border border-slate-700 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-pink-400 uppercase">Midjourney Prompt</span>
                    <Copy className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white" />
                  </div>
                  <p className="font-mono text-sm text-slate-300">
                    "/imagine prompt: a minimalist vector logo of a [OBJECT: e.g. Lion / Brain / Atom], flat design, white lines on a deep indigo background, simple geometric shapes, high contrast, no text --no realistic --v 6.0"
                  </p>
                </div>
                 <p className="text-sm text-slate-400 italic">
                    *For Leonardo.ai users, simply describe "Minimalist vector logo of [Object], dark background" in the prompt box.
                </p>
              </div>

               {/* Step 3: The Bio */}
              <div className="bg-slate-800/30 rounded-lg p-6 mb-8 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <Layout className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">3. The Optimization (Bio)</h3>
                </div>
                
                <p className="text-slate-300 mb-4">
                  You have limited characters. Your bio should answer two questions: "What is this?" and "Why should I follow?"
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border-l-4 border-green-500 p-4 rounded">
                         <div className="text-green-400 font-bold text-sm mb-2">✅ The Authority Formula</div>
                         <p className="text-slate-300 text-sm font-mono">
                             [Keyword] Insights 🧠<br/>
                             Helping you [Result] 📈<br/>
                             New Videos Daily 👇<br/>
                             [Link]
                         </p>
                    </div>
                    <div className="bg-slate-900/50 border-l-4 border-red-500 p-4 rounded">
                         <div className="text-red-400 font-bold text-sm mb-2">❌ The Amateur Mistake</div>
                         <p className="text-slate-300 text-sm font-mono">
                             Just a guy posting cool stuff.<br/>
                             Follow for follow!<br/>
                             Business inquiries: none
                         </p>
                    </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-white/10 to-slate-800/50 rounded-xl p-8 border border-white/20 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🏙️</div>
                  <h3 className="text-3xl font-bold text-white mb-2">Assignment: Open Your Storefront</h3>
                </div>
                
                <div className="bg-slate-900/60 rounded-lg p-6 mb-8 border border-slate-700">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    It fits squarely within our philosophy: <strong>Do it now.</strong> Do not spend 3 days thinking about a name. Pick the best one today and move.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-400 mt-1" />
                        <span className="text-slate-300"><strong>Create the email:</strong> Make a new Gmail for the brand (e.g., brandname.business@gmail.com).</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-400 mt-1" />
                        <span className="text-slate-300"><strong>Secure the handles:</strong> Sign up for your primary platform (TikTok/IG/YouTube).</span>
                    </li>
                     <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-400 mt-1" />
                        <span className="text-slate-300"><strong>Upload:</strong> Set your AI-generated Logo as the PFP and paste your optimized Bio.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                  <p className="text-indigo-300 font-semibold text-lg mb-2">
                    The Psychological Shift
                  </p>
                  <p className="text-slate-300 mb-3">
                    When you see that logo on the screen and read that professional bio, you stop being a "user" and start being a "creator." The psychology changes instantly.
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
            <p className="text-slate-400 mt-2">
              {isCompleted ? "Storefront open! You are ready specifically for Module 5: ALGORITHM DECODED." : "Setup your profile components to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 rounded-lg p-6 mb-8 border border-indigo-500/30 text-center">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">Account Established</h3>
              <p className="text-slate-300 mb-6">
                By clicking below, you confirm you have created your account, uploaded a logo, and written your bio.
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
            <Link href={`/order/product/${productId}/module-3`}>
              <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-white">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href={`/order/product/${productId}/module-5`}>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
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