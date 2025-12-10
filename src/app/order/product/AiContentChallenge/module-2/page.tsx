'use client'
import Link from "next/link"
import { CheckCircle, Lock, Target, Search, TrendingUp, DollarSign, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module2() {
  const moduleId = 2
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
        // Module 2 has access if currentModule is >= 2
        setHasAccess(progress.currentModule >= moduleId)
        // Module 2 is completed if currentModule is > 2
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
    
    // Update progress to module 3 (completing module 2)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 2 - Locked</h1>
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
                <div className="text-blue-100 text-sm font-medium tracking-wider">MODULE 2</div>
                <h1 className="text-3xl font-bold text-white">NICHE DOWSING</h1>
              </div>
            </div>
            <p className="text-blue-100 text-lg">Using AI to uncover high-value, low-competition digital real estate.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Welcome Back */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">📡</div>
                <h2 className="text-3xl font-bold text-white mb-2">Algorithms Don't Watch Videos</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  You committed to the 30 days. Now we have to decide where to aim the cannon.
                </p>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Most people start a YouTube channel or TikTok page based on what <em>they</em> like. "I like video games, so I'll play video games." This is why 99% of channels fail.
                </p>
                
                <div className="bg-slate-800/50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-6">
                  <p className="text-indigo-300 font-semibold text-lg mb-2">
                    The Hard Truth:
                  </p>
                  <p className="text-slate-300">
                    Algorithms do not watch videos. They process metadata. They categorize content into buckets to sell specific audiences to advertisers.
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                   In this module, we are using "Niche Dowsing." Just as farmers use dowsing rods to find underground water, we will use AI to find "underground" money—topics with high search volume but terrible supply.
                </p>
              </div>

              {/* The RPM Logic */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 mb-8 border border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">The Economics: Understanding RPM</h3>
                </div>
                
                <p className="text-slate-300 mb-4">
                  RPM (Revenue Per Mille) is how much platform pays you for 1,000 views. Not all views are created equal.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-red-500/30">
                    <div className="text-red-400 font-bold mb-2">Low RPM ($0.50 - $2.00)</div>
                    <p className="text-sm text-slate-400 mb-2">Pranks, Gaming, Dancing, General Comedy.</p>
                    <p className="text-xs text-slate-500">Advertisers don't pay much because the audience doesn't have money (usually kids).</p>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-lg border border-green-500/30">
                    <div className="text-green-400 font-bold mb-2">High RPM ($10.00 - $35.00)</div>
                    <p className="text-sm text-slate-400 mb-2">Finance, Tech, Real Estate, Luxury, Software.</p>
                    <p className="text-xs text-slate-500">Advertisers pay huge sums because the audience is looking to buy.</p>
                  </div>
                </div>
                
                <p className="text-purple-300 text-center text-sm">
                  <strong>Strategy:</strong> Since we are using AI, it takes the same effort to make a video about "Investment Strategies" as it does "Funny Cats." We choose the one that pays 15x more.
                </p>
              </div>

              {/* The 4 Faceless Pillars */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                   <Target className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-2xl font-bold text-white">The 4 Faceless Pillars</h3>
                </div>
                
                <p className="text-slate-300 mb-6">
                  While you can start a channel about anything, these four categories consistently perform best for AI-generated content because they rely on information/visuals rather than personality.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pillar 1 */}
                    <div className="bg-slate-800/30 p-5 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors">
                        <h4 className="text-xl font-bold text-white mb-2">1. Dark Psychology / Mystery</h4>
                        <p className="text-slate-400 text-sm">True crime, historical anomalies, "scary facts," and paradoxes. High viral potential.</p>
                    </div>
                    
                    {/* Pillar 2 */}
                    <div className="bg-slate-800/30 p-5 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors">
                        <h4 className="text-xl font-bold text-white mb-2">2. Wealth & Business</h4>
                        <p className="text-slate-400 text-sm">Success stories, "how money works," crypto news, side hustles. High RPM.</p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-slate-800/30 p-5 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors">
                        <h4 className="text-xl font-bold text-white mb-2">3. Future & Tech</h4>
                        <p className="text-slate-400 text-sm">AI tools, space exploration, futuristic gadgets, scientific breakthroughs. High visual appeal.</p>
                    </div>

                    {/* Pillar 4 */}
                    <div className="bg-slate-800/30 p-5 rounded-lg border border-slate-700 hover:border-indigo-500/50 transition-colors">
                        <h4 className="text-xl font-bold text-white mb-2">4. Stoicism & Motivation</h4>
                        <p className="text-slate-400 text-sm">Ancient wisdom, quotes, self-discipline. Very easy to automate visually.</p>
                    </div>
                </div>
              </div>

              {/* The AI Dowsing Process */}
              <div className="bg-indigo-950/30 rounded-xl p-8 border border-indigo-500/20 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">The AI Dowsing Method</h3>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Don't guess. Use ChatGPT to find the gap in the market. Open your AI tool of choice (ChatGPT/Claude/Gemini) and use these exact prompts.
                </p>

                <div className="space-y-6">
                    {/* Prompt 1 */}
                    <div className="bg-black/40 rounded-lg p-4 border border-slate-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono text-indigo-400 uppercase">Prompt 1: The Clean Sweep</span>
                            <Button variant="ghost" size="sm" className="h-6 text-xs text-slate-500">Copy</Button>
                        </div>
                        <p className="font-mono text-sm text-slate-300">
                            "I want to create a faceless YouTube/TikTok channel using AI. List 20 specific sub-niches within the [Choose a Pillar: e.g., Wealth] category that have high CPM potential but lower competition. Focus on evergreen topics, not news."
                        </p>
                    </div>

                    {/* Prompt 2 */}
                    <div className="bg-black/40 rounded-lg p-4 border border-slate-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono text-indigo-400 uppercase">Prompt 2: The Deep Dive</span>
                            <Button variant="ghost" size="sm" className="h-6 text-xs text-slate-500">Copy</Button>
                        </div>
                        <p className="font-mono text-sm text-slate-300">
                            "Pick the top 3 from that list. For each one, give me 5 viral video title ideas that provoke curiosity or fear of missing out (FOMO)."
                        </p>
                    </div>
                </div>
              </div>

              {/* Validation Phase */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Search className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">Validation: The 100k Rule</h3>
                </div>
                
                <p className="text-slate-300 mb-6">
                  AI will give you ideas, but data gives you proof. Before you pick a niche, you must validate it on the actual platforms (TikTok/Shorts/Reels).
                </p>
                
                <div className="bg-slate-800/50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-white font-bold mb-2">The 100k Rule Verification:</h4>
                    <ol className="list-decimal list-inside text-slate-300 space-y-3">
                        <li>Search your keywords (e.g., "Stoic Quotes" or "AI News") on TikTok or YouTube.</li>
                        <li>Filter by "This Month" or "Last 30 Days."</li>
                        <li>Can you find at least 3 videos with over <strong>100,000 views</strong> posted by channels spanning less than 50k subscribers?</li>
                    </ol>
                    <p className="mt-4 text-blue-300 text-sm">
                        <strong>If YES:</strong> The niche is active and allows new entrants. Green light. <br/>
                        <strong>If NO:</strong> The niche is either dead or too saturated by giants. Red light.
                    </p>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900/40 rounded-xl p-8 border-2 border-indigo-500/40 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-3xl font-bold text-indigo-300 mb-2">Your Assignment: Pick Your Territory</h3>
                </div>
                
                <div className="bg-indigo-950/40 rounded-lg p-6 mb-8 border border-indigo-400/20">
                  <p className="text-slate-300 leading-relaxed text-center">
                    Decision paralysis ends here. You cannot build the machine until you know what it manufactures.
                  </p>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-slate-900/60 rounded-lg p-4 border border-indigo-500/30 flex items-start gap-4">
                        <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">1</div>
                        <div>
                            <h4 className="text-white font-semibold">Run the Prompts</h4>
                            <p className="text-slate-400 text-sm">Use the prompts above to get 3 strong candidates.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 rounded-lg p-4 border border-indigo-500/30 flex items-start gap-4">
                        <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">2</div>
                        <div>
                            <h4 className="text-white font-semibold">Validate with the 100k Rule</h4>
                            <p className="text-slate-400 text-sm">Discard any idea that doesn't have recent proof of concept.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 rounded-lg p-4 border border-indigo-500/30 flex items-start gap-4">
                        <div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">3</div>
                        <div>
                            <h4 className="text-white font-semibold">Lock it In</h4>
                            <p className="text-slate-400 text-sm">Write down your final choice. This is your focus for the next 28 days.</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-slate-900/80 rounded-lg p-6 mb-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Module Progress</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: isCompleted ? "100%" : "0%" }}
                ></div>
              </div>
              <span className="text-indigo-400 font-semibold">{isCompleted ? "100%" : "0%"}</span>
            </div>
            <p className="text-slate-400 mt-2">
              {isCompleted ? "Module completed! You can now access Module 3." : "Complete the assignment to unlock the Tool Stack."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 rounded-lg p-6 mb-8 border border-indigo-500/30 text-center">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">I Have Chosen My Niche</h3>
              <p className="text-slate-300 mb-6">
                By clicking below, you confirm you have validated your niche and are ready to build the tool stack.
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
            <Link href={`/order/product/${productId}/module-1`}>
              <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-white">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href={`/order/product/${productId}/module-3`}>
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