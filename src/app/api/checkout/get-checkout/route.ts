import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const checkoutSessionId = searchParams.get('checkoutSessionId')

    if (!checkoutSessionId) {
      return NextResponse.json({ error: 'Checkout session ID is required' }, { status: 400 })
    }

    const checkout = await prisma.checkout.findUnique({
      where: {
        checkoutSessionId: checkoutSessionId,
      },
    })

    if (!checkout) {
      return NextResponse.json({ error: 'Checkout not found' }, { status: 404 })
    }

    return NextResponse.json(checkout)

  } catch (error) {
    console.error('Error fetching checkout:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
