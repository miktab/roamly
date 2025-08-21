"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2", 
    lg: "w-12 h-12 border-4"
  }

  return (
    <div 
      className={cn(
        "border-sky-200 border-t-sky-500 rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
    />
  )
}
