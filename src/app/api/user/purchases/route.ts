import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the user first
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find purchases directly by userId
    const purchases = await prisma.purchase.findMany({
      where: { userId: user.id },
      orderBy: { purchaseDate: 'desc' }
    })

    return NextResponse.json({ purchases })

  } catch (error) {
    console.error('Error fetching user purchases:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
