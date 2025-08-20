import { CourseModule } from "@/components/course-module"
import { CheckCircle } from "lucide-react"

const modules = [
  // Week 1: Foundation & Mindset
  {
    id: 1,
    title: "START HERE",
    subtitle: "FOUNDATION PHASE",
    description: "Master the remote work mindset and set your success foundation",
    progress: 100,
    unlocked: true,
    completed: true,
  },
  {
    id: 2,
    title: "REMOTE WORK",
    subtitle: "ESSENTIALS",
    description: "Essential tools, workspace setup, and productivity systems",
    progress: 100,
    unlocked: true,
    completed: true,
  },
  {
    id: 3,
    title: "SKILL AUDIT &",
    subtitle: "ASSESSMENT",
    description: "Identify your strengths and marketable skills for remote work",
    progress: 100,
    unlocked: true,
    completed: true,
  },
  {
    id: 4,
    title: "MARKET RESEARCH",
    subtitle: "& OPPORTUNITIES",
    description: "Discover high-paying remote opportunities in your field",
    progress: 85,
    unlocked: true,
    completed: false,
  },
  {
    id: 5,
    title: "PERSONAL BRAND",
    subtitle: "FOUNDATION",
    description: "Build your professional online presence and portfolio",
    progress: 45,
    unlocked: true,
    completed: false,
  },

  // Week 2: Product & Service Development
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
  },
  {
    id: 8,
    title: "PRICING",
    subtitle: "STRATEGIES",
    description: "Master pricing psychology and value-based pricing models",
    progress: 0,
    unlocked: false,
    completed: false,
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
  },

  // Week 3: Platform Setup & Systems
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
  },
  {
    id: 15,
    title: "SOCIAL MEDIA",
    subtitle: "SETUP",
    description: "Optimize your social profiles for maximum professional impact",
    progress: 0,
    unlocked: false,
    completed: false,
  },

  // Week 4: Marketing & Lead Generation
  {
    id: 16,
    title: "CONTENT",
    subtitle: "MARKETING MASTERY",
    description: "Create content that positions you as an industry expert",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 17,
    title: "LINKEDIN",
    subtitle: "LEAD GENERATION",
    description: "Turn LinkedIn into your personal client acquisition machine",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 18,
    title: "INSTAGRAM",
    subtitle: "GROWTH & SALES",
    description: "Build an engaged Instagram following that converts to revenue",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 19,
    title: "TWITTER/X",
    subtitle: "AUTHORITY BUILDING",
    description: "Establish thought leadership and attract high-value opportunities",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 20,
    title: "NETWORKING &",
    subtitle: "PARTNERSHIPS",
    description: "Build strategic relationships that accelerate your success",
    progress: 0,
    unlocked: false,
    completed: false,
  },

  // Week 5: Advanced Marketing & Sales
  {
    id: 21,
    title: "SALES FUNNEL",
    subtitle: "OPTIMIZATION",
    description: "Create high-converting sales funnels that work 24/7",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 22,
    title: "WEBINAR &",
    subtitle: "WORKSHOP SALES",
    description: "Master live selling through webinars and workshops",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 23,
    title: "AFFILIATE &",
    subtitle: "REFERRAL SYSTEMS",
    description: "Build systems that turn clients into your sales force",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 24,
    title: "PAID ADVERTISING",
    subtitle: "MASTERY",
    description: "Scale your reach with profitable paid advertising campaigns",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 25,
    title: "CONVERSION",
    subtitle: "OPTIMIZATION",
    description: "Maximize your conversion rates and revenue per visitor",
    progress: 0,
    unlocked: false,
    completed: false,
  },

  // Week 6: Scaling & Optimization
  {
    id: 26,
    title: "TEAM BUILDING",
    subtitle: "& DELEGATION",
    description: "Scale beyond yourself by building a remote team",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 27,
    title: "SYSTEMS &",
    subtitle: "AUTOMATION",
    description: "Automate your business for maximum efficiency and profit",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 28,
    title: "ANALYTICS &",
    subtitle: "OPTIMIZATION",
    description: "Use data to continuously improve and scale your business",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 29,
    title: "ADVANCED",
    subtitle: "GROWTH STRATEGIES",
    description: "Implement advanced tactics for exponential business growth",
    progress: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 30,
    title: "MASTERY &",
    subtitle: "ONGOING SUCCESS",
    description: "Maintain momentum and continue scaling your remote empire",
    progress: 0,
    unlocked: false,
    completed: false,
  },
]

export default function RemoteReadyBootcamp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Remote Ready Bootcamp</h1>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Transform your skills into a thriving remote business. 30 modules designed to take you from zero to
            six-figure remote entrepreneur.
          </p>
          <div className="flex items-center justify-center gap-8 text-emerald-100">
            <div className="text-center">
              <div className="text-3xl font-bold">30</div>
              <div className="text-sm">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">6</div>
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
              <div className="text-3xl font-bold text-emerald-400">5/30</div>
              <div className="text-sm text-slate-400">Modules Unlocked</div>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
              style={{ width: "16.67%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <CourseModule key={module.id} module={module} />
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
