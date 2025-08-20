"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, User, Mail, CheckCircle, CreditCard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "@/types/product"

interface ProductTicketComponentProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

const ProductTicketComponent: React.FC<ProductTicketComponentProps> = ({ product, isOpen, onClose }) => {
  console.log('ProductTicketComponent rendered:', { isOpen, productTitle: product?.title });
  
  const [currentStep, setCurrentStep] = useState(1)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setCurrentStep(1)
    setUserInfo({ name: "", email: "" })
    onClose()
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.productId,
          name: userInfo.name,
          email: userInfo.email,
        }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Purchase error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const displayPrice = (product.price / 100).toFixed(2)

  console.log('ProductTicketComponent state:', { isOpen, displayPrice, currentStep });

  if (!isOpen) {
    console.log('ProductTicketComponent not rendering - isOpen is false');
    return null;
  }

  console.log('ProductTicketComponent rendering modal');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
        
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-0 shadow-2xl transition-all">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-sky-400 to-sky-600 px-6 py-4 text-white">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="pr-12">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-sky-100">{product.category} • {product.level}</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 px-6 py-4 bg-gray-50">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 2 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started</h3>
                  <p className="text-gray-600">Enter your details to continue</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Order</h3>
                  <p className="text-gray-600">Review your purchase details</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    {product.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{product.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-500">{product.duration}</span>
                        <span className="text-2xl font-bold text-blue-600">${displayPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                    <div className="space-y-2">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Your payment is processed securely through Stripe. You'll receive immediate access upon completion.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end">
            <div className="flex space-x-3">
              {currentStep < 2 ? (
                <Button 
                  onClick={handleNext}
                  disabled={!userInfo.name.trim() || !userInfo.email.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isLoading ? 'Processing...' : `Complete Purchase - $${displayPrice}`}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTicketComponent
