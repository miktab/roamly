import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSiteName(domain: string): string {
  if (domain.includes('localhost')) {
    return 'local'
  }
  return domain.split('.')[0] || 'roamly'
}

export function getExperimentFromRequest(request: Request): string {
  // Simple implementation - you can enhance this based on your needs
  return 'default'
}
