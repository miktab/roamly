'use client'
import { CourseModule } from "@/components/course-module"
import { CheckCircle, Zap, Video, Calendar, DollarSign } from "lucide-react"
import { useEffect, useState } from 'react'
import { fetchUserProgress } from '@/lib/progress'

const modules = [
  // WEEK 1: FOUNDATION & TOOLS
  {
    id: 1,
    title: "THE BLUEPRINT",
    subtitle: "FOUNDATION PHASE",
    description: "Understanding the faceless content model and setting 30-day goals.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 2,
    title: "NICHE",
    subtitle: "DOWSING",
    description: "Using AI specifically to identify high-CPM, low-competition niches.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 3,
    title: "THE AI",
    subtitle: "TOOL STACK",
    description: "Setting up ChatGPT, Midjourney, and voice synthesis accounts.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 4,
    title: "BRAND",
    subtitle: "IDENTITY",
    description: "Generating your channel name, logo, and aesthetic using AI art tools.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 5,
    title: "ALGORITHM",
    subtitle: "DECODED",
    description: "How Short-form algorithms work and how to engineer viral hooks.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 6,
    title: "CONTENT",
    subtitle: "STRATEGY",
    description: "Building a content calendar that balances trends with evergreen topics.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 7,
    title: "PLATFORM",
    subtitle: "OPTIMIZATION",
    description: "Setting up TikTok, IG Reels, and YT Shorts for maximum reach.",
    progress: 0,
    unlocked: false,
    completed: false,
  },

  // WEEK 2: CREATION WORKFLOWS
  {
    id: 8,
    title: "VIRAL",
    subtitle: "SCRIPTING",
    description: "Prompt engineering to get ChatGPT to write high-retention scripts.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 9,
    title: "AI VOICE",
    subtitle: "MASTERY",
    description: "Cloning voices and generating human-sounding narration.",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  {
    id: 10,
    title: "VISUAL",
    subtitle: "GENERATION",
    description: "Advanced Midjourney/DALL-E prompts for consistent video assets.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 11,
    title: "EDITING",
    subtitle: "BASICS",
    description: "CapCut fundamentals for assembling AI assets into fluid video.",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  {
    id: 12,
    title: "AUTO",
    subtitle: "CAPTIONS",
    description: "Creating engaging, dynamic captions that keep viewers watching.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 13,
    title: "SOUND",
    subtitle: "DESIGN",
    description: "Finding trending audio and mixing music with AI voiceovers.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 14,
    title: "PUBLISH",
    subtitle: "FIRST VIDEO",
    description: "The checklist for posting your first piece of AI-generated content.",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'star' as const,
  },

  // WEEK 3: AUTOMATION & SCALING
  {
    id: 15,
    title: "DATA &",
    subtitle: "ANALYTICS",
    description: "Reading your Day 14 metrics to understand retention drops.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 16,
    title: "BATCH",
    subtitle: "CREATION",
    description: "Workflows to create 5 scripts and 5 voiceovers in 30 minutes.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 17,
    title: "VIDEO",
    subtitle: "TEMPLATES",
    description: "Creating reusable editing templates to speed up production 10x.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 18,
    title: "SEO &",
    subtitle: "DISCOVERY",
    description: "Writing descriptions and hashtags using AI for search rankings.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 19,
    title: "COMMUNITY",
    subtitle: "BUILDING",
    description: "Automating comment replies and building a loyal fan base.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 20,
    title: "REPURPOSING",
    subtitle: "ENGINE",
    description: "Turning one script into a blog, a tweet, and a carousel automatically.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 21,
    title: "ADVANCED",
    subtitle: "HOOKS",
    description: "Psychological triggers to stop the scroll in the first 3 seconds.",
    progress: 0,
    unlocked: false,
    completed: false,
  },

  // WEEK 4: MONETIZATION & EMPIRE
  {
    id: 22,
    title: "AFFILIATE",
    subtitle: "MARKETING",
    description: "Finding products that align with your niche for seamless promotion.",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'star' as const,
  },
  {
    id: 23,
    title: "DIGITAL",
    subtitle: "PRODUCTS",
    description: "Using AI to write smaller guides or ebooks to sell to your audience.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 24,
    title: "LINK IN",
    subtitle: "BIO",
    description: "Optimizing your funnel to convert viewers into subscribers/buyers.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 25,
    title: "SPONSORSHIP",
    subtitle: "READY",
    description: "Creating a media kit and preparing for brand deals.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 26,
    title: "EMAIL",
    subtitle: "LIST",
    description: "Capturing data so you aren't reliant solely on social algorithms.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 27,
    title: "OUTSOURCING",
    subtitle: "SOPs",
    description: "Documenting your process to hire editors as you scale.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 28,
    title: "LONG FORM",
    subtitle: "AI VIDEO",
    description: "Introduction to creating 8+ minute videos for YouTube monetization.",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'video' as const,
  },
  {
    id: 29,
    title: "MULTI-CHANNEL",
    subtitle: "EMPIRE",
    description: "Synchronizing your brand across all major platforms.",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 30,
    title: "THE 90 DAY",
    subtitle: "PLAN",
    description: "Final assessment and roadmap for the next 3 months of growth.",
    progress: 0,
    unlocked: false,
    completed: false,
    specialIcon: 'star' as const,
  },
]

export default function AiContentChallenge() {
  const [userProgress, setUserProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProgress() {
      // Updated product ID
      const product = 'AiContentChallenge'
      
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

  // Calculations adapted for 30 modules
  const completedCount = userProgress ? userProgress.currentModule - 1 : 0
  const progressPercentage = (completedCount / modules.length) * 100

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading your challenge data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-16">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-white mb-4">30 Day AI Content Challenge</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Build a Content Empire Without Being on Camera. This digital challenge walks you step-by-step through tools, techniques, and strategies to build a content brand and monetize using AI automation.
          </p>
          <div className="flex items-center justify-center gap-8 text-blue-50">
            <div className="text-center">
              <div className="text-3xl font-bold">30</div>
              <div className="text-sm opacity-80">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm opacity-80">Weeks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">∞</div>
              <div className="text-sm opacity-80">Potential</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="px-6 py-8 bg-slate-900/50 border-b border-indigo-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Challenge Progress</h2>
              <p className="text-slate-400">Consistency is key. Keep the momentum going!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-400">{userProgress?.currentModule || 1}/30</div>
              <div className="text-sm text-slate-400">Day Completed</div>
            </div>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
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
                productName="AiContentChallenge"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-16 bg-gradient-to-r from-slate-900 to-indigo-950 border-t border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Master AI Video Creation</h3>
          <p className="text-xl text-slate-300 mb-8">
            Complete the daily modules to unlock the next phase of your content empire.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-indigo-400">
              <CheckCircle className="w-5 h-5" />
              <span>30-Day Guided Plan</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400">
              <Video className="w-5 h-5" />
              <span>Video Editing Mastery</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400">
              <DollarSign className="w-5 h-5" />
              <span>Monetization Tactics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}