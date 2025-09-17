'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module12() {
  const moduleId = 12
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
    
    // Update progress to module 13 (completing module 12)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 12 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 12</div>
                <h1 className="text-3xl font-bold text-white">THE SOVEREIGN PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Art of Global Mobility</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">How to choose your next home and stay there legally.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🌍</div>
                <h2 className="text-3xl font-bold text-white mb-2">The Dream Made Real</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Welcome to the Sovereign Phase. The systems you have built are now working. The income is consistent. You have fired yourself from the daily grind of your own business. The question is no longer "Can I leave?" but "Where do I go?"
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  This is the moment the dream becomes reality, and with it comes a new set of challenges that separates the amateur traveler from the professional global citizen. A tourist optimizes for a two week vacation. You are optimizing for life. This requires a level of strategy that most people never consider.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    The freedom you have built can be easily squandered by poor logistics, visa troubles, and loneliness. In this module, we move beyond the business and into the practical art of thriving anywhere in the world.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    We will give you the frameworks used by veteran nomads to not just travel, but to build a rich, productive, and stable life on the move.
                  </p>
                </div>
              </div>

              {/* Nomad Scorecard */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-8 mb-8 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl"> scorecard</span>
                  <h3 className="text-2xl font-bold text-white">The Nomad's Scorecard: Choosing Your Base</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  Do not pick a location based on an Instagram photo. You are choosing a base of operations. This is a strategic decision. Use this scorecard to evaluate potential locations objectively.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">1. Cost of Living vs. Quality of Life</div>
                    <p className="text-slate-300 text-sm">Use a tool like NomadList.com to get a baseline. But look deeper. It is not just about being cheap. A low cost of living is meaningless if the internet is unreliable or you do not feel safe. The goal is to find the sweet spot where your income affords you a high quality life without draining your resources.</p>
                  </div>
                   <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">2. Connectivity & Infrastructure</div>
                    <p className="text-slate-300 text-sm">This is non negotiable. What is the average wifi speed? Is fiber optic common? Is 5G available? Are there reliable coworking spaces or cafes to work from? A beautiful beach is a prison if you cannot take a client call.</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">3. Time Zone Compatibility</div>
                    <p className="text-slate-300 text-sm">A critical, often overlooked factor. If your client base or team is primarily in North America, living in Southeast Asia might mean taking calls at 2 AM. A base in Europe or Latin America might be more sustainable. Map out your ideal work hours and see which locations align.</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">4. Community & Social Scene</div>
                    <p className="text-slate-300 text-sm">Loneliness is the number one killer of the nomadic dream. Is there an existing community of expats or other remote workers? Are there social hubs, events, or classes where you can meet people? This is crucial for long term mental health and happiness.</p>
                  </div>
                </div>
              </div>

              {/* Visa Game */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📜</span>
                  <h3 className="text-2xl font-bold text-white">Playing The Visa Game: From Tourist to Resident</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  This is the real gatekeeper of a location independent life. Understanding your options is the key to unlocking long term stays and reducing the stress of constant travel. Your options evolve as your success grows.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded-lg p-6 border-l-4 border-slate-400">
                    <h4 className="text-xl font-bold text-slate-300 mb-4">Tier 1: The Tourist Shuffle</h4>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      This is where everyone starts. You enter a country on a standard 30, 60, or 90 day tourist visa or waiver. When your time is up, you leave, "reset" your visa, and potentially reenter.
                    </p>
                    <div className="bg-slate-800/50 p-3 rounded-lg text-sm">
                      <p><strong className="text-emerald-400">Pro:</strong> Simple, requires no advance planning. Great for testing a location.</p>
                      <p><strong className="text-red-400">Con:</strong> Legally gray, stressful, costly in terms of flights, and immigration officers can deny reentry. It is not a stable, long term solution.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-700/30 to-teal-700/30 rounded-lg p-6 border-l-4 border-emerald-400">
                    <h4 className="text-xl font-bold text-emerald-300 mb-4">Tier 2: The Digital Nomad Visa</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the new frontier. Countries are finally recognizing remote work. Nations like Spain, Brazil, Thailand, Japan, and dozens more now offer specific visas for location independent workers.
                    </p>
                    <div className="bg-emerald-900/50 p-3 rounded-lg text-sm">
                      <p>Typically, you need to prove a certain level of stable income (usually $2,000 to $4,000 per month), have health insurance, and have no criminal record. This offers a one to two year legal residency, the ability to open a bank account, and peace of mind. This is the optimal path for most successful remote entrepreneurs.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-700/30 to-pink-700/30 rounded-lg p-6 border-l-4 border-purple-400">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">Tier 3: The Residency Play</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the sovereign level strategy. Rather than relying on your work, you acquire residency through other means. This includes "non lucrative" visas (proving you have enough savings to live without working, like in Spain or Portugal) or investment based "Golden Visas."
                    </p>
                     <div className="bg-purple-900/50 p-3 rounded-lg text-sm">
                      <p>This completely separates your right to live in a country from your active business income. It provides the ultimate stability and is a stepping stone to acquiring a second citizenship, which is the final boss of global mobility.</p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: Your Global Blueprint</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    It is time to translate the dream into a concrete plan. Your mission is to research and plan your first one to three potential moves as a global citizen.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Create Your Dream List.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">List five countries you would realistically want to live in for at least three months.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Build Your Scorecard for Two Locations.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Create a spreadsheet or document. For your top two countries, research and fill out the Nomad's Scorecard: Cost of Living, Connectivity, Time Zone, and Community. Be specific.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Identify Your Visa Pathway.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">For your number one choice, identify the most viable visa strategy. Is it a tourist visa, a digital nomad visa, or something else? Find the official government website that details the requirements (income, insurance, etc.).</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Grade Checklist</h5>
                   <p className="text-slate-300 mb-4">This research is your personal flight plan. You are done when you can answer "yes" to the following.</p>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have I created a scorecard comparing the key metrics for at least two potential countries?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have I identified the specific name of the visa I would apply for for my top choice country?</span>
                    </div>
                     <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have I found and bookmarked the official government page listing the requirements for that visa?</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    The world is now your office.
                  </p>
                  <p className="text-slate-300">
                    With a successful business and a clear logistical plan, the barriers fall away. You are no longer just dreaming. You are planning. In the final modules, we will cover how to protect your assets and truly optimize your global life.
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
              {isCompleted ? "Module completed! Your global strategy is taking shape." : "Complete the assignment to unlock the next module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you have a researched plan for your first destination, you are ready to learn how to structure your global life.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-11">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-13">
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