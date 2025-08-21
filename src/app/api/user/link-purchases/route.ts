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

async function linkCheckoutsToUser(userId: string, email: string) {
  try {
    // Find all checkouts for this email that aren't linked to a user
    const checkouts = await prisma.checkout.findMany({
      where: {
        email: email,
        userId: null
      }
    })

    // Update checkouts to link them to this user
    for (const checkout of checkouts) {
      await prisma.checkout.update({
        where: { checkoutId: checkout.checkoutId },
        data: { userId: userId }
      })

      // Create a Purchase record for each checkout
      const existingPurchase = await prisma.purchase.findUnique({
        where: { checkoutSessionId: checkout.checkoutSessionId }
      })

      if (!existingPurchase) {
        await prisma.purchase.create({
          data: {
            userId: userId,
            checkoutSessionId: checkout.checkoutSessionId,
            productCategory: checkout.productCategory || 'product', // Default fallback
            productType: checkout.productType || 'unknown',
            productId: checkout.productId,
            totalOrder: checkout.totalOrder,
            siteName: checkout.siteName,
            productDescription: checkout.product_description,
            purchaseDate: checkout.checkoutTime,
          }
        })
      }
    }

    return checkouts.length
  } catch (error) {
    console.error('Error linking checkouts to user:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { checkoutSessionId } = await request.json().catch(() => ({}))

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // If a specific checkout session ID is provided, prioritize that
    let linkedCount = 0
    if (checkoutSessionId) {
      const currentCheckout = await prisma.checkout.findUnique({
        where: { checkoutSessionId }
      })

      if (currentCheckout && !currentCheckout.userId) {
        linkedCount += await linkSingleCheckout(currentCheckout, user.id)
      }
    }

    // Link all other checkouts for this email that aren't linked to any user
    const additionalLinked = await linkCheckoutsToUser(user.id, user.email)
    linkedCount += additionalLinked

    return NextResponse.json({ 
      success: true, 
      linkedCount,
      message: `Linked ${linkedCount} purchase(s) to your account` 
    })

  } catch (error) {
    console.error('Error linking user checkouts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

interface CheckoutData {
  checkoutId: string;
  checkoutSessionId: string;
  productCategory?: string | null;
  productType?: string | null;
  productId: number;
  totalOrder: number;
  siteName: string;
  product_description?: string | null;
  checkoutTime: Date | string;
  [key: string]: unknown;
}

async function linkSingleCheckout(checkout: CheckoutData, userId: string): Promise<number> {
  try {
    // Update checkout to link it to this user
    await prisma.checkout.update({
      where: { checkoutId: checkout.checkoutId },
      data: { userId: userId }
    })

    // Create a Purchase record if it doesn't exist
    const existingPurchase = await prisma.purchase.findUnique({
      where: { checkoutSessionId: checkout.checkoutSessionId }
    })

    if (!existingPurchase) {
      await prisma.purchase.create({
        data: {
          userId: userId,
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
      return 1
    }
    return 0
  } catch (error) {
    console.error('Error linking single checkout:', error)
    return 0
  }
}
