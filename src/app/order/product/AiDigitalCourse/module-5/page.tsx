'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module5() {
  const moduleId = 5
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
        // Module 5 has access if currentModule is >= 5
        setHasAccess(progress.currentModule >= moduleId)
        // Module 5 is completed if currentModule is > 5
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
    const product = 'RemoteReadyBootcamp'
    
    // Update progress to module 6 (completing module 5)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 5 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 5</div>
                <h1 className="text-3xl font-bold text-white">THE ENGINE PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">Assembling Your Product V1</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">From manual service and scattered assets to a scalable, sellable digital product.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🧱</div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome, Product Architect</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  In Module 4, you were a coach and a documentarian. You took on aclient, served them with a high-touch concierge service, and meticulously collected the 'assets'—the emails, the checklists, the call recordings—in your Blueprint Binder.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    That binder is not a scrapbook. It's a pile of Lego bricks. And an amazing testimonial from your first client is the picture on the box. Today, we assemble the Legos.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    This module is about transforming your high-touch, one-to-one service into a low-touch, one-to-many V1 product. This is how we begin to separate your income from your time.
                  </p>
                </div>
              </div>

              {/* The "Good Enough" Principle */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-2xl font-bold text-white">The Perfectionism Trap</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  The biggest enemy at this stage is the desire to create a perfectly polished, Netflix-quality documentary. You imagine fancy animations, a custom-coded website, and a flawless user experience.
                </p>
                
                <div className="bg-red-900/20 rounded-lg p-4 mb-6 border border-red-500/30">
                  <p className="text-red-400 font-semibold text-lg mb-2">
                    This desire will kill your momentum and your business.
                  </p>
                  <p className="text-slate-300">
                    Your goal is not perfection. Your goal is <strong className="text-emerald-400">"Good Enough to Get the Result."</strong> Your V1 product only needs to do one thing: effectively guide a new customer from Point A to Point B, just as you did for your first client.
                  </p>
                </div>
                 <p className="text-white font-bold text-lg text-center">
                   Speed and utility beat polish every time at this stage.
                </p>
              </div>

              {/* The "Lean Machine" Tech Stack */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🛠️</span>
                  <h3 className="text-2xl font-bold text-white">The "Lean Machine" Tech Stack</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  You don't need a complex, expensive Learning Management System (LMS). We are going to assemble your product using simple, fast, and cheap (or free) tools.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-400 mb-2">1. For Content Hosting:</div>
                    <p className="text-slate-300 text-sm">Your videos, text, and downloads need a home. Choose ONE:</p>
                    <ul className="text-sm list-disc ml-5 mt-2 space-y-1 text-slate-300">
                      <li><strong>Notion:</strong> The easiest. Create a main page, then sub-pages for each module. You can embed videos, text, and links. You can share it with a secret link.</li>
                      <li><strong>Private YouTube/Vimeo/Loom:</strong> Upload your lesson videos as "unlisted" and embed them on a simple, password-protected page on your website.</li>
                      <li><strong>Google Drive:</strong> You can literally just organize documents and videos in a shared folder. It's not pretty, but it's fast and free.</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-purple-400 mb-2">2. For Sales & Payment:</div>
                    <p className="text-slate-300 text-sm">You need a way to take money and grant access. Choose ONE:</p>
                    <ul className="text-sm list-disc ml-5 mt-2 space-y-1 text-slate-300">
                      <li><strong>Lemon Squeezy:</strong> An all-in-one platform perfect for digital products. It handles payments, taxes, and delivers your digital file (like a PDF with the link to your Notion/content).</li>
                      <li><strong>Stripe Payment Links:</strong> Incredibly simple. Create a product in Stripe, generate a payment link, and put it on your website. You'll need to manually email the customer access, which is fine for your first few sales.</li>
                    </ul>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-orange-400 mb-2">3. For your Sales Page:</div>
                    <p className="text-slate-300 text-sm">You need a simple online storefront. Choose ONE:</p>
                    <ul className="text-sm list-disc ml-5 mt-2 space-y-1 text-slate-300">
                      <li><strong>Carrd.co:</strong> Create a beautiful, simple, one-page website in an afternoon for next to nothing.</li>
                      <li><strong>A single Notion Page:</strong> Yes, you can even make your sales page in Notion. It's clean, simple, and free.</li>
                      <li><strong>Your own website:</strong> If you already have a blog or site (e.g., on Webflow, Squarespace), just add a new page.</li>
                    </ul>
                  </div>
                </div>
              </div>

               {/* Assembling the Product */}
              <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg p-6 mb-8 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🧩</span>
                  <h3 className="text-2xl font-bold text-white">From Blueprint to Curriculum</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  Open your "V1 Blueprint" folder. This is your raw material. Here is how you turn it into a product.
                </p>

                <div className="space-y-4">
                    <div className="bg-slate-800/60 rounded-lg p-4">
                        <div className="text-emerald-400 font-semibold mb-2">Step 1: Outline the Journey</div>
                        <p className="text-slate-300 text-sm">Think about the journey you took your first client on. What was the first thing they needed to do? The second? The third? Those are your modules. Create a simple outline: </p>
                        <p className="text-slate-400 text-xs mt-2 font-mono">Module 1: The Foundation<br/>Module 2: Finding Your Target<br/>Module 3: Crafting the Offer...</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4">
                        <div className="text-emerald-400 font-semibold mb-2">Step 2: Slot in Your Assets</div>
                        <p className="text-slate-300 text-sm">Go through your Blueprint binder and drag and drop your asset files into the outline. The "Welcome Email Template" goes in Module 1. The "Cold Outreach Script" goes in Module 2. The "Call Recording" might become a case study in Module 3.</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4">
                        <div className="text-emerald-400 font-semibold mb-2">Step 3: Fill the Gaps</div>
                        <p className="text-slate-300 text-sm">You'll inevitably have gaps. Maybe you explained a key concept on a call but didn't make a standalone asset. Now is the time to create it. Record a quick, 5-10 minute Loom or screen-share video explaining that one concept. Don't overthink it. Just teach. Turn your messy notes into a clean, one-page PDF worksheet.</p>
                    </div>
                </div>
              </div>


              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Assemble Your V1 MVP</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    It's time to stop planning and start building. Your mission is to create a functional, "good enough" V1 of your product and its storefront.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Choose Your "Lean Machine" Tech Stack.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Decide on one tool for content hosting, one for payment, and one for your sales page. Write them down. Don't overthink it, just choose.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Build Your Product's "Container".</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Set up your chosen content host (e.g., a Notion page). Create the structure for your modules (e.g., Module 1, Module 2, Module 3 headers). You don't have to fill it all yet, just build the skeleton.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Assemble Your First Module.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Take the relevant assets from your Blueprint Binder and add them to "Module 1" in your new product container. This means embedding a video, adding text, or linking to a PDF. Make Module 1 functional.</p>
                    </div>
                   
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">4</div>
                        <div className="text-yellow-300 font-semibold">Draft a Minimum Viable Sales Page.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Using Carrd, Notion or similar, create a one-page site. It must include: the core promise (headline), who it's for, what's inside (your module outline), and most importantly, <strong className="text-white">your client testimonial.</strong> You don't need a buy button yet, just the draft.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Share Your Progress in the WhatsApp Community</h5>
                  
                  <p className="text-slate-300 mb-4">
                    Accountability is key. To complete this assignment, share proof of your work. Post ONE of the following:
                  </p>
                  
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>A screenshot of your product container (e.g., your Notion page) showing the fully assembled Module 1.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>A link to your drafted one-page sales page. (Don't worry, it's a draft! Getting feedback now is a gift).</span>
                    </div>
                  </div>

                  <p className="text-slate-300 mt-4 text-sm">
                    Use the hashtag #MVPbuilt. This is how you signal you've completed the work and are ready for the next level: getting your first real product sales.
                  </p>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    You are now the owner of a real digital asset.
                  </p>
                  <p className="text-slate-300 mb-3">
                    You have something you can sell. It may not be perfect, but it's real. In the next modules, we'll refine this, create a killer offer, and build a system to sell it while you sleep (or explore a new city).
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
              {isCompleted ? "Module completed! Your V1 Product is assembled." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have assembled your V1 product and drafted your sales page, you're ready to move on.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-4">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-6">
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