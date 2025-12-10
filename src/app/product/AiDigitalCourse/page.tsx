"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductTicketComponent from "@/components/ProductTicketComponent"
import LoadingScreen from "@/components/LoadingScreen"
import type { Product } from "@/types/product"

function RemoteReadyBootcampContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("class-info")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isTicketComponentOpen, setIsTicketComponentOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json')
        const products: Product[] = await response.json()
        
        // Get productId from URL parameters, fallback to 1 if not provided
        const productIdFromUrl = searchParams.get('productId')
        const targetProductId = productIdFromUrl ? parseInt(productIdFromUrl, 10) : 1
        
        // Find the product with the specified ID and ensure it's a RemoteReadyBootcamp
        const remoteReadyBootcamp = products.find(p => 
          p.productId === targetProductId && 
          p.productType === "AiDigitalCourse"
        )
        
        if (remoteReadyBootcamp) {
          setProduct(remoteReadyBootcamp)
          setError(null)
        } else {
          // If the specific product isn't found or isn't a RemoteReadyBootcamp, show error or fallback
          const errorMessage = `Product with ID ${targetProductId} not found or is not a RemoteReadyBootcamp`
          console.error(errorMessage)
          setError(errorMessage)
          setProduct(null)
        }
      } catch (error) {
        console.error('Failed to fetch product data:', error)
      }
    }
    
    fetchProduct()
  }, [searchParams])

  // Loading effect - separate from countdown
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(loadingTimer)
    }
  }, [])

  // Countdown timer effect - separate from loading
  useEffect(() => {
    if (!product?.startDate) return

    const startDate = new Date(product.startDate)
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = startDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [product])

  const mentors = [
    {
      name: "Tom Q",
      location: "Barcelona, Spain",
      expertise: "Digital Products",
      image: "/mentors/male/1.jpeg",
      gender: "male"
    },
    {
      name: "Jacob Hepenstal",
      location: "Tokyo, Japan",
      expertise: "Software Development & Tech",
      image: "/mentors/male/2.jpeg",
      gender: "male"
    },
    {
      name: "Sofi Wosiak",
      location: "Bangkok, Thailand",
      expertise: "Content Creation & Social Media",
      image: "/mentors/female/1.jpeg",
      gender: "female"
    },
    {
      name: "Sara Morgan",
      location: "Rio de Janeiro, Brazil",
      expertise: "Freelancing & Remote Work Strategy",
      image: "/mentors/female/2.jpeg",
      gender: "female"
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "class-info":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src="/products/AiDigitalCourse/banner.jpg?height=600&width=800"
                    alt="Remote Ready Bootcamp - Digital Nomad Lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Program Details</h3>
                  <div className="space-y-3">
                    {product?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-white font-semibold mb-4">Featured Mentor</h4>
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                      <img
                        src={mentors[0].image}
                        alt={mentors[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">{mentors[0].name}</h5>
                      <p className="text-blue-400 text-sm">📍 {mentors[0].location}</p>
                      <p className="text-gray-300 text-xs">{mentors[0].expertise}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-yellow-400 font-semibold mb-4">BUILD DIGITAL PRODUCTS WITH AI:</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Everything you need to build a digital product with AI and sell it to make money. I'll walk you through 2 real examples of digital products I've built using AI. You'll see the entire process from developing it with AI to branding and selling it - all within <span className="text-blue-400 font-semibold">14 days</span>.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">What You'll Learn:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• How I built an AI tool to find undervalued/sell second-hand cars on Facebook Marketplace</li>
                    <li>• How I created an AI app to clip videos automatically</li>
                    <li>• Step-by-step lessons to build your own digital product</li>
                    <li>• AI tools & techniques for non-coders to build real businesses</li>
                    <li>• Branding and selling strategies that work</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Program Includes:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real case studies of 2 successful products I built</li>
                    <li>• Best AI tools recommended for each step</li>
                    <li>• No coding experience required</li>
                    <li>• Create passive income from your digital products</li>
                    <li>• Apply these lessons to build exactly what you're interested in</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="rounded-lg overflow-hidden bg-gray-700 mb-4">
                    <img
                      src="/products/AiDigitalCourse/1.jpg"
                      alt="Find Challenge"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <h4 className="text-white font-semibold">Find Challenge</h4>
                  <p className="text-gray-400 text-sm mt-2">Identify the market opportunity and problem to solve</p>
                </div>

                <div className="text-center">
                  <div className="rounded-lg overflow-hidden bg-gray-700 mb-4">
                    <img
                      src="/products/AiDigitalCourse/2.jpg"
                      alt="Create Product"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <h4 className="text-white font-semibold">Create Product</h4>
                  <p className="text-gray-400 text-sm mt-2">Build your digital product using AI tools and techniques</p>
                </div>

                <div className="text-center">
                  <div className="rounded-lg overflow-hidden bg-gray-700 mb-4">
                    <img
                      src="/products/AiDigitalCourse/3.jpg"
                      alt="Monetise & Sell"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <h4 className="text-white font-semibold">Monetise & Sell</h4>
                  <p className="text-gray-400 text-sm mt-2">Launch and sell your product to generate revenue</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "mentors":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Learn from AI Builders</h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our mentors have built successful digital products using AI. They're sharing their proven strategies, tools, and real case studies to help you create your own profitable AI-powered digital products.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {mentors.map((mentor, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg">{mentor.name}</h4>
                        <p className="text-blue-400 text-sm mb-2">📍 Currently in {mentor.location}</p>
                        <p className="text-gray-300 text-sm">{mentor.expertise}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-4">Why This Program Works</h4>
              <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">Real Case Studies</h5>
                  <p className="text-sm">
                    Learn from 2 actual digital products built with AI - see the complete journey from idea to implementation
                  </p>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">Practical Tools & Tactics</h5>
                  <p className="text-sm">Discover the specific AI tools and strategies used to build these products</p>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">No Coding Required</h5>
                  <p className="text-sm">AI empowers anyone to build and launch products, regardless of technical background</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "faq":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need coding experience?",
                  a: "Not at all! AI tools make it possible to build digital products without any coding knowledge. We'll teach you which tools to use and how to use them effectively.",
                },
                {
                  q: "What digital products will I learn to build?",
                  a: "You'll learn the real case studies of my AI tool for finding undervalued cars on Facebook Marketplace and my AI video clipping app. You'll understand the process so you can apply it to build products in your own areas of interest.",
                },
                {
                  q: "How long does it take to build a product?",
                  a: "Our bootcamp shows you how to move fast. You'll see how I built real products and get results within the 14-day period. After the bootcamp, you have all the tools and knowledge to keep building.",
                },
                {
                  q: "Will I get the AI tools recommended in the course?",
                  a: "We recommend the best AI tools available for each step of the process. Many have free or trial versions so you can start immediately. We provide detailed guides for each tool.",
                },
                {
                  q: "Can I build something completely different?",
                  a: "Absolutely! The principles you learn from the case studies apply to any digital product. Learn the process, then apply it to what you're passionate about.",
                },
                {
                  q: "Is there support after the bootcamp ends?",
                  a: "Yes! You get lifetime access to our community of AI product builders, monthly group coaching calls, and resources to keep building your products.",
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold">{faq.q}</h4>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === index ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-300">{faq.a}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isLoading) {
    return <LoadingScreen message="Preparing your journey to financial freedom..." />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-300 mb-4">
            {error || "The requested RemoteReadyBootcamp product could not be found."}
          </p>
          <Button 
            onClick={() => window.location.href = '/products'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View All Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{product.title}</h1>
            <p className="text-xl text-blue-100 mb-2">{product.description}</p>
            <p className="text-lg text-sky-200 font-semibold">14-Day Online Bootcamp • Build Real Products with AI</p>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-yellow-300 font-semibold mb-2">🤖 AI-Powered Digital Product Creation</p>
            <p className="text-blue-100">No coding experience required • Learn from real case studies • Build passive income</p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <p className="text-red-300 font-semibold mb-2">🔥 Spots are limited</p>
            
            {/* Countdown Timer - only show if startDate exists */}
            {product.startDate && (
              <div className="mb-4">
                <p className="text-blue-100 text-sm mb-2">Bootcamp starts in:</p>
                <div className="flex justify-center space-x-4 text-white">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">{timeLeft.days}</div>
                    <div className="text-xs text-blue-200">Days</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">{timeLeft.hours}</div>
                    <div className="text-xs text-blue-200">Hours</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-xs text-blue-200">Minutes</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-xs text-blue-200">Seconds</div>
                  </div>
                </div>
              </div>
            )}

            <Button 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              onClick={() => setIsTicketComponentOpen(true)}
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "class-info", label: "Class Info" },
              { id: "mentors", label: "Your Mentors" },
              { id: "faq", label: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-white text-white"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {activeTab === "class-info" && "About this Class"}
            {activeTab === "mentors" && "Meet Your Mentors"}
            {activeTab === "faq" && "Questions & Answers"}
          </h2>
        </div>

        {renderTabContent()}

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            onClick={() => setIsTicketComponentOpen(true)}
          >
            Register Now
          </Button>
          <p className="text-gray-400 mt-4 text-sm">Join students building profitable AI digital products</p>
        </div>
      </div>

      {/* Product Ticket Component */}
      <ProductTicketComponent
        product={product}
        isOpen={isTicketComponentOpen}
        onClose={() => setIsTicketComponentOpen(false)}
      />
    </div>
  )
}

export default function RemoteReadyBootcampPage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading product information..." />}>
      <RemoteReadyBootcampContent />
    </Suspense>
  )
}
