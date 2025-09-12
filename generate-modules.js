const fs = require('fs');
const path = require('path');

// Module data from the main course page
const modules = [
  { id: 1, title: "START HERE", subtitle: "FOUNDATION PHASE", description: "Master the remote work mindset and set your success foundation" },
  { id: 2, title: "REMOTE WORK", subtitle: "ESSENTIALS", description: "Essential tools, workspace setup, and productivity systems" },
  { id: 3, title: "SKILL AUDIT &", subtitle: "ASSESSMENT", description: "Identify your strengths and marketable skills for remote work" },
  { id: 4, title: "MARKET RESEARCH", subtitle: "& OPPORTUNITIES", description: "Discover high-paying remote opportunities in your field" },
  { id: 5, title: "PERSONAL BRAND", subtitle: "FOUNDATION", description: "Build your professional online presence and portfolio" },
  { id: 6, title: "CHOOSE YOUR", subtitle: "NICHE & PRODUCT", description: "Select your profitable niche and define your core offering" },
  { id: 7, title: "SERVICE", subtitle: "PACKAGING", description: "Package your skills into high-value service offerings" },
  { id: 8, title: "PRICING", subtitle: "STRATEGIES", description: "Master pricing psychology and value-based pricing models" },
  { id: 9, title: "DIGITAL PRODUCT", subtitle: "CREATION", description: "Create scalable digital products and passive income streams" },
  { id: 10, title: "PORTFOLIO &", subtitle: "CASE STUDIES", description: "Build compelling portfolios that convert prospects to clients" },
  { id: 11, title: "WEBSITE &", subtitle: "LANDING PAGES", description: "Create professional websites that generate leads and sales" },
  { id: 12, title: "PAYMENT &", subtitle: "BOOKING SYSTEMS", description: "Set up seamless payment processing and client onboarding" },
  { id: 13, title: "EMAIL MARKETING", subtitle: "AUTOMATION", description: "Build email sequences that nurture leads into paying clients" },
  { id: 14, title: "CRM & CLIENT", subtitle: "MANAGEMENT", description: "Streamline client relationships and project management" },
  { id: 15, title: "SOCIAL MEDIA", subtitle: "SETUP", description: "Optimize your social profiles for maximum professional impact" },
  { id: 16, title: "CONTENT", subtitle: "MARKETING MASTERY", description: "Create content that positions you as an industry expert" },
  { id: 17, title: "LINKEDIN", subtitle: "LEAD GENERATION", description: "Turn LinkedIn into your personal client acquisition machine" },
  { id: 18, title: "INSTAGRAM", subtitle: "GROWTH & SALES", description: "Build an engaged Instagram following that converts to revenue" },
  { id: 19, title: "TWITTER/X", subtitle: "AUTHORITY BUILDING", description: "Establish thought leadership and attract high-value opportunities" },
  { id: 20, title: "NETWORKING &", subtitle: "PARTNERSHIPS", description: "Build strategic relationships that accelerate your success" },
  { id: 21, title: "SALES FUNNEL", subtitle: "OPTIMIZATION", description: "Create high-converting sales funnels that work 24/7" },
  { id: 22, title: "WEBINAR &", subtitle: "WORKSHOP SALES", description: "Master live selling through webinars and workshops" },
  { id: 23, title: "AFFILIATE &", subtitle: "REFERRAL SYSTEMS", description: "Build systems that turn clients into your sales force" },
  { id: 24, title: "PAID ADVERTISING", subtitle: "MASTERY", description: "Scale your reach with profitable paid advertising campaigns" },
  { id: 25, title: "CONVERSION", subtitle: "OPTIMIZATION", description: "Maximize your conversion rates and revenue per visitor" },
  { id: 26, title: "TEAM BUILDING", subtitle: "& DELEGATION", description: "Scale beyond yourself by building a remote team" },
  { id: 27, title: "SYSTEMS &", subtitle: "AUTOMATION", description: "Automate your business for maximum efficiency and profit" },
  { id: 28, title: "ANALYTICS &", subtitle: "OPTIMIZATION", description: "Use data to continuously improve and scale your business" },
  { id: 29, title: "ADVANCED", subtitle: "GROWTH STRATEGIES", description: "Implement advanced tactics for exponential business growth" },
  { id: 30, title: "MASTERY &", subtitle: "ONGOING SUCCESS", description: "Maintain momentum and continue scaling your remote empire" }
];

