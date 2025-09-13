'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchUserProgress } from "@/lib/progress"
import { WaitTimeModal } from "@/components/WaitTimeModal"

export default function Module2() {
  const moduleId = 2
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
    const product = 'RemoteReadyBootcamp'
    
    // Update progress to module 3 (completing module 2)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module 2 - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module 2</div>
                <h1 className="text-3xl font-bold text-white">THE ENGINE PHASE</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Finding Your Profitable Problem</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              {/* Welcome Back */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back.</h2>
              </div>
              
              <div className="mb-8">
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  If you are watching this, it means you did the work. You completed the assignment from Module 1. You took the time to disconnect from the noise, look inward, and engineer the identity of the person you are becoming.
                </p>
                
                <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-6 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    I want you to pause for a second and acknowledge that. That single act of writing things down and sending that email puts you in a very small minority of people who say they want change and then actually take the first step.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold text-center">
                    That document you created is not just an assignment. It is the North Star for everything we do from this point forward. It is your constitution.
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  In Module 1, we did the internal work. Now, in Module 2, we start the external work. We begin to build the engine.
                </p>
              </div>

              {/* The Wrong Approach */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6 mb-8 border border-red-500/30">
                <p className="text-slate-300 leading-relaxed mb-4">
                  This is where most people go wrong. They get excited and immediately ask, "What product should I build? What should I sell?" They start brainstorming names, buying domain names, designing logos.
                </p>
                
                <div className="bg-red-900/20 rounded-lg p-4 mb-4 border border-red-500/30">
                  <p className="text-red-400 font-semibold text-lg mb-2">
                    This is like trying to pick out the furniture for a house you have not even found the land for yet. It is a fatal mistake.
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  The correct starting question, the only question that matters right now is this:
                </p>
                
                <div className="text-center p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-500/30">
                  <p className="text-white font-bold text-2xl mb-2">
                    What painful, expensive problem can I solve for a specific group of people?
                  </p>
                  <p className="text-emerald-400 font-semibold">
                    That is it. That is the entire game. A business is just a solution to a problem. No problem, no business.
                  </p>
                </div>
              </div>

              {/* The Passion Trap */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-2xl font-bold text-white">The Passion Trap</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  You have probably heard the advice, "Follow your passion." It sounds wonderful. It makes for great graduation speeches. <strong className="text-red-400">As a business strategy, it is often terrible advice.</strong>
                </p>
                
                <div className="bg-slate-700/30 rounded-lg p-6 mb-6">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    My passion might be 17th century Italian poetry. That does not mean there is a line of people waiting to give me money for it. Chasing a passion can lead you down a long, lonely road of building something nobody wants.
                  </p>
                  
                  <p className="text-emerald-400 font-semibold">
                    We are not going to follow passion. We are going to follow the problem.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg p-6 mb-6 border-l-4 border-emerald-400">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    A profitable business does not exist because the founder is passionate. It exists because it alleviates a real, tangible pain for a specific group of people. Your job as an entrepreneur is not to be a passionate artist.
                  </p>
                  
                  <p className="text-emerald-400 font-bold text-lg">
                    It is to be a well paid doctor. You diagnose the pain, you prescribe the solution, and you get paid for making the pain go away.
                  </p>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    The good news is, you do not have to look far to find these problems. The even better news is that your life, your skills, and the very identity document you just created are the map to finding a problem you are uniquely qualified to solve.
                  </p>
                </div>
              </div>

              {/* Three Circles Framework */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-2xl font-bold text-white">The Three Circles of a Profitable Idea</h3>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-6 mb-6 text-center">
                  <div className="text-4xl mb-4">⭕⭕⭕</div>
                  <p className="text-slate-300 mb-4">
                    <em>(Visual graphic: Three overlapping circles labeled "Your Unfair Advantage," "A Specific Audience," and "A Painful Problem." The overlapping center is highlighted and labeled "Your Profitable Idea.")</em>
                  </p>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  Forget about brainstorming random ideas. We are going to find your business idea at the intersection of three specific domains. This is your new framework.
                </p>
                
                <div className="space-y-6">
                  {/* Circle 1 */}
                  <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-6 border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">Circle 1: Your Unfair Advantage</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the "You" circle. Most people ignore this. They look outside themselves for ideas, when their greatest strengths are internal.
                    </p>
                    
                    <p className="text-slate-300 leading-relaxed mb-4">
                      I want you to open up that "Future Self" document you wrote. Look at the skills you have, the experiences you have been through, the things you have overcome, and the skills you want to build.
                    </p>
                    
                    <div className="bg-blue-900/20 rounded-lg p-4 mb-4">
                      <div className="space-y-2 text-sm">
                        <div className="text-blue-300">• Did you successfully navigate a complex visa process? <span className="text-slate-300">That is experience.</span></div>
                        <div className="text-blue-300">• Are you the friend everyone asks for financial advice? <span className="text-slate-300">That is a skill.</span></div>
                        <div className="text-blue-300">• Did you teach yourself graphic design to build a personal project? <span className="text-slate-300">That is a skill.</span></div>
                        <div className="text-blue-300">• Did you lose 50 pounds and completely change your health? <span className="text-slate-300">That is a deep, personal experience.</span></div>
                      </div>
                    </div>
                    
                    <p className="text-blue-400 font-semibold">
                      Your unfair advantage is the unique combination of skills and life experiences that nobody else has. It is your story. This is not about being the world's leading expert. It is about being one or two chapters ahead of someone else. People will pay for that. They pay for the shortcut. They pay to learn from your mistakes.
                    </p>
                  </div>
                  
                  {/* Circle 2 */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-400 mb-4">Circle 2: A Specific Audience</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the "They" circle. And the key word here is <strong>specific</strong>.
                    </p>
                    
                    <div className="bg-red-900/20 rounded-lg p-4 mb-4 border border-red-500/30">
                      <div className="space-y-2 text-sm">
                        <div className="text-red-400">"Small businesses" is not an audience. It is a galaxy.</div>
                        <div className="text-red-400">"Travelers" is not an audience. It is a vague wish.</div>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed mb-4">
                      A specific audience is one you can clearly picture. You know their hopes, their fears, and where they hang out online.
                    </p>
                    
                    <div className="bg-purple-900/20 rounded-lg p-4 mb-4">
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-red-300">Instead of:</span> <span className="text-slate-400">"Small businesses,"</span>
                          <br />
                          <span className="text-green-300">try:</span> <span className="text-purple-300">"Independent coffee shop owners in the UK struggling to get foot traffic."</span>
                        </div>
                        <div>
                          <span className="text-red-300">Instead of:</span> <span className="text-slate-400">"Travelers,"</span>
                          <br />
                          <span className="text-green-300">try:</span> <span className="text-purple-300">"First time American retirees planning a six month trip to Europe."</span>
                        </div>
                        <div>
                          <span className="text-red-300">Instead of:</span> <span className="text-slate-400">"People who want to be fit,"</span>
                          <br />
                          <span className="text-green-300">try:</span> <span className="text-purple-300">"New dads over 30 who want to lose the baby weight but only have 3 hours a week to exercise."</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-purple-400 font-semibold">
                      See the difference? When you are specific, you know exactly who you are talking to. All of your marketing, your product, your language becomes ten times more effective. The riches are in the niches.
                    </p>
                  </div>
                  
                  {/* Circle 3 */}
                  <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-6 border border-orange-500/30">
                    <h4 className="text-xl font-bold text-orange-400 mb-4">Circle 3: A Painful, Expensive Problem</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is the "It" circle. This is the pain you are going to solve. We are not selling vitamins here. Vitamins are nice to have. When times get tough, you stop buying vitamins.
                    </p>
                    
                    <div className="bg-orange-900/20 rounded-lg p-4 mb-4 border border-orange-500/30">
                      <p className="text-orange-400 font-semibold mb-2">
                        We are selling painkillers. We are selling aspirin, or better yet, prescription grade morphine.
                      </p>
                      <p className="text-slate-300">
                        A painful problem is something that is actively costing your specific audience time, money, or peace of mind.
                      </p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="bg-slate-700/30 rounded p-3">
                        <div className="text-orange-400 font-semibold mb-1">Coffee shop example:</div>
                        <div className="text-slate-300">The coffee shop owner is not just "wanting more customers." The pain is that they are staring at their bank account, worried they will not make rent next month. That is a painful problem.</div>
                      </div>
                      <div className="bg-slate-700/30 rounded p-3">
                        <div className="text-orange-400 font-semibold mb-1">Retiree example:</div>
                        <div className="text-slate-300">The retiree is not just "planning a trip." The pain is the overwhelming fear of booking the wrong trains, getting scammed, and wasting their life savings on a stressful, disappointing trip. That is a painful problem.</div>
                      </div>
                      <div className="bg-slate-700/30 rounded p-3">
                        <div className="text-orange-400 font-semibold mb-1">New dad example:</div>
                        <div className="text-slate-300">The new dad does not just "want to be fit." The pain is looking in the mirror and not recognizing himself, feeling his energy crash every afternoon, and worrying he cannot keep up with his kids. That is a painful problem.</div>
                      </div>
                    </div>
                    
                    <p className="text-orange-400 font-semibold mt-4">
                      When you find a painful problem, you do not have to convince people to buy. They are already looking for a solution. You just have to present them with one.
                    </p>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-emerald-800/50 to-teal-800/50 rounded-lg border border-emerald-500/30 mt-6">
                  <p className="text-emerald-400 font-bold text-xl">
                    Your profitable idea lives in the dead center, where these three circles overlap.
                  </p>
                  <p className="text-slate-300 mt-2">
                    A problem you are uniquely suited to solve, for a specific group of people, that is causing them significant pain.
                  </p>
                </div>
              </div>

              {/* Field Guide to Finding Problems */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔍</span>
                  <h3 className="text-2xl font-bold text-white">A Field Guide to Finding Problems</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  So, how do you find these problems in the wild? You become a digital anthropologist. You learn to listen. Here are three practical methods you can use today.
                </p>
                
                <div className="space-y-6">
                  {/* Method 1 */}
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-emerald-400 mb-4">1. Mine Your Own Life</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      What problems have you solved for yourself? What have you paid money for to solve a problem? What have you spent more than 20 hours learning how to do on your own?
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Maybe you figured out how to create an amazing portfolio to land freelance work. Or you found a system for managing your personal finances. Your own past struggles are a gold mine of ideas. You are your own first case study.
                    </p>
                  </div>
                  
                  {/* Method 2 */}
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-emerald-400 mb-4">2. Go Where They Complain</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      The internet is the world's largest collection of unsolved problems. You just need to know where to look.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-600/30 rounded p-4">
                        <div className="text-orange-400 font-semibold mb-2">Reddit:</div>
                        <div className="text-slate-300 text-sm">Find subreddits for your target audience. If your audience is freelance writers, go to r/freelanceWriters. Look for posts titled "How do I...?", "I'm so frustrated with...", "Can anyone recommend a tool for...". These are raw, unfiltered cries for help.</div>
                      </div>
                      
                      <div className="bg-slate-600/30 rounded p-4">
                        <div className="text-blue-400 font-semibold mb-2">Facebook Groups:</div>
                        <div className="text-slate-300 text-sm">Join groups for your specific audience. Plumbers, digital nomads, miniature painters, they all have groups. The rule is to listen, not to sell. Observe the questions that get asked over and over again. That is your market research.</div>
                      </div>
                      
                      <div className="bg-slate-600/30 rounded p-4">
                        <div className="text-purple-400 font-semibold mb-2">Amazon Reviews:</div>
                        <div className="text-slate-300 text-sm">Look up books or products related to an area of interest. Ignore the 5 star and 1 star reviews. Go straight to the 3 star reviews. This is where you find the sentence, "It was a good book, but I just wish it had shown me exactly how to..." That is a problem, and a gap in the market.</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Method 3 */}
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-emerald-400 mb-4">3. Use the "5 Whys" Technique</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      This is a simple but powerful method to get to the root of a problem. You see a surface level desire, and you ask "why" five times to uncover the real pain underneath.
                    </p>
                    
                    <div className="bg-slate-600/30 rounded p-4 mb-4">
                      <div className="text-yellow-400 font-semibold mb-3">Example: "How do I find a good web designer?"</div>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-blue-400">Why do you need a web designer?</span> <span className="text-slate-300">"To build a website for my new coaching business."</span></div>
                        <div><span className="text-blue-400">Why do you need a website?</span> <span className="text-slate-300">"To look professional and get clients."</span></div>
                        <div><span className="text-blue-400">Why do you need to get clients this way?</span> <span className="text-slate-300">"Because I don't know how else to find them."</span></div>
                        <div><span className="text-blue-400">Why is finding clients a problem for you?</span> <span className="text-slate-300">"Because I hate selling and I don't know where to start."</span></div>
                        <div><span className="text-blue-400">Why do you hate selling?</span> <span className="text-slate-300">"Because I feel like I'm bothering people and I'm afraid of rejection."</span></div>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-900/20 rounded p-4 border border-emerald-500/30">
                      <p className="text-emerald-400 font-semibold mb-2">Boom.</p>
                      <p className="text-slate-300 text-sm mb-2">The problem is not "I need a website." The real, painful problem is, "I'm a new coach who is terrified of selling and I need a system to attract clients that doesn't feel sleazy."</p>
                      <p className="text-emerald-400 text-sm">You can build an entire, highly profitable business solving that problem. The website is just one small piece of the solution.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-xl p-8 border-2 border-yellow-500/60 mb-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">Your Assignment: The Problem & People Matrix</h3>
                </div>
                
                <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-500/30">
                  <p className="text-slate-300 leading-relaxed">
                    Your identity compass is pointing North. Now we need to draw the first part of the map. Your mission is to identify 3 to 5 potential business ideas that live at the intersection of our three circles.
                  </p>
                </div>
                
                <div className="bg-yellow-800/20 rounded-lg p-6 mb-8 border border-yellow-400/40">
                  <div className="space-y-6">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                        <div className="text-yellow-300 font-semibold">Create Your Matrix</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Open a blank document or a spreadsheet. Create four columns:</p>
                      <div className="ml-11 mt-2 bg-slate-700/50 rounded p-3 font-mono text-sm">
                        <div className="text-yellow-400">Problem | Target Audience | Why It's Painful (The Cost) | My Unfair Advantage</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                        <div className="text-yellow-300 font-semibold">Go on a Hunt</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Using the research methods we just covered, find at least three problems. Go through Reddit, Facebook, and your own life experiences. Be a detective. For each problem, fill out a row in your matrix. Be specific.</p>
                    </div>
                    
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                        <div className="text-yellow-300 font-semibold">Share Your Best Idea</div>
                      </div>
                      <p className="text-slate-300 text-sm ml-11">Once you have your list, pick the ONE idea that feels the most compelling. The one with the most pain, the most specific audience, and the strongest link to your unfair advantage.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-lg p-6 mb-6 border border-amber-400/40">
                  <h5 className="text-lg font-bold text-amber-400 mb-4">Example Format:</h5>
                  
                  <div className="bg-red-900/20 rounded-lg p-4 mb-4 border border-red-500/30">
                    <div className="text-red-400 font-semibold text-sm mb-2">❌ Bad Example:</div>
                    <div className="text-slate-300 text-sm">
                      <strong>Problem:</strong> Marketing. <strong>Audience:</strong> Businesses.
                    </div>
                  </div>
                  
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                    <div className="text-green-400 font-semibold text-sm mb-3">✅ Good Example:</div>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div><strong className="text-green-400">Problem:</strong> Getting the first 10 high paying clients without using paid ads.</div>
                      <div><strong className="text-green-400">Target Audience:</strong> Freelance web developers in their first year of business.</div>
                      <div><strong className="text-green-400">Why It's Painful:</strong> They are spending all their time on low paying platforms like Upwork and are close to giving up and getting a normal job. It's costing them money and their dream.</div>
                      <div><strong className="text-green-400">My Unfair Advantage:</strong> I used a specific cold email and portfolio strategy to land my first three clients who each paid over $5,000.</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-900/20 rounded-lg p-6 border border-emerald-500/30">
                  <h5 className="text-lg font-bold text-emerald-400 mb-4">Post in the WhatsApp Community</h5>
                  
                  <p className="text-slate-300 mb-4">
                    You are going to post your best idea in the private WhatsApp community. Use this exact format:
                  </p>
                  
                  <div className="bg-slate-800/60 rounded-lg p-4 mb-4 border border-emerald-500/30">
                    <div className="text-emerald-400 font-mono text-sm">
                      Idea 1: I will help [Target Audience] solve [The Painful Problem] by leveraging my experience in/skill of [Your Unfair Advantage].
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                    <div className="text-yellow-400 font-semibold text-sm mb-2">Example:</div>
                    <div className="text-slate-300 text-sm italic">
                      "Idea 1: I will help new fathers over 30 solve the problem of losing their fitness and energy by leveraging my experience in creating 45 minute, at-home workouts that can be done while a baby is napping."
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm">
                    Sharing this does two things. First, it makes it real. Second, it allows me and the rest of the community to give you immediate feedback. This is the beginning of the brain trust. Do not be shy. Do not overthink it. Just post.
                  </p>
                </div>
                
                <div className="text-center mt-6 p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
                  <p className="text-yellow-300 font-semibold text-lg mb-2">
                    Your goal is not to find the perfect, final idea.
                  </p>
                  <p className="text-slate-300 mb-3">
                    Your goal is to get a solid hypothesis that we can test. Because in the next module, we are going to do something that terrifies most people, but which will save you months or years of wasted effort.
                  </p>
                  <p className="text-emerald-400 font-bold">
                    We're going to get you paid for your idea... before you even build it.
                  </p>
                </div>
                
                <div className="text-center mt-6">
                  <div className="text-2xl mb-2">🔍</div>
                  <p className="text-yellow-300 font-bold text-xl">
                    The work is in the discovery. Go find your problem.
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
            
            <Link href="/order/product/RemoteReadyBootcamp/module-1">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            
            
            <Link href="/order/product/RemoteReadyBootcamp/module-3">
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