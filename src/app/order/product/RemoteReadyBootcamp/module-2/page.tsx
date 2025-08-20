import Link from "next/link"
import { CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Module2() {
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
                <h1 className="text-3xl font-bold text-white">REMOTE WORK ESSENTIALS</h1>
              </div>
            </div>
            <p className="text-emerald-100 text-lg">Essential tools, workspace setup, and productivity systems</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Module Content</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                Transform your workspace into a productivity powerhouse with essential remote work tools and systems. This module covers workspace 
                ergonomics, technology requirements, and software solutions that enhance efficiency. Learn about communication platforms, project 
                management tools, time tracking applications, and cloud storage solutions. We'll explore both free and premium options to fit any 
                budget. You'll discover how to create boundaries between work and personal life, establish productive routines, and maintain focus 
                in a home environment. The module includes practical setup guides, tool comparisons, and workflow optimization strategies that 
                successful remote workers use daily.
              </p>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full w-full"></div>
              </div>
              <span className="text-emerald-400 font-semibold">100%</span>
            </div>
            <p className="text-slate-400 mt-2">Module completed! You can now access Module 3.</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link href="/order/product/RemoteReadyBootcamp/module-1">
              <Button variant="outline">
                ← Previous Module
              </Button>
            </Link>
            <Link href="/order/product/RemoteReadyBootcamp/module-3">
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
