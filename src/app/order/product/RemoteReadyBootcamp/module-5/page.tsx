import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Module5() {
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
                <div className="w-6 h-6 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="text-emerald-100 text-sm">Module 5</div>
                <h1 className="text-3xl font-bold text-white">PERSONAL BRAND FOUNDATION</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Build your professional online presence and portfolio</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Module Content</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                Establish a compelling personal brand that attracts opportunities and commands premium rates. This module covers brand strategy, 
                visual identity, and messaging consistency across platforms. Learn to craft your unique value proposition, develop a professional 
                narrative, and create content that showcases expertise. We'll explore personal branding psychology, audience research, and 
                competitive positioning. You'll discover how to build trust through authenticity while maintaining professionalism. The module 
                includes practical exercises for brand voice development, visual asset creation, and brand guideline establishment. Understanding 
                personal branding is essential for standing out in competitive remote markets. Your brand becomes your most valuable business asset, 
                opening doors to better opportunities and higher-paying clients.
              </p>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{width: "45%"}}></div>
              </div>
              <span className="text-amber-400 font-semibold">45%</span>
            </div>
            <p className="text-slate-400 mt-2">In progress. Complete this module to unlock the next one.</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link href="/order/product/RemoteReadyBootcamp/module-4">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            <Button disabled className="bg-slate-600 opacity-50 cursor-not-allowed">
              <Lock className="w-4 h-4 mr-2" />
              Next Module
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
