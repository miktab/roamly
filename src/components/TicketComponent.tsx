"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, User, Mail, Calendar, CheckCircle, CreditCard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Event } from "@/types/event"

interface TicketComponentProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

const QuantityControl: React.FC<{
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}> = ({ quantity, onIncrease, onDecrease }) => (
  <div className="flex items-center bg-sky-50 rounded-xl border border-sky-200">
    <button onClick={onDecrease} className="px-4 py-2 text-sky-600 hover:bg-sky-100 rounded-l-xl font-bold transition-colors" disabled={quantity === 0}>
      −
    </button>
    <span className="px-6 py-2 bg-white font-bold text-sky-600 border-x border-sky-200">{quantity}</span>
    <button onClick={onIncrease} className="px-4 py-2 text-sky-600 hover:bg-sky-100 rounded-r-xl font-bold transition-colors">
      +
    </button>
  </div>
)

const formatEventDateTime = (gmtDatetime: string) => {
  const date = new Date(gmtDatetime)
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const dateOnly = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: userTimezone,
  }).format(date)

  const timeOnly = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: userTimezone,
    timeZoneName: "short",
  }).format(date)

  return { dateOnly, timeOnly }
}

export default function TicketComponent({ event, isOpen, onClose }: TicketComponentProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentCity, setCurrentCity] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Helper function to get current price (uses event.price)
  const getCurrentPrice = () => {
    // Check if event is sold out
    if (event.soldOut) {
      return -1 // Sold out indicator
    }
    
    // Return the event price (already in cents)
    return event.price
  }

  useEffect(() => {
    // Initialize basic tracking without external dependencies
    if (typeof window !== "undefined") {
      console.log("TicketComponent: Component initialized")
    }
  }, [])

  const handleNext = async () => {
    if (step === 1) {
      setIsLoading(true)
      try {
        console.log("Email submitted:", email)
        setStep(2)
      } catch (error) {
        console.error("Error in step 1:", error)
      } finally {
        setIsLoading(false)
      }
    } else if (step === 2) {
      setIsLoading(true)
      try {
        console.log("Proceeding to checkout")
        await handleCheckout()
      } catch (error) {
        console.error("Checkout failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCheckout = async () => {
    try {
      // Use the event's single price
      const currentPrice = getCurrentPrice()
      
      // Handle sold out case
      if (currentPrice === -1) {
        alert("Sorry, this event is sold out!")
        return
      }

      const discountMultiplier = 1 - discountAmount
      const items = [
        {
          price: Math.round(currentPrice * discountMultiplier),
          quantity: 1,
          name: `${event.title} - Ticket`,
        },
      ]

      const response = await fetch("/api/checkout/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: event.eventId,
          productCategory: "event",
          productType: event.eventType || `event_${event.eventId}`,
          items,
          currency: event.currency,
          email,
          name,
          currentCity,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleApplyDiscount = () => {
    const lowerCaseCode = discountCode.toLowerCase()
    switch (lowerCaseCode) {
      case "welcome15":
        setDiscountApplied(true)
        setDiscountAmount(0.15)
        break
      case "valentine":
      case "valentines":
        setDiscountApplied(true)
        setDiscountAmount(0.95)
        break
      default:
        setDiscountApplied(false)
        setDiscountAmount(0)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white via-sky-50 to-sky-100 rounded-3xl w-full max-w-3xl text-gray-800 overflow-y-auto max-h-[95vh] relative shadow-2xl border border-sky-200">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-100 rounded-xl transition-all duration-200 z-10">
          <X className="w-6 h-6" />
        </button>

        {/* Header Section */}
        <div className="bg-white p-8 rounded-t-3xl border-b border-gray-200">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 mr-3 text-sky-500" />
            <div className="text-gray-700 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div>{formatEventDateTime(event.gmtdatetime).dateOnly}</div>
              <div className="text-sm text-gray-600">{formatEventDateTime(event.gmtdatetime).timeOnly}</div>
            </div>
          </div>
          <h2 className="text-3xl font-black mb-2 text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
            {event.title}
          </h2>
          <p className="text-gray-600 text-lg font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            Secure your spot today
          </p>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-sky-100 text-sky-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <Mail className="w-4 h-4 mr-2" />
                  Step 1 of 3
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Let's Get Started
                </h3>
                <p className="text-gray-600 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Enter your email to secure your spot
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <Mail className="w-4 h-4 mr-2 text-sky-500" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl h-12 font-medium text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-sky-100 text-sky-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <User className="w-4 h-4 mr-2" />
                  Step 2 of 3
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Tell Us About You
                </h3>
                <p className="text-gray-600 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Just a few more details
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <User className="w-4 h-4 mr-2 text-sky-500" />
                    Full Name
                  </label>
                  <Input 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl h-12 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Current City (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. New York, London, Tokyo"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    className="border-sky-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl h-12 font-medium"
                  />
                </div>
              </div>

              {/* Price Preview */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-sky-200 text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Your Ticket Price
                </h4>
                {(() => {
                  const currentPrice = getCurrentPrice()
                  
                  if (currentPrice === -1) {
                    return (
                      <div className="text-red-600">
                        <div className="text-2xl font-black">SOLD OUT</div>
                        <div className="text-sm">This event is full</div>
                      </div>
                    )
                  }
                  
                  if (currentPrice === 0) {
                    return (
                      <div className="text-green-600">
                        <div className="text-4xl font-black animate-pulse">🎉 FREE! 🎉</div>
                        <div className="text-lg font-bold mt-2">Limited time only!</div>
                        <div className="text-sm text-gray-600 mt-1">Be one of the first to register</div>
                      </div>
                    )
                  }
                  
                  return (
                    <div className="text-sky-600">
                      <div className="text-3xl font-black">
                        {event.currency} ${(currentPrice / 100).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Early bird pricing</div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* Event Info Header */}
              {/* <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-black mb-1 text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Online Speed Dating in {event.city}
                </h3>
                <div className="text-lg font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <div>{formatEventDateTime(event.gmtdatetime).dateOnly}</div>
                  <div className="text-base">{formatEventDateTime(event.gmtdatetime).timeOnly}</div>
                </div>
              </div> */}

              {/* Event Ticket */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-sky-200">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Event Ticket
                    </h4>
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const currentPrice = getCurrentPrice()
                        
                        // Handle sold out
                        if (currentPrice === -1) {
                          return (
                            <span className="text-2xl font-black text-red-600">
                              SOLD OUT
                            </span>
                          )
                        }
                        
                        // Handle free tickets
                        if (currentPrice === 0) {
                          return (
                            <div className="text-center">
                              <span className="text-4xl font-black text-green-600 animate-pulse">
                                🎉 FREE TICKET! 🎉
                              </span>
                              <div className="text-lg font-bold text-green-600 mt-1">
                                Limited time offer!
                              </div>
                              <div className="text-sm text-gray-600">
                                You're one of the first to register
                              </div>
                            </div>
                          )
                        }
                        
                        // Handle regular pricing with discounts
                        if (discountApplied) {
                          return (
                            <>
                              <span className="text-gray-500 line-through font-medium">
                                {event.currency} ${(currentPrice / 100).toFixed(2)}
                              </span>
                              <span className="text-2xl font-black text-sky-600">
                                {event.currency} ${(currentPrice * (1 - discountAmount) / 100).toFixed(2)}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                {(discountAmount * 100).toFixed(0)}% OFF
                              </span>
                            </>
                          )
                        } else {
                          return (
                            <span className="text-2xl font-black text-sky-600">
                              {event.currency} ${(currentPrice / 100).toFixed(2)}
                            </span>
                          )
                        }
                      })()}
                    </div>
                    {getCurrentPrice() === 0 ? (
                      <p className="text-green-600 text-sm font-medium">🚀 Only available for early registrants!</p>
                    ) : getCurrentPrice() === -1 ? null : (
                      <p className="text-red-600 text-sm font-medium">🔥 Last ticket at this price</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Discount Code - Only show if not free */}
              {getCurrentPrice() !== 0 && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      const code = prompt("Enter discount code:");
                      if (code) {
                        setDiscountCode(code);
                        const lowerCaseCode = code.toLowerCase();
                        switch (lowerCaseCode) {
                          case "welcome15":
                            setDiscountApplied(true);
                            setDiscountAmount(0.15);
                            break;
                          case "valentine":
                          case "valentines":
                            setDiscountApplied(true);
                            setDiscountAmount(0.95);
                            break;
                          default:
                            setDiscountApplied(false);
                            setDiscountAmount(0);
                            alert("Invalid discount code");
                        }
                      }
                    }}
                    className="text-xs text-gray-500 hover:text-sky-600 underline"
                  >
                    Have a discount code?
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-center items-center mt-8">
            <Button
              onClick={handleNext}
              disabled={(step === 1 && !email) || (step === 2 && (!name || getCurrentPrice() === -1)) || isLoading}
              className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold px-12 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : step === 1 ? (
                "Continue"
              ) : step === 2 ? (
                getCurrentPrice() === -1 ? "SOLD OUT" : 
                getCurrentPrice() === 0 ? "🎉 CLAIM FREE TICKET" :
                "Get Ticket"
              ) : (
                getCurrentPrice() === 0 ? "🎉 CLAIM FREE TICKET" : "Complete Purchase"
              )}
            </Button>
          </div>

          {step === 3 && (
            <div className="mt-8 pt-8 border-t border-sky-200">
              <div className="flex items-center justify-center space-x-4 text-gray-500">
                <Shield className="w-5 h-5 text-sky-500" />
                <p className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Secure payment powered by
                </p>
                <Image src="/stripe-logo.png" alt="Stripe" width={60} height={25} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

