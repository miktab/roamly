import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

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

    console.log(`Linked ${checkouts.length} checkouts to user ${userId}`)
  } catch (error) {
    console.error('Error linking checkouts to user:', error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      }
    })

    // Link any existing checkouts to this user account
    await linkCheckoutsToUser(user.id, user.email)

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
