import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/prisma'
import { Session } from 'next-auth'

interface SessionUser {
  email: string;
  id: string;
  name?: string;
}

interface CustomSession extends Session {
  user: SessionUser;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null
    
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
