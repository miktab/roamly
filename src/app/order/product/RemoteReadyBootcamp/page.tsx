'use client'
import { CourseModule } from "@/components/course-module"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from 'react'
import { fetchUserProgress } from '@/lib/progress'

const modules = [
  // Week 1: Foundation & Setup (Days 1-7)
  {
    id: 1,
    title: "START HERE",
    subtitle: "FOUNDATION PHASE",
    description: "Master the remote work mindset and set your success foundation",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 2,
    title: "REMOTE WORK",
    subtitle: "ESSENTIALS",
    description: "Essential tools, workspace setup, and productivity systems",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 3,
    title: "SKILL AUDIT &",
    subtitle: "ASSESSMENT",
    description: "Identify your strengths and marketable skills for remote work",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 4,
    title: "MARKET RESEARCH",
    subtitle: "& OPPORTUNITIES",
    description: "Discover high-paying remote opportunities in your field",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  {
    id: 5,
    title: "PERSONAL BRAND",
    subtitle: "FOUNDATION",
    description: "Build your professional online presence and portfolio",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'group' as const,
  },
  {
    id: 6,
    title: "CHOOSE YOUR",
    subtitle: "NICHE & PRODUCT",
    description: "Select your profitable niche and define your core offering",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 7,
    title: "SERVICE",
    subtitle: "PACKAGING",
    description: "Package your skills into high-value service offerings",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'star' as const,
  },

  // Week 2: Launch & Scale (Days 8-14)
  {
    id: 8,
    title: "PRICING",
    subtitle: "STRATEGIES",
    description: "Master pricing psychology and value-based pricing models",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  {
    id: 9,
    title: "DIGITAL PRODUCT",
    subtitle: "CREATION",
    description: "Create scalable digital products and passive income streams",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 10,
    title: "PORTFOLIO &",
    subtitle: "CASE STUDIES",
    description: "Build compelling portfolios that convert prospects to clients",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'group' as const,
  },
  {
    id: 11,
    title: "WEBSITE &",
    subtitle: "LANDING PAGES",
    description: "Create professional websites that generate leads and sales",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 12,
    title: "PAYMENT &",
    subtitle: "BOOKING SYSTEMS",
    description: "Set up seamless payment processing and client onboarding",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  {
    id: 13,
    title: "EMAIL MARKETING",
    subtitle: "AUTOMATION",
    description: "Build email sequences that nurture leads into paying clients",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 14,
    title: "CRM & CLIENT",
    subtitle: "MANAGEMENT",
    description: "Streamline client relationships and project management",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'star' as const,
  },
]

export default function RemoteReadyBootcamp() {
  const [userProgress, setUserProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProgress() {
      const product = 'RemoteReadyBootcamp'
      
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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Remote Ready Bootcamp</h1>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Transform your skills into a thriving remote business. 14 modules designed to take you from zero to
            profitable remote entrepreneur in just 2 weeks.
          </p>
          <div className="flex items-center justify-center gap-8 text-emerald-100">
            <div className="text-center">
              <div className="text-3xl font-bold">14</div>
              <div className="text-sm">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2</div>
              <div className="text-sm">Weeks</div>
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
              <p className="text-slate-400">You're making incredible progress! Keep going.</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-400">{userProgress?.currentModule || 1}/14</div>
              <div className="text-sm text-slate-400">Current Module</div>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
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
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Unlock Your Remote Success?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Complete the available modules to unlock the next phase of your transformation.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span>Community Support</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span>Expert Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
