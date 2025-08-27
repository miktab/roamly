'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, CheckCircle } from "lucide-react";
import { Product } from "@/types/product";
import { isProductClickable, getProductButtonText } from "@/lib/product-utils";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product/get_products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Filter to only show the Bootcamp course (productId: 1)
        const filteredProducts = data.filter((product: Product) => product.productId === 1);
        setProducts(filteredProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: number, product: Product) => {
    // Only navigate if the product is clickable
    if (isProductClickable(product)) {
      router.push(`/product?productId=${productId}`);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white" id="products">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Products
            </h2>
            <p className="text-lg text-gray-700">
              Loading products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-white" id="products">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Products
            </h2>
            <p className="text-lg text-red-600">
              Error loading products: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 px-4 bg-white" id="products">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Products
            </h2>
            <p className="text-lg text-gray-700">
              No products available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white" id="products">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Products
          </h2>
          <p className="text-lg text-gray-700">
            Discover our comprehensive courses and bootcamps designed to help you achieve location independence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card 
              key={product.productId} 
              className={`${isProductClickable(product) ? 'cursor-pointer hover:shadow-lg' : 'cursor-not-allowed opacity-75'} transition-shadow duration-200 relative overflow-hidden bg-white border border-gray-200 h-full flex flex-col`}
              onClick={() => handleProductClick(product.productId, product)}
            >
              {!product.available && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                  Coming Soon
                </Badge>
              )}
              {product.available && product.startDate && new Date() < new Date(product.startDate) && (
                <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                  Available Soon
                </Badge>
              )}
              
              {product.image && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader className="flex-grow">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="w-fit">
                      {product.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight text-gray-900">{product.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{product.duration}</span>
                    </div>
                    
                    {/* Price section removed for bootcamp course */}

                    {product.features && product.features.length > 0 && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Features:</h4>
                        <div className="space-y-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="text-xs text-gray-600">{feature}</span>
                            </div>
                          ))}
                          {product.features.length > 3 && (
                            <span className="text-xs text-gray-500">+{product.features.length - 3} more features</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200" 
                    disabled={!isProductClickable(product)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.productId, product);
                    }}
                  >
                    {getProductButtonText(product)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => router.push('/products')}>
              View All Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
