"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Star, Users, Clock, DollarSign, CheckCircle, ArrowLeft, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductTicketComponent from "@/components/ProductTicketComponent"
import type { Product } from "@/types/product"

async function fetchProduct(productId: number): Promise<Product> {
  const response = await fetch(`/api/product/get_product?productId=${productId}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const product = await response.json()
  if (!product) throw new Error(`Product with ID ${productId} not found`)

  return product
}

function DigitalNomadCourseContent() {
  const searchParams = useSearchParams()
  const productId = parseInt(searchParams.get("productId") || "0", 10);
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTicketOpen, setIsTicketOpen] = useState(false)

  useEffect(() => {
    if (isNaN(productId) || !Number.isInteger(productId) || productId === 0) {
      setError("Invalid product ID provided");
      setLoading(false);
      return;
    }

    fetchProduct(productId)
      .then((fetchedProduct) => {
        // Verify this is the correct product type
        if (fetchedProduct.productType !== "DigitalNomadCourse") {
          setError("Product type mismatch");
          setLoading(false);
          return;
        }
        setProduct(fetchedProduct);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Digital Nomad Course...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The Digital Nomad Course you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{backgroundColor: '#f9fafb', color: '#111827'}}>
      {/* Header */}
      <div className="bg-white border-b" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="text-gray-900 hover:text-gray-700" style={{color: '#111827'}}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            {product.image && (
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={"/product/GlobalNomadLifestyle/banner.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6" style={{color: '#111827'}}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.level}</Badge>
                {!product.available && (
                  <Badge className="bg-red-500 text-white">Coming Soon</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{color: '#111827'}}>
                {product.title}
              </h1>
              
              <p className="text-lg text-gray-700 mb-6" style={{color: '#374151'}}>
                {product.description}
              </p>

              {/* Rating and Students */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600" style={{color: '#4b5563'}}>({product.rating})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600" style={{color: '#4b5563'}}>
                  <Users className="w-5 h-5" />
                  <span>{(product.studentsEnrolled || 0).toLocaleString()} students enrolled</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600" style={{color: '#4b5563'}}>
                  <Clock className="w-5 h-5" />
                  <span>{product.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-900 font-semibold" style={{color: '#111827'}}>
                  <DollarSign className="w-5 h-5" />
                  <span className="text-xl">${(product.price / 100).toFixed(2)} {product.currency}</span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!product.available}
                  onClick={() => {
                    console.log('Button clicked, opening ticket component');
                    setIsTicketOpen(true);
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {!product.available ? 'Coming Soon' : `Get Access for $${(product.price / 100).toFixed(2)} ${product.currency}`}
                </Button>
                
                {product.available && (
                  <p className="text-sm text-gray-600 text-center" style={{color: '#4b5563'}}>
                    ✨ Join {(product.studentsEnrolled || 0).toLocaleString()}+ students already enrolled
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What You'll Get</CardTitle>
                <CardDescription>
                  Everything included in this {product.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{(product.studentsEnrolled || 0).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Already enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{product.rating}/5</p>
              <div className="flex mt-1">{renderStars(product.rating)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{product.duration}</p>
              <p className="text-sm text-gray-600">{product.level} level</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Ticket Component */}
      {product && (
        <ProductTicketComponent
          product={product}
          isOpen={isTicketOpen}
          onClose={() => {
            console.log('Closing ticket component');
            setIsTicketOpen(false);
          }}
        />
      )}
    </div>
  )
}

function DigitalNomadCoursePageContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DigitalNomadCourseContent />
    </Suspense>
  )
}

export default function DigitalNomadCoursePage() {
  return <DigitalNomadCoursePageContent />
}
