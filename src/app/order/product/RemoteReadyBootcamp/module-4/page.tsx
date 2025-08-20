import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Module4() {
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
                <div className="text-emerald-100 text-sm">Module 4</div>
                <h1 className="text-3xl font-bold text-white">MARKET RESEARCH & OPPORTUNITIES</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Discover high-paying remote opportunities in your field</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Module Content</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                Navigate the remote work landscape with strategic market research and opportunity identification. This module teaches you to analyze 
                market demand, identify profitable niches, and understand competitive landscapes. Learn to use job boards, freelancing platforms, 
                and industry reports to gauge market conditions. We'll explore salary trends, growth sectors, and emerging opportunities in the 
                remote economy. You'll discover how to research target clients, understand their pain points, and position yourself as the solution. 
                The module covers both traditional employment and entrepreneurial opportunities, helping you choose the best path for your goals. 
                Research skills developed here will serve you throughout your remote career as markets evolve and new opportunities emerge.
              </p>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{width: "85%"}}></div>
              </div>
              <span className="text-amber-400 font-semibold">85%</span>
            </div>
            <p className="text-slate-400 mt-2">Almost there! Complete this module to unlock the next one.</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link href="/order/product/RemoteReadyBootcamp/module-3">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            <Link href="/order/product/RemoteReadyBootcamp/module-5">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Next Module →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
