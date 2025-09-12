// Progress utility functions
import { getCurrentUser } from '@/lib/auth'

export async function fetchUserProgress(product: string) {
  try {
    const response = await fetch(`/api/progress?product=${product}`)
    if (!response.ok) throw new Error('Failed to fetch progress')
    const data = await response.json()
    return data.progress
  } catch (error) {
    console.error('Error fetching progress:', error)
    return null
  }
}

export async function updateUserProgress(product: string, currentModule: number) {
  try {
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product,
        currentModule
      })
    })
    if (!response.ok) throw new Error('Failed to update progress')
    const data = await response.json()
    return data.progress
  } catch (error) {
    console.error('Error updating progress:', error)
    return null
  }
}

// No more fake session ID generation - we use real authentication now!