function generateModuleTemplate(module) {
  const { id, title, subtitle, description } = module;
  const nextModuleId = id + 1;
  const prevModuleId = id - 1;
  
  return `'use client'
import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { updateUserProgress, fetchUserProgress, generateSessionId } from "@/lib/progress"

export default function Module${id}() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    async function checkProgress() {
      const sessionId = generateSessionId()
      const product = 'RemoteReadyBootcamp'
      const progress = await fetchUserProgress(sessionId, product)
      
      if (progress) {
        // Module ${id} has access if currentModule is >= ${id}
        setHasAccess(progress.currentModule >= ${id})
        // Module ${id} is completed if currentModule is > ${id}
        setIsCompleted(progress.currentModule > ${id})
      }
      setIsLoading(false)
    }
    checkProgress()
  }, [])

  const handleCompleteModule = async () => {
    setIsUpdating(true)
    const sessionId = generateSessionId()
    const product = 'RemoteReadyBootcamp'
    
    // Update progress to module ${nextModuleId} (completing module ${id})
    const updatedProgress = await updateUserProgress(sessionId, product, ${nextModuleId})
    
    if (updatedProgress) {
      setIsCompleted(true)
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
              <h1 className="text-2xl font-bold text-white mb-4">Module ${id} - Locked</h1>
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
                <div className="text-emerald-100 text-sm">Module ${id}</div>
                <h1 className="text-3xl font-bold text-white">${title} ${subtitle}</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">${description}</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Module Content</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                This module focuses on ${description.toLowerCase()}. You'll learn practical strategies, tools, and techniques that successful remote workers use to excel in this area. The content includes step-by-step guides, real-world examples, and actionable frameworks you can implement immediately.
              </p>
              
              <div className="bg-slate-700/30 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">⚡ Key Learning Objectives</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Master the fundamentals of ${description.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Implement proven strategies and best practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Apply practical tools and techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 text-sm mt-1">•</span>
                    <span>Create actionable plans for immediate implementation</span>
                  </li>
                </ul>
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
              {isCompleted ? "Module completed! " + (id === 30 ? 'Congratulations on finishing the course!' : 'You can now access the next module.') : "Complete this module to unlock the next one."}
            </p>
          </div>

          {/* Complete Module Button */}
          {!isCompleted && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-lg p-6 mb-8 border border-emerald-500/30 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">Ready to Continue?</h3>
              <p className="text-slate-300 mb-6">
                Once you've completed the learning objectives above, click the button below to mark this module as complete${id === 30 ? ' and finish the course!' : ' and unlock the next module.'}.
              </p>
              <Button 
                onClick={handleCompleteModule}
                disabled={isUpdating}
                className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-lg"
              >
                {isUpdating ? "Completing..." : "Complete Module " + id + (id === 30 ? ' & Finish Course' : ' →')}
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            ${prevModuleId > 0 ? `
            <Link href="/order/product/RemoteReadyBootcamp/module-${prevModuleId}">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            ` : `
            <Button variant="outline" disabled>
              Previous Module
            </Button>
            `}
            
            <Link href="/order/product/RemoteReadyBootcamp">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Back to Course →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}`;
}

// Create directories and files for all modules
const baseDir = './src/app/order/product/RemoteReadyBootcamp';

modules.forEach(module => {
  const moduleDir = path.join(baseDir, `module-${module.id}`);
  const filePath = path.join(moduleDir, 'page.tsx');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }
  
  // Generate and write the file
  const content = generateModuleTemplate(module);
  fs.writeFileSync(filePath, content);
  
  console.log(`Created: ${filePath}`);
});

console.log('All module pages have been generated!');
