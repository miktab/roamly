"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowRight, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CheckoutAuthFlow from "@/components/CheckoutAuthFlow"

interface Checkout {
  checkoutId: string
  checkoutSessionId: string
  totalOrder: number
  siteName: string
  email: string
  customerId: string
  productCategory: string
  productType: string
  productId: number
  confirmationEmailSent: boolean
  product_description?: string | null
  checkoutTime: Date
}

async function getCheckout(checkoutSessionId: string): Promise<Checkout | null> {
  try {
    const response = await fetch(`/api/checkout/get-checkout?checkoutSessionId=${checkoutSessionId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching checkout:', error)
    return null
  }
}

async function createPurchaseForUser(checkoutSessionId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/purchase/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkoutSessionId
      })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Purchase created successfully:', data)
      return true
    } else {
      const error = await response.json()
      console.error('Failed to create purchase:', error)
      return false
    }
  } catch (error) {
    console.error('Error creating purchase:', error)
    return false
  }
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [checkout, setCheckout] = useState<Checkout | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAuthFlow, setShowAuthFlow] = useState(false)

  const checkoutSessionId = searchParams.get("checkoutSessionId")
  const email = searchParams.get("email")

  useEffect(() => {
    if (checkoutSessionId) {
      getCheckout(checkoutSessionId)
        .then(setCheckout)
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [checkoutSessionId])

  useEffect(() => {
    // If user is already signed in, create purchase and redirect to dashboard
    if (status === "authenticated" && checkoutSessionId) {
      console.log('User authenticated, creating purchase for checkout:', checkoutSessionId)
      createPurchaseForUser(checkoutSessionId).then((success) => {
        if (success) {
          console.log('Purchase created for authenticated user, redirecting to dashboard')
        } else {
          console.log('Purchase creation failed or already exists, redirecting to dashboard anyway')
        }
        // Redirect to dashboard regardless
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      })
    }
    // If not authenticated and we have checkout data, show auth flow
    else if (status === "unauthenticated" && checkout && checkoutSessionId) {
      console.log('User not authenticated, showing auth flow')
      setShowAuthFlow(true)
    }
  }, [status, checkout, router, checkoutSessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your confirmation...</p>
        </div>
      </div>
    )
  }

  if (!checkoutSessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <CardTitle className="text-gray-900">Invalid Request</CardTitle>
            <CardDescription>No checkout session found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push("/")} 
              className="w-full"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showAuthFlow && checkoutSessionId) {
    return <CheckoutAuthFlow checkoutSessionId={checkoutSessionId} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-gray-900">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {checkout && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Product:</span> {checkout.product_description}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Amount:</span> ${(checkout.totalOrder / 100).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {checkout.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Order ID:</span> {checkout.checkoutId}
              </p>
            </div>
          )}
          
          <div className="pt-4 space-y-3">
            <Button 
              onClick={() => setShowAuthFlow(true)}
              className="w-full"
            >
              <User className="w-4 h-4 mr-2" />
              Create Account / Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Continue as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}

export default CheckoutSuccessPage
