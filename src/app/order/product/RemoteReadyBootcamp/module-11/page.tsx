import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Module11() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Link href="/order/product/RemoteReadyBootcamp" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
            ← Back to Course
          </Link>
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg p-8 mb-8 opacity-60">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <div className="text-slate-300 text-sm">Module 11</div>
                <h1 className="text-3xl font-bold text-slate-300">WEBSITE & LANDING PAGES</h1>
              </div>
            </div>
            <p className="text-slate-300 text-lg">Create professional websites that generate leads and sales</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-600">
            <div className="text-center">
              <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Module Locked</h2>
              <p className="text-slate-400 mb-6">Complete previous modules to unlock this content.</p>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-300 text-sm">
                  <strong>Preview:</strong> Build professional websites and high-converting landing pages that work 24/7 
                  to generate leads and sales. Learn website architecture, user experience design principles, and 
                  conversion optimization techniques. Master the creation of landing pages for specific offers, 
                  lead magnets, and service packages that maximize conversion rates and client acquisition.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Link href="/order/product/RemoteReadyBootcamp/module-10">
              <Button variant="outline">← Previous Module</Button>
            </Link>
            <Link href="/order/product/RemoteReadyBootcamp/module-12">
              <Button disabled className="bg-slate-600 opacity-50 cursor-not-allowed">
                <Lock className="w-4 h-4 mr-2" />Next Module
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
