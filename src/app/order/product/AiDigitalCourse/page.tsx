'use client'
import { CourseModule } from "@/components/course-module"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from 'react'
import { fetchUserProgress } from '@/lib/progress'

const modules = [
  // Phase 1: Foundation & Strategy (Modules 1-4)
  {
    id: 1,
    title: "THE AI REVOLUTION",
    subtitle: "FOUNDATION",
    description: "Understanding the AI economy and the reliable passive income mindset",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 2,
    title: "NICHE DISCOVERY",
    subtitle: "WITH AI",
    description: "Use AI market research tools to find profitable, low-competition niches",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 3,
    title: "THE AUTOMATION",
    subtitle: "STACK",
    description: "Setting up your essential toolkit: ChatGPT, Midjourney, and Automations",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 4,
    title: "PRODUCT IDEATION",
    subtitle: "& VALIDATION",
    description: "Generate winning digital product ideas and validate them instantly",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  
  // Phase 2: Creation (Modules 5-7)
  {
    id: 5,
    title: "AI CONTENT",
    subtitle: "GENERATION",
    description: "Create eBooks, guides, and courses in minutes using advanced prompting",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'group' as const,
  },
  {
    id: 6,
    title: "VISUAL ASSETS",
    subtitle: "& BRANDING",
    description: "Design professional logos, mockups, and product art without a designer",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 7,
    title: "PACKAGING",
    subtitle: "THE OFFER",
    description: "Bundle your AI-generated assets into high-value irresistible offers",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'star' as const,
  },

  // Phase 3: Launch & Scale (Modules 8-10)
  {
    id: 8,
    title: "STOREFRONT",
    subtitle: "SETUP",
    description: "Launch high-converting landing pages and payment gateways in one day",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 9,
    title: "TRAFFIC",
    subtitle: "AUTOMATION",
    description: "Automate social media content and drive organic traffic to your store",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  {
    id: 10,
    title: "SCALE &",
    subtitle: "OUTSOURCE",
    description: "Building autonomous AI agents to run operations while you sleep",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'star' as const,
  },
]

export default function AiDigitalCourse() {
  const [userProgress, setUserProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProgress() {
      // Updated product key
      const product = 'AiDigitalCourse'
      
      const progress = await fetchUserProgress(product)
      setUserProgress(progress)
      setLoading(false)
    }

    loadProgress()
    
    // Refresh progress when user navigates back to the course
    const handleFocus = () => {
      loadProgress()
    }
    
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Update modules based on user progress
  const updatedModules = modules.map((module) => {
    if (!userProgress) {
      // For new users, only module 1 is unlocked
      return {
        ...module,
        unlocked: module.id === 1,
        completed: false,
        progress: 0
      }
    }

    const isUnlocked = module.id <= userProgress.currentModule
    const isCompleted = module.id < userProgress.currentModule
    
    return {
      ...module,
      unlocked: isUnlocked,
      completed: isCompleted,
      progress: isCompleted ? 100 : (module.id === userProgress.currentModule ? 50 : 0)
    }
  })

  const completedCount = userProgress ? userProgress.currentModule - 1 : 0
  const progressPercentage = (completedCount / modules.length) * 100

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your progress...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Start Your AI Business for Passive Income</h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Blueprint for launching your AI-powered online business. This digital course takes you through proven 
            frameworks to automate income streams, create AI-based products, and build your business.
          </p>
          <div className="flex items-center justify-center gap-8 text-indigo-100">
            <div className="text-center">
              <div className="text-3xl font-bold">10</div>
              <div className="text-sm">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10</div>
              <div className="text-sm">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">∞</div>
              <div className="text-sm">Potential</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="px-6 py-8 bg-slate-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Progress</h2>
              <p className="text-slate-400">You're building your future asset. Keep going.</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-400">{userProgress?.currentModule || 1}/10</div>
              <div className="text-sm text-slate-400">Current Module</div>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedModules.map((module) => (
              <CourseModule 
                key={module.id} 
                module={module} 
                userProgress={userProgress}
                onProgressUpdate={setUserProgress}
                isCurrent={userProgress && module.id === userProgress.currentModule}
                productName="AiDigitalCourse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Automate Your Income?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Complete the available modules to unlock the next phase of your AI business launch.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <CheckCircle className="w-5 h-5" />
              <span>Launch Blueprint</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400">
              <CheckCircle className="w-5 h-5" />
              <span>Prompt Library</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400">
              <CheckCircle className="w-5 h-5" />
              <span>Community Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}