import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// Configurable wait time in hours (24 hours by default)
const WAIT_TIME_HOURS = 24

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { product, currentModule } = body

    if (!product || !currentModule) {
      return NextResponse.json(
        { error: 'Product and current module are required' },
        { status: 400 }
      )
    }

    // Get current progress to check wait time
    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_product: {
          userId: user.id,
          product
        }
      }
    })

    // Check if user needs to wait (apply to all modules after completion of any module)
    if (existingProgress && existingProgress.lastCompletedAt) {
      const now = new Date()
      const lastCompleted = new Date(existingProgress.lastCompletedAt)
      const timeDifferenceHours = (now.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60)

      if (timeDifferenceHours < WAIT_TIME_HOURS) {
        const waitTimeRemaining = WAIT_TIME_HOURS - timeDifferenceHours
        const hoursRemaining = Math.floor(waitTimeRemaining)
        const minutesRemaining = Math.floor((waitTimeRemaining - hoursRemaining) * 60)
        
        return NextResponse.json({
          error: 'WAIT_TIME_NOT_ELAPSED',
          message: 'Please complete the assignment in your current module before moving to the next',
          waitTime: {
            hours: hoursRemaining,
            minutes: minutesRemaining,
            totalMinutes: Math.ceil(waitTimeRemaining * 60)
          },
          canCompleteAt: new Date(lastCompleted.getTime() + (WAIT_TIME_HOURS * 60 * 60 * 1000))
        }, { status: 429 })
      }
    }

    const progress = await prisma.progress.upsert({
      where: {
        userId_product: {
          userId: user.id,
          product
        }
      },
      update: {
        currentModule,
        updatedAt: new Date(),
        lastCompletedAt: new Date()
      },
      create: {
        userId: user.id,
        product,
        currentModule,
        lastCompletedAt: new Date()
      }
    })

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
