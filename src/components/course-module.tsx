import { Lock, CheckCircle, Play, Clock, Video, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Module {
  id: number
  title: string
  subtitle: string
  description: string
  progress: number
  unlocked: boolean
  completed: boolean
  specialIcon?: 'video' | 'group' | 'star'
}

interface CourseModuleProps {
  module: Module
  userProgress?: any
  onProgressUpdate?: (progress: any) => void
  isCurrent?: boolean
}

export function CourseModule({ module, userProgress, onProgressUpdate, isCurrent = false }: CourseModuleProps) {
  const { id, title, subtitle, description, progress, unlocked, completed } = module

  const getModuleLink = () => {
    // Generate the module link based on the module ID
    return `/order/product/RemoteReadyBootcamp/module-${id}`
  }

  const ModuleContent = (
    <div
      className={`relative group transition-all duration-300 ${
        unlocked ? "hover:scale-105 cursor-pointer" : "opacity-60"
      } ${isCurrent ? "shadow-xl shadow-emerald-400/30" : ""}`}
    >
      {/* Module Card */}
      <div
        className={`relative overflow-hidden rounded-xl ${
          unlocked
            ? isCurrent
              ? "bg-gradient-to-br from-emerald-700 to-teal-800 shadow-lg shadow-emerald-400/50"
              : "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50"
            : "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800"
        }`}
      >
        {/* Current Module Badge */}
        {isCurrent && (
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg animate-pulse">
              CURRENT
            </div>
          </div>
        )}

        {/* Lock Overlay for Locked Modules */}
        {!unlocked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-medium">Complete previous modules</p>
            </div>
          </div>
        )}

        {/* Special Icon for Locked Modules */}
        {!unlocked && module.specialIcon && (
          <div className="absolute top-3 left-3 z-20">
            {module.specialIcon === 'video' && (
              <div className="bg-blue-500/80 backdrop-blur-sm text-white p-2 rounded-lg shadow-lg">
                <Video className="w-4 h-4" />
              </div>
            )}
            {module.specialIcon === 'group' && (
              <div className="bg-purple-500/80 backdrop-blur-sm text-white p-2 rounded-lg shadow-lg">
                <Users className="w-4 h-4" />
              </div>
            )}
            {module.specialIcon === 'star' && (
              <div className="bg-yellow-500/80 backdrop-blur-sm text-white p-2 rounded-lg shadow-lg">
                <Star className="w-4 h-4" />
              </div>
            )}
          </div>
        )}

        {/* Module Header */}
        <div className="relative h-32 bg-gradient-to-br from-emerald-600 to-teal-600 p-6 flex flex-col justify-center">
          <div className="absolute top-4 right-4">
            {completed ? (
              <CheckCircle className="w-6 h-6 text-emerald-200" />
            ) : unlocked ? (
              <Play className="w-6 h-6 text-emerald-200" />
            ) : (
              <Clock className="w-6 h-6 text-slate-400" />
            )}
          </div>

          <div className="text-emerald-100 text-sm font-semibold mb-1">
            {id}. {title}
          </div>
          <div className="text-white text-lg font-bold leading-tight">{subtitle}</div>
        </div>

        {/* Module Content */}
        <div className="p-6">
          <h3 className="text-white font-semibold mb-2 text-sm leading-relaxed">{description}</h3>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-xs text-slate-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  completed
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                    : progress > 0
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : "bg-slate-600"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4">
            {unlocked ? (
              <Link href={getModuleLink()}>
                <Button
                  className={`w-full ${
                    completed
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  } text-white font-semibold`}
                >
                  {completed ? "Review Module" : progress > 0 ? "Continue" : "Start Module"}
                </Button>
              </Link>
            ) : (
              <Button disabled className="w-full bg-slate-700 text-slate-400 cursor-not-allowed">
                Locked
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Premium Glow Effect for Unlocked Modules */}
      {unlocked && (
        <div className={`absolute inset-0 rounded-xl ${
          isCurrent 
            ? "bg-gradient-to-r from-emerald-400/30 to-teal-400/30 opacity-75 group-hover:opacity-100" 
            : "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100"
        } transition-opacity duration-300 -z-10 blur-xl`}></div>
      )}
    </div>
  )

  return unlocked ? (
    <Link href={getModuleLink()}>
      {ModuleContent}
    </Link>
  ) : (
    ModuleContent
  )
}
