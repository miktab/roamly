import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Clock } from "lucide-react"

interface WaitTimeModalProps {
  isOpen: boolean
  onClose: () => void
  waitTime: {
    hours: number
    minutes: number
    totalMinutes: number
  }
  canCompleteAt: Date
}

export function WaitTimeModal({ isOpen, onClose, waitTime, canCompleteAt }: WaitTimeModalProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-slate-800 border border-slate-700 text-white max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-white">
            Please Complete Your Assignment
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300 text-base leading-relaxed">
            To ensure proper learning and retention, please complete the assignment in your current module before moving to the next one.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="bg-slate-700/50 rounded-lg p-4 my-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400 mb-2">
              {waitTime.hours > 0 ? `${waitTime.hours}h ${waitTime.minutes}m` : `${waitTime.minutes}m`}
            </div>
            <div className="text-sm text-slate-400">
              Time remaining
            </div>
            <div className="text-sm text-slate-300 mt-2">
              Available at: {formatTime(canCompleteAt)}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-slate-400 text-center mb-4">
          This helps ensure you get the most out of each module and don't rush through the content.
        </div>
        
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 w-full"
          >
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
