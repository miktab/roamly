"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Clock, DollarSign, CheckCircle } from "lucide-react"
import { isProductClickable, getProductButtonText } from "@/lib/product-utils"

interface Purchase {
  id: string
  checkoutSessionId: string
  productCategory: string
  productType: string
  productId: number
  totalOrder: number
  siteName: string
  productDescription: string | null
  purchaseDate: string
}

interface Product {
  productId: number
  title: string
  description: string
  price: number
  currency: string
  duration: string
  category: string
  level: string
  productCategory: string
  productType: string
  startDate?: string
  features: string[]
  image: string
  available: boolean
  rating: number
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loadingPurchases, setLoadingPurchases] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push("/auth/signin") // Not authenticated
  }, [session, status, router])

  useEffect(() => {
    if (session?.user) {
      fetchPurchases()
      fetchProducts()
    }
  }, [session])

  const fetchPurchases = async () => {
    setLoadingPurchases(true)
    try {
      const response = await fetch("/api/user/purchases")
      if (response.ok) {
        const data = await response.json()
        setPurchases(data.purchases)
      }
    } catch (error) {
      console.error("Error fetching purchases:", error)
    } finally {
      setLoadingPurchases(false)
    }
  }

  const fetchProducts = async () => {
    setLoadingProducts(true)
    try {
      const response = await fetch("/api/product/get_products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleProductClick = (productId: number, product: any) => {
    // Only navigate if the product is clickable
    if (isProductClickable(product)) {
      router.push(`/product?productId=${productId}`)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  // Helper functions for purchased products
  const isPurchasedProductAccessible = (purchase: Purchase): boolean => {
    const product = products.find(p => p.productId === purchase.productId)
    if (!product?.startDate) {
      return true // No start date means accessible immediately
    }
    
    const now = new Date()
    const startDate = new Date(product.startDate)
    return now >= startDate
  }

  const getPurchasedProductButtonText = (purchase: Purchase): string => {
    const product = products.find(p => p.productId === purchase.productId)
    if (!product?.startDate) {
      return '🎯 Access'
    }
    
    const now = new Date()
    const startDate = new Date(product.startDate)
    if (now < startDate) {
      return `Available ${startDate.toLocaleDateString()}`
    }
    
    return '🎯 Access'
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-500 mx-auto mb-4"></div>
          <p className="text-sky-700 font-medium">Loading your success dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/40 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-sky-100/60 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-cyan-100/50 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Success Dashboard
              </h1>
              <p className="text-sky-700/80 text-lg">Your journey to financial freedom starts here</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-sky-800 text-xl flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full"></div>
                  Welcome Back, Champion!
                </CardTitle>
                <CardDescription className="text-sky-600">Signed in as {session.user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sky-800 font-medium">{session.user?.name || "Success Seeker"}</p>
                    <p className="text-sky-600 text-sm">{session.user?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card - Removed */}
            {/*
            <Card className="border-0 shadow-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-sky-100">Fast track to success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200"
                    variant="outline"
                    onClick={() => router.push("/events")}
                  >
                    🚀 Browse Events
                  </Button>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200"
                    variant="outline"
                    onClick={() => router.push("/programs/RemoteReadyBootcamp")}
                  >
                    💎 Remote Ready Bootcamp
                  </Button>
                </div>
              </CardContent>
            </Card>
            */}

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-sky-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"></div>
                  Success Metrics
                </CardTitle>
                <CardDescription className="text-sky-600">Your progress overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sky-700">Status</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-400 text-white text-sm rounded-full font-medium">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-700">Programs</span>
                  <span className="text-2xl font-bold text-sky-800">{purchases.length}</span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-sky-400 to-cyan-400 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (purchases.length / 5) * 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="border-b border-sky-100 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full"></div>
                <CardTitle className="text-3xl text-sky-800">My Success Programs</CardTitle>
              </div>
              <CardDescription className="text-sky-600 text-lg">
                Your investments in financial freedom and success
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              {loadingPurchases ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-500 mx-auto mb-6"></div>
                  <p className="text-sky-700 text-lg font-medium">Loading your success programs...</p>
                  <p className="text-sky-500 mt-2">Preparing your path to prosperity</p>
                </div>
              ) : purchases.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-sky-800 mb-3">Ready to Start Your Journey?</h3>
                  <p className="text-sky-600 mb-6 max-w-md mx-auto">
                    You haven't invested in any programs yet. Take the first step towards financial freedom!
                  </p>
                  <Button
                    className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => router.push("/events")}
                  >
                    🌟 Explore Success Programs
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {purchases.map((purchase) => (
                    <Card
                      key={purchase.id}
                      className="border-0 shadow-lg bg-gradient-to-br from-white to-sky-50/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-sky-800 group-hover:text-sky-900 transition-colors">
                            {purchase.productDescription || `${purchase.productType} #${purchase.productId}`}
                          </CardTitle>
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex-shrink-0"></div>
                        </div>
                        <CardDescription className="text-sky-600">
                          Invested on {new Date(purchase.purchaseDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-sky-600">Purchased</span>
                            <span className="text-sm font-medium text-emerald-600">✓ Owned</span>
                          </div>
                          {!isPurchasedProductAccessible(purchase) && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-orange-600 text-sm">⏰</span>
                                <span className="text-orange-700 text-sm font-medium">
                                  Starts {(() => {
                                    const product = products.find(p => p.productId === purchase.productId)
                                    return product?.startDate ? new Date(product.startDate).toLocaleDateString() : 'Soon'
                                  })()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="pt-4 border-t border-sky-100">
                            <Button
                              className={`w-full transition-all duration-200 ${
                                isPurchasedProductAccessible(purchase)
                                  ? 'border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 bg-transparent'
                                  : 'border-gray-200 text-gray-500 bg-gray-100 cursor-not-allowed'
                              }`}
                              variant="outline"
                              disabled={!isPurchasedProductAccessible(purchase)}
                              onClick={() => {
                                if (isPurchasedProductAccessible(purchase)) {
                                  router.push(`/order/${purchase.productCategory}/${purchase.productType}`)
                                }
                              }}
                            >
                              {getPurchasedProductButtonText(purchase)}
                            </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Products Section - Hidden for now */}
          {/* 
          <Card className="border border-slate-200 shadow-sm bg-slate-50/50 backdrop-blur-sm mt-8">
            <CardHeader className="border-b border-slate-200 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                <CardTitle className="text-xl text-slate-700">More Programs to Explore</CardTitle>
              </div>
              <CardDescription className="text-slate-500 text-sm">
                Additional courses and bootcamps you might be interested in
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {loadingProducts ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-500 mx-auto mb-4"></div>
                  <p className="text-slate-600 text-sm">Loading available programs...</p>
                </div>
              ) : (
                <>
                  {products.filter(product => !purchases.some(purchase => purchase.productId === product.productId)).length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-600 mb-2">All Caught Up!</h3>
                      <p className="text-slate-500 text-sm">
                        You've purchased all our available programs. Check back later for new releases!
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {products.filter(product => !purchases.some(purchase => purchase.productId === product.productId)).map((product) => (
                    <Card
                      key={product.productId}
                      className={`${isProductClickable(product) ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : 'cursor-not-allowed opacity-75'} transition-all duration-200 group border border-slate-200 shadow-none bg-white/70`}
                      onClick={() => handleProductClick(product.productId, product)}
                    >
                      {!product.available && (
                        <div className="absolute top-3 right-3 bg-slate-500 text-white px-2 py-1 rounded text-xs">
                          Coming Soon
                        </div>
                      )}
                      {product.available && product.startDate && new Date() < new Date(product.startDate) && (
                        <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs">
                          Available Soon
                        </div>
                      )}
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-slate-700 group-hover:text-slate-800 transition-colors mb-2">
                              {product.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">{renderStars(product.rating)}</div>
                              <span className="text-xs text-slate-500">({product.rating})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-slate-600">
                              ${(product.price / 100).toFixed(2)}
                            </div>
                            <div className="text-xs text-slate-400">{product.currency}</div>
                          </div>
                        </div>
                        <CardDescription className="text-slate-500 text-xs leading-relaxed">
                          {product.description.length > 80 
                            ? `${product.description.substring(0, 80)}...` 
                            : product.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{product.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <span className="text-xs text-slate-400">{product.currency}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200">
                          <Button
                            className="w-full border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 bg-transparent text-sm"
                            variant="outline"
                            size="sm"
                            disabled={!isProductClickable(product)}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProductClick(product.productId, product)
                            }}
                          >
                            {getProductButtonText(product)}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
                </>
              )}
            </CardContent>
          </Card>
          */}
        </div>

        {/* Discreet Sign Out Button at Bottom */}
        <div className="flex justify-center pt-12 pb-8">
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="ghost"
            className="text-sm text-sky-600/70 hover:text-sky-700 hover:bg-sky-50/50 transition-all duration-200"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
