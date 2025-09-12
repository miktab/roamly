import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const product = searchParams.get('product')

    if (!product) {
      return NextResponse.json(
        { error: 'Product is required' },
        { status: 400 }
      )
    }

    let progress = await prisma.progress.findUnique({
      where: {
        userId_product: {
          userId: user.id,
          product
        }
      }
    })

    // If no progress exists, create initial progress
    if (!progress) {
      progress = await prisma.progress.create({
        data: {
          userId: user.id,
          product,
          currentModule: 1,
          lastCompletedAt: new Date() // Set completion time for module access pacing
        }
      })
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
