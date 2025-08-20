"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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

function ProductContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = parseInt(searchParams.get("productId") || "0", 10);
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isNaN(productId) || !Number.isInteger(productId) || productId === 0) {
      setError("Invalid product ID provided");
      setLoading(false);
      return;
    }

    // Fetch product to get productType for redirect
    fetchProduct(productId)
      .then(product => {
        // Redirect to the specific product type page
        router.push(`/product/${product.productType}?productId=${productId}`);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Redirecting to product page...</p>
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
          <a 
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Products
          </a>
        </div>
      </div>
    )
  }

  return null; // This should not be reached due to redirect
}

function ProductPageContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ProductContent />
    </Suspense>
  )
}

export default function ProductPage() {
  return <ProductPageContent />
}
