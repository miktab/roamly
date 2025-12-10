"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductTicketComponent from "@/components/ProductTicketComponent"
import LoadingScreen from "@/components/LoadingScreen"
import type { Product } from "@/types/product"

function AIContentChallengeContent() {
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
        
        // Get productId from URL parameters, fallback to first AiContentChallenge if not provided
        const productIdFromUrl = searchParams.get('productId')
        const targetProductId = productIdFromUrl ? parseInt(productIdFromUrl, 10) : 201
        
        // Find the product with the specified ID and ensure it's an AiContentChallenge
        const aiContentChallenge = products.find(p => 
          p.productId === targetProductId && 
          p.productType === "AiContentChallenge"
        )
        
        if (aiContentChallenge) {
          setProduct(aiContentChallenge)
          setError(null)
        } else {
          // If the specific product isn't found, show error or fallback
          const errorMessage = `Product with ID ${targetProductId} not found or is not an AI Content Challenge`
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
      name: "Sofi Wosiak",
      location: "Bangkok, Thailand",
      expertise: "AI Content Creation & Social Media",
      image: "/mentors/female/1.jpeg",
      gender: "female"
    },
    {
      name: "Sara Morgan",
      location: "Rio de Janeiro, Brazil",
      expertise: "Content Monetization & Agency Building",
      image: "/mentors/female/2.jpeg",
      gender: "female"
    },
    {
      name: "Tom Q",
      location: "Barcelona, Spain",
      expertise: "AI Tools & Content Automation",
      image: "/mentors/male/1.jpeg",
      gender: "male"
    },
    {
      name: "Jacob Hepenstal",
      location: "Tokyo, Japan",
      expertise: "AI Systems & Content Scaling",
      image: "/mentors/male/2.jpeg",
      gender: "male"
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "class-info":
        return (
          <div className="space-y-12">
            {/* Main Banner Image */}
            <div className="rounded-xl overflow-hidden bg-gray-800 shadow-lg">
              <img
                src="/products/AiContentChallenge/banner.jpg"
                alt="AI Content Challenge - Start and Make Money Online"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Process Steps - Tiny Thumbnails */}
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-800 shadow-lg mb-3">
                  <img
                    src="/products/AiContentChallenge/1.jpg"
                    alt="Create AI Content"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-white font-semibold text-sm">Create Content</p>
              </div>
              
              <div className="flex items-center text-3xl text-blue-400 font-light">→</div>
              
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-800 shadow-lg mb-3">
                  <img
                    src="/products/AiContentChallenge/2.jpg"
                    alt="Monetize Content"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-white font-semibold text-sm">Monetize</p>
              </div>
            </div>

            {/* Main Value Prop - Concise */}
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-8 border border-blue-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-3">No Camera. No Experience. Real Money.</h3>
              <p className="text-gray-300 leading-relaxed">
                Build a profitable AI content creation business in 14 days. Create professional content without showing your face, earn from day one, and scale to multiple income streams.
              </p>
            </div>

            {/* Key Features - Simple Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">No Camera</h4>
                <p className="text-gray-400 text-sm">AI voice-overs & visuals</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <h4 className="text-white font-semibold mb-1">Multiple Streams</h4>
                <p className="text-gray-400 text-sm">YouTube, TikTok, Clients</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">�</div>
                <h4 className="text-white font-semibold mb-1">Autopilot</h4>
                <p className="text-gray-400 text-sm">Set & forget systems</p>
              </div>
            </div>
          </div>
        )

      case "mentors":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Meet Your Mentors</h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our mentors aren't just teaching theory—they're actively building AI content empires right now, 
                earning significant income from their channels and agencies. Learn directly from people who are doing it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {mentors.map((mentor, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex-shrink-0 ring-2 ring-blue-500/30">
                        <img
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg">{mentor.name}</h4>
                        <p className="text-blue-400 text-sm mb-2">📍 {mentor.location}</p>
                        <p className="text-gray-300 text-sm font-semibold mb-3">{mentor.expertise}</p>
                        <div className="text-xs text-gray-400">
                          <p>🎯 Currently earning from AI-generated content and agencies</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-900/20 rounded-xl p-8 border border-blue-500/30 backdrop-blur-sm">
              <h4 className="text-white font-bold text-lg mb-4">Why Learn From Our Mentors?</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl">🎬</div>
                  <h5 className="text-blue-300 font-semibold">Proven Systems</h5>
                  <p className="text-gray-300 text-sm">
                    Every strategy they teach is being used RIGHT NOW to generate consistent income
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">🌍</div>
                  <h5 className="text-blue-300 font-semibold">Global Success</h5>
                  <p className="text-gray-300 text-sm">
                    Methods tested across different markets, languages, and platforms worldwide
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">📈</div>
                  <h5 className="text-blue-300 font-semibold">Real Results</h5>
                  <p className="text-gray-300 text-sm">
                    Our students are already earning their first $1,000+ per month with AI content
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "faq":
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need to be a content creator or have a camera?",
                  a: "Absolutely not! That's the whole point of this challenge. Our AI-powered approach means you don't need to be on camera. We teach you to use AI tools to create professional content without ever showing your face.",
                },
                {
                  q: "What if I've never made money online before?",
                  a: "Perfect. This program is designed for beginners. We start from zero and walk you through every step—from creating your first AI video to earning your first $100. No experience necessary.",
                },
                {
                  q: "How much can I realistically earn?",
                  a: "Our students typically earn $500-$2,000 in their first month, and $3,000-$10,000+ per month within 3 months. It depends on your niche, effort, and how quickly you implement. Some of our top students are earning $15,000+ monthly.",
                },
                {
                  q: "What if I have a full-time job?",
                  a: "This is perfect for side hustlers. The program only requires 30-45 minutes daily. You can work on this during lunch breaks or evenings. Many students start this while working their 9-5 job.",
                },
                {
                  q: "Do I need paid AI tools?",
                  a: "We teach you both free and paid tools. You can start completely free and reinvest your first earnings into better tools as you scale. Our mentors show exact ROI calculations for each tool.",
                },
                {
                  q: "Will this still work if platforms change?",
                  a: "Yes, because we teach you the underlying principles, not just hacks. You'll understand why AI content works so you can adapt to any platform changes. The fundamentals of content and monetization don't change.",
                },
                {
                  q: "Is the content really AI-generated or do I need to produce original content?",
                  a: "Both work! We teach you how to use AI to generate content, curate, repurpose, and mix with original ideas. The best approach uses AI efficiently to maximize output while maintaining quality.",
                },
                {
                  q: "What happens after the 14 days?",
                  a: "You get lifetime access to all materials, recordings, and our community. Plus, we offer optional advanced cohorts and specialized tracks for people wanting to take it further.",
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold pr-4">{faq.q}</h4>
                        <svg
                          className={`w-5 h-5 text-blue-400 transition-transform flex-shrink-0 ${expandedFaq === index ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6 border-t border-gray-700">
                        <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-6 border border-green-500/30">
              <p className="text-white font-semibold mb-2">Ready to start your AI content journey?</p>
              <p className="text-gray-300">Join hundreds of students who've already started earning with AI-generated content. Your challenge starts now.</p>
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
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black opacity-80"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          {/* Main Headline */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🤖 AI Content Creation Revolution
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
              Build a Content Empire Without Being on Camera
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Turn AI-generated content into <span className="text-green-400 font-bold">multiple income streams</span>. 
              No camera, no experience needed. Start earning in your first 30 days.
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-yellow-400">⚡</span>
                <span className="text-sm">Only 30-45 min/day</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-green-400">✓</span>
                <span className="text-sm">Zero camera needed</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-blue-400">💰</span>
                <span className="text-sm">Earn from Day 1</span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">14 Days</div>
              <p className="text-gray-300 text-sm">Complete Program</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">$500-$2K</div>
              <p className="text-gray-300 text-sm">First Month Earnings</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">100s</div>
              <p className="text-gray-300 text-sm">Successful Students</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-1">∞</div>
              <p className="text-gray-300 text-sm">Lifetime Access</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <p className="text-red-300 font-semibold mb-2 text-lg">🔥 Limited spots available - Challenge starts soon</p>
            
            {/* Countdown Timer */}
            {product?.startDate && (
              <div className="mb-6">
                <p className="text-blue-100 text-sm mb-3">Your challenge begins in:</p>
                <div className="flex justify-center space-x-3">
                  <div className="text-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-300">{timeLeft.days}</div>
                    <div className="text-xs text-blue-200 uppercase tracking-wide">Days</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-300">{timeLeft.hours}</div>
                    <div className="text-xs text-blue-200 uppercase tracking-wide">Hours</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-300">{timeLeft.minutes}</div>
                    <div className="text-xs text-blue-200 uppercase tracking-wide">Minutes</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-300">{timeLeft.seconds}</div>
                    <div className="text-xs text-blue-200 uppercase tracking-wide">Seconds</div>
                  </div>
                </div>
              </div>
            )}

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-bold shadow-2xl transition-all duration-200 hover:shadow-blue-500/50"
              onClick={() => setIsTicketComponentOpen(true)}
            >
              🚀 Join the Challenge Now
            </Button>
            <p className="text-gray-400 mt-3 text-sm">Join 100+ students already building AI content empires</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 sticky top-0 bg-black/95 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "class-info", label: "📚 What You'll Learn" },
              { id: "mentors", label: "👥 Your Mentors" },
              { id: "faq", label: "❓ FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
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
        {renderTabContent()}

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your AI Content Journey?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            This 14-day challenge will teach you everything to build a profitable AI content creation business. 
            Join hundreds of students who are already earning while we speak.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-10 py-6 text-lg font-bold shadow-xl"
            onClick={() => setIsTicketComponentOpen(true)}
          >
            Secure Your Spot Today
          </Button>
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

export default function AIContentChallengePage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading your AI content challenge..." />}>
      <AIContentChallengeContent />
    </Suspense>
  )
}
