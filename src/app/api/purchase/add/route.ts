import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { checkoutSessionId } = await request.json()

    if (!checkoutSessionId) {
      return NextResponse.json({ error: "Missing checkoutSessionId" }, { status: 400 })
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if purchase already exists for this user and checkout session
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_checkoutSessionId: {
          userId: user.id,
          checkoutSessionId: checkoutSessionId
        }
      }
    })

    if (existingPurchase) {
      return NextResponse.json({ 
        message: "Purchase already exists",
        purchase: existingPurchase 
      })
    }

    // Get checkout details
    const checkout = await prisma.checkout.findUnique({
      where: { checkoutSessionId }
    })

    if (!checkout) {
      return NextResponse.json({ error: "Checkout not found" }, { status: 404 })
    }

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        checkoutSessionId: checkout.checkoutSessionId,
        productType: checkout.productType,
        productId: checkout.productId,
        totalOrder: checkout.totalOrder,
        siteName: checkout.siteName,
        productDescription: checkout.product_description,
      }
    })

    return NextResponse.json({ 
      message: "Purchase added successfully",
      purchase 
    })

  } catch (error) {
    console.error("Error adding purchase:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
