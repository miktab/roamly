'use client'
import Link from "next/link"
import { Award, Lock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"

export default function Module14() {
  const moduleId = 14
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

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

  const handleCompleteBootcamp = async () => {
    // This is the final step, simply mark as completed on the frontend.
    // A db update could be triggered here if desired, but for now we'll just update the state.
    setIsCompleted(true)
    // Optional: could trigger a call to update progress to a final state, e.g., currentModule: 999
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading final module...</div>
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 14 - Locked</h1>
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
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-emerald-100 text-sm">Module 14</div>
                <h1 className="text-3xl font-bold text-white">THE SOVEREIGN PHASE</h1>
                <h2 className="text-2xl font-semibold text-emerald-100 mt-2">The First Day of Your New Life</h2>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">You have the blueprint. Now, it is time to build the future.</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-white mb-2">Congratulations, You Made It.</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  Take a moment. Pause and reflect. Fourteen days ago, you started this journey with an idea, a desire for something more than the 9-to-5. In just 25 minutes a day, you have forged that desire into a tangible reality. You haven't just learned a few tactics; you have built a complete system for generating income and freedom.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  You discovered a problem, validated a solution, built a product, wrote a sales page, engineered a traffic system, and designed a legal and financial chassis for a global life. You possess a blueprint that you can use for the rest of your life.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    The bootcamp is over, but this is not an ending. This is the starting line. You have reached a new, higher basecamp. The view from here is incredible, but it is just the beginning of the real adventure.
                  </p>
                  <p className="text-emerald-400 font-semibold text-center">
                    What you do next will define your story.
                  </p>
                </div>
              </div>

               {/* The Next Chapter */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-8 mb-8 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">📖</span>
                  <h3 className="text-2xl font-bold text-white">Your Next Chapter: Optimize or Expand?</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  With the skills you have mastered, two primary paths open up before you. You do not have to choose one forever, but you must choose one for now.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">Path 1: The Craftsman (Optimize & Deepen)</div>
                    <p className="text-slate-300 text-sm">Focus all your energy on the business you have just built. Your goal is to go from your first sales to a consistent $5k, then $10k per month. Double down on your content engine. Experiment with paid ads. Build a community around your product. Become the undisputed master of your niche. This path builds depth and authority.</p>
                  </div>
                   <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-2">Path 2: The Architect (Expand & Replicate)</div>
                    <p className="text-slate-300 text-sm">You have the blueprint. Now you can use it again. Take your newfound skills—audience research, copywriting, automation—and apply them to creating a second, third, or fourth income stream. This could be another digital product, a high-ticket coaching service, or even an e-commerce brand. This path builds a diversified, resilient portfolio of income.</p>
                  </div>
                </div>
              </div>

              {/* The Inner Game */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🧠</span>
                  <h3 className="text-2xl font-bold text-white">The Real "Insider Tactics": Winning the Inner Game</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  The biggest challenges ahead are not logistical; they are psychological. Here is the final set of secrets from our team in Spain, Thailand, Japan, and Brazil.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-700/30 to-pink-700/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-purple-300 mb-3">Embrace the Freedom and Fear of the Blank Page</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Without a boss, a commute, or a schedule, some days you will wake up with a profound sense of "what now?" This is normal. The antidote is structure you impose on yourself. Plan 90-day sprints. Set one major goal for the quarter. Break it down into weekly tasks. Your structure is your sanity.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-700/30 to-pink-700/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-purple-300 mb-3">Actively Combat Loneliness</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Remote work can be isolating. You must be aggressively social. Do not just work from your apartment. Join a coworking space. Take a local language class, a dance class, a martial arts class. Go to expat meetups. Your business is automated; your social life cannot be. Build it as deliberately as you built your sales funnel.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-700/30 to-pink-700/30 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-purple-300 mb-3">Redefine Your Metrics for Success</h4>
                    <p className="text-slate-300 leading-relaxed">
                      In the beginning, your metric is income. But once you have enough, that metric becomes hollow. Your new metrics are your own. Is it "time spent not working"? Is it "number of new skills learned"? Is it "days spent hiking"? Your income is now a tool to maximize your true metrics of a life well-lived.
                    </p>
                  </div>
                </div>
              </div>


              {/* The Community */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-xl p-8 border-2 border-emerald-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-emerald-400 mb-2">You Are Not Alone: Join the Community</h3>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed text-center">
                    The single most important asset you have from this point forward is not your product or your email list. It is your network.
                  </p>
                  <p className="text-slate-300 leading-relaxed mt-4">
                    The lessons from this point on will not come from modules. They will come from conversations with those who are one step ahead of you. They will come from sharing your struggles and getting real-time advice. They will come from celebrating your wins with people who truly understand the journey.
                  </p>
                </div>
                <p className="text-white text-lg text-center mb-6">
                  Our private global community of earners is waiting for you. This is where you connect with us, your instructors, and the entire network of graduates living this life. This is where you will ask about that new visa in Portugal, find a coworking buddy in Medellin, or get feedback on your next product idea.
                </p>
                <div className="text-center">
                   <Link href="/community/join">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-lg">
                        Enter the Graduate Circle →
                      </Button>
                  </Link>
                </div>
              </div>

              {/* Final Words */}
              <div className="text-center mt-12 mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">A Final Word From Us</h3>
                <p className="text-slate-300 max-w-2xl mx-auto leading-loose">
                  We created this bootcamp because it is what we wished we had when we started. We cobbled this knowledge together over years of mistakes and failures. You now have it in a concentrated, actionable format. You have everything you need. The path is clear.
                  <br/><br/>
                  Be bold. Be patient. Trust the systems you have built. And never forget the feeling you have right now—the feeling of infinite possibility.
                  <br/><br/>
                  The world is waiting. Go live in it.
                  <br/><br/>
                  Stay in touch. We cannot wait to see what you build.
                </p>
              </div>

            </div>
          </div>


          {/* Completion Button */}
          {!isCompleted ? (
            <div className="text-center">
              <Button 
                onClick={handleCompleteBootcamp}
                className="bg-emerald-600 hover:bg-emerald-700 px-10 py-4 text-xl"
              >
                Finish the Bootcamp
              </Button>
            </div>
          ) : (
             <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">Bootcamp Complete!</h3>
              <p className="text-slate-300">
                You have finished the Remote Ready Bootcamp. Welcome to your new life.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-center mt-12">
            <Link href="/order/product/RemoteReadyBootcamp">
              <Button variant="outline">
                ← Back to Course Overview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}