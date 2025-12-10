'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module13() {
  const moduleId = 13
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
    
    // Update progress to module 14 (completing module 13)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 13 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 13</div>
                <h1 className="text-3xl font-bold text-white">THE SOVEREIGN PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The Sovereign Stack: Structuring Your Global Life</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Insider tactics for banking, taxes, and health that enable a lifetime of freedom.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🛡️</div>
                <h2 className="text-3xl font-bold text-white mb-2">Building Your Bulletproof Chassis</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  So far, you have built the engine (your product) and the fuel system (your marketing). Now it is time to build the chassis. The chassis is the boring, invisible frame that everything else bolts onto. It is not exciting, but without a strong frame, a powerful engine will tear the car apart at the first turn.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Your life as a nomad is the same. Banking, corporate structure, taxes, and insurance are your chassis. Getting this right is the difference between a stressful six month trip and a sustainable, decade long life of freedom. This module contains the insider tactics learned through years of trial and error by nomads in our community.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Mastering this "boring" stuff is the final act of becoming truly independent. It is how you protect your downside, optimize your upside, and insulate yourself from the whims of any single government or corporation.
                  </p>
                  <p className="text-emerald-400 font-semibold text-center">
                    This is how you build a life that is not just free, but resilient.
                  </p>
                </div>
              </div>

              {/* Banking */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-8 mb-8 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">💳</span>
                  <h3 className="text-2xl font-bold text-white">The Nomad Banking Trifecta</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  Relying solely on your home country bank is a rookie mistake that costs thousands in fees. Professional nomads use a three-part stack to manage money globally, efficiently, and safely.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">1. The Fintech Hub (Wise/Revolut)</div>
                    <p className="text-slate-300 text-sm">This is your global wallet and daily driver. Use it for receiving payments in multiple currencies, exchanging money at near perfect rates, and spending with its debit card. This single tool eliminates 90% of the fees you would pay with a traditional bank. This is the first account you should set up.</p>
                  </div>
                   <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">2. The Corporate Fortress (Offshore Business Account)</div>
                    <p className="text-slate-300 text-sm">As your income grows, it must be separated from you personally. Forming a simple US LLC (even as a non-US citizen) in a state like Wyoming or Delaware creates a legal entity that earns the money. You then open a business bank account for this LLC. This provides crucial liability protection and is the cornerstone of any tax optimization strategy. Your business revenue flows here, and you pay yourself a salary from it.</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">3. The Legacy Anchor (Home Country Bank)</div>
                    <p className="text-slate-300 text-sm">Do not close your home bank account. Keep it as a stable anchor. Use it to maintain your credit score, pay bills back home, and as an emergency backup. Think of it as a secure port to return to if needed, but not the vessel you use for daily voyages.</p>
                  </div>
                </div>
              </div>

              {/* Taxes */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🏛️</span>
                  <h3 className="text-2xl font-bold text-white">The Tax Game: Principles of Financial Sovereignty</h3>
                </div>
                <div className="bg-yellow-900/30 p-4 rounded-lg text-sm text-yellow-300 mb-6 border border-yellow-500/30">
                  <strong className="text-yellow-200">Disclaimer:</strong> We are not tax advisors. This information is for educational purposes only. The single most valuable investment you can make is hiring a tax professional who specializes in expats and digital nomads.
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  You cannot escape taxes, but you can legally and ethically minimize them by understanding the rules of the game.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-6 rounded-lg border border-red-500/30">
                    <h4 className="text-xl font-bold text-red-300 mb-3">Core Principle 1: Citizenship vs. Residency Taxation</h4>
                    <p className="text-slate-300 leading-relaxed">
                      If you are a US citizen, you are in a unique club. You are taxed on your worldwide income no matter where you live. For citizens of nearly every other country, you are taxed based on where you are a <strong className="text-white">tax resident</strong>. This is a crucial distinction that defines your entire strategy.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-6 rounded-lg border border-red-500/30">
                    <h4 className="text-xl font-bold text-red-300 mb-3">Core Principle 2: The 183-Day Rule & Flag Theory</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Most countries consider you a tax resident if you spend more than 183 days there in a year. The "Perpetual Traveler" or "Flag Theory" strategy involves planting flags (residency, business incorporation, banking) in different, advantageous countries and never staying long enough in any high tax country to become a tax resident there. This is an advanced but powerful strategy. 
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-6 rounded-lg border border-red-500/30">
                    <h4 className="text-xl font-bold text-red-300 mb-3">The Pro Move for US Citizens: The FEIE</h4>
                    <p className="text-slate-300 leading-relaxed">
                      The Foreign Earned Income Exclusion (FEIE) is your best friend. It allows you to legally exclude a significant amount of your foreign earned income (over $120,000 as of 2023) from US taxes. To qualify, you must meet either the "Physical Presence Test" (be outside the US for 330 of any 365 day period) or the "Bona Fide Residence Test" (be a legal resident of another country for a full year). Structuring your travel to meet this test can save you tens of thousands of dollars.
                    </p>
                  </div>
                </div>
              </div>


              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Assignment: Fortify Your Foundations</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    This week is about taking concrete, powerful actions to build your sovereign financial structure.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Activate Your Fintech Hub.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">If you have not already, create an account with Wise. Link it to your home bank account and order the physical debit card. This is your first piece of global infrastructure.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Research Your Corporate Structure & Health Insurance.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Identify one service that helps foreigners set up a US LLC (e.g., Doola, Firstbase) and review their pricing. Then, go to SafetyWing or a similar provider and get a real quote for global health coverage. Understand these numbers; they are the true cost of freedom.</p>
                    </div>

                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Find Your Advisor.</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">This is the most important step. Research and identify one tax professional or firm that specializes in your country's expatriate tax laws. Do not hire them yet. Just find one, read their blog, and save their contact info. Knowing who to call is half the battle.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Self Grade Checklist</h5>
                   <p className="text-slate-300 mb-4">You are building a real global operation. You are done when you have these assets.</p>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Is your Wise account open and your card on the way?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Do you know the cost to form an LLC and the monthly cost of global health insurance?</span>
                    </div>
                     <div className="flex items-start gap-3">
                      <span className="text-yellow-400">•</span>
                      <span>Have you identified and saved the contact information for a specialist expat tax advisor?</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    You are now more mobile and resilient than 99% of people.
                  </p>
                  <p className="text-slate-300">
                    With these frameworks, you can confidently move through the world, knowing your finances are optimized and your health is protected. You have built the foundation for a truly independent life.
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
              {isCompleted ? "Module completed! Your sovereign stack is designed." : "Complete the assignment to unlock the final module."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready for the Final Step?</h3>
              <p className="text-slate-300 mb-6">
                With your foundations fortified, it is time to look at the road ahead.
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
            <Link href="/order/product/RemoteReadyBootcamp/module-12">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            <Link href="/order/product/RemoteReadyBootcamp/module-14">
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