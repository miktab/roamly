import { NextRequest, NextResponse } from 'next/server'
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

export async function POST(request: NextRequest) {
  try {
    const { checkoutSessionId } = await request.json()

    if (!checkoutSessionId) {
      return NextResponse.json({ error: 'Checkout session ID is required' }, { status: 400 })
    }

    const session = await getServerSession(authOptions) as CustomSession | null
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'User must be authenticated' }, { status: 401 })
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find the checkout
    const checkout = await prisma.checkout.findUnique({
      where: { checkoutSessionId }
    })

    if (!checkout) {
      return NextResponse.json({ error: 'Checkout not found' }, { status: 404 })
    }

    // Check if purchase already exists (to avoid duplicates)
    const existingPurchase = await prisma.purchase.findUnique({
      where: { checkoutSessionId }
    })

    if (existingPurchase) {
      return NextResponse.json({ 
        message: 'Purchase already exists',
        purchase: existingPurchase 
      })
    }

    // Create the purchase
    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        checkoutSessionId: checkout.checkoutSessionId,
        productCategory: checkout.productCategory || 'product',
        productType: checkout.productType || 'unknown',
        productId: checkout.productId,
        totalOrder: checkout.totalOrder,
        siteName: checkout.siteName,
        productDescription: checkout.product_description,
        purchaseDate: checkout.checkoutTime,
      }
    })

    // Also link the checkout to the user if not already linked
    if (!checkout.userId) {
      await prisma.checkout.update({
        where: { checkoutId: checkout.checkoutId },
        data: { userId: user.id }
      })
    }

    return NextResponse.json({ 
      success: true, 
      purchase,
      message: 'Purchase created successfully' 
    })

  } catch (error) {
    console.error('Error creating purchase:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
