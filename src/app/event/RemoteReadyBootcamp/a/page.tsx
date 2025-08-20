"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Play, Users, Globe, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import TicketComponent from "@/components/TicketComponent"
import type { Event } from "@/types/event"

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-red-600 text-white rounded-lg px-3 py-2 min-w-[60px]">
            <div className="text-2xl font-bold">{value.toString().padStart(2, "0")}</div>
          </div>
          <div className="text-xs text-gray-400 mt-1 capitalize">{unit}</div>
        </div>
      ))}
    </div>
  )
}

function SocialProofGallery() {
  const [isExpanded, setIsExpanded] = useState(false)

  const testimonials = [
    {
      image: "/product/RemoteReadyBootcamp/1.jpg",
      name: "Maria Santos",
      location: "Lisbon, Portugal",
      quote: "From corporate burnout to $8K/month in 14 days. Now I work from cafés in Porto!",
    },
    {
      image: "/product/RemoteReadyBootcamp/2.jpg",
      name: "Carlos Silva",
      location: "São Paulo, Brazil",
      quote: "The community support was incredible. Real nomads sharing real strategies that work.",
    },
    {
      image: "/product/RemoteReadyBootcamp/3.jpg",
      name: "Priya Patel",
      location: "Chiang Mai, Thailand",
      quote: "14 days changed everything. I'm now running my digital agency from Bali.",
    },
    {
      image: "/product/RemoteReadyBootcamp/4.jpg",
      name: "Alex Popescu",
      location: "Bucharest, Romania",
      quote: "The proxy setup guide alone was worth it. My company has no idea I'm traveling!",
    },
    {
      image: "/product/RemoteReadyBootcamp/5.jpg",
      name: "Sophie Chen",
      location: "Remote from Vietnam",
      quote: "From zero to first client in 10 days. The mentorship was game-changing.",
    },
    {
      image: "/product/RemoteReadyBootcamp/6.jpg",
      name: "Diego Martinez",
      location: "Mexico City, Mexico",
      quote: "Finally escaped the 9-5. Building my empire while exploring the world.",
    },
  ]

  const visibleTestimonials = isExpanded ? testimonials : testimonials.slice(0, 3)

  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">Join Digital Nomads Worldwide</h3>
          <p className="text-gray-300 text-lg">Real people, real results, real locations around the globe</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-white font-semibold mb-1">{testimonial.name}</h4>
              <p className="text-red-400 text-sm mb-3 flex items-center justify-center gap-1">
                <Globe className="w-4 h-4" />
                {testimonial.location}
              </p>
              <p className="text-gray-300 text-sm italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                See More Success Stories <ChevronDown className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Helper function to format GMT datetime
function formatEventDateTime(gmtdatetime: string) {
  const date = new Date(gmtdatetime)
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }

  return {
    fullDateTime: date.toLocaleString(undefined, options),
    date: date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }),
  }
}

async function fetchEvent(eventId: number): Promise<Event> {
  const response = await fetch(`/api/event/get_event?eventId=${eventId}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const event = await response.json()
  if (!event) throw new Error(`Event with ID ${eventId} not found`)

  return event
}

function EventContent() {
  const searchParams = useSearchParams()
  const eventId = Number.parseInt(searchParams.get("eventId") || "0", 10)

  if (isNaN(eventId) || !Number.isInteger(eventId)) {
    throw new Error("Invalid event data")
  }

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("bootcamp")

  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId)
        .then((fetchedEvent) => {
          if (fetchedEvent.eventType !== "RemoteReadyBootcamp") {
            setError("This event type is not supported on this page")
            return
          }
          setEvent(fetchedEvent)
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    } else {
      setError("No event ID provided")
      setLoading(false)
    }
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300">Loading bootcamp...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-gray-300">{error || "Bootcamp not found"}</p>
          <Link href="/" className="mt-4 inline-block">
            <Button className="bg-red-600 hover:bg-red-700">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const bootcampStartDate = new Date()
  bootcampStartDate.setDate(bootcampStartDate.getDate() + 7)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden lg:flex min-h-screen">
          {/* Left side - Hero image */}
          <div className="w-1/2 relative">
            <Image
              src="/product/RemoteReadyBootcamp/hero.jpg"
              alt="Digital Nomad Working Remotely"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50" />
          </div>

          {/* Right side - Content */}
          <div className="w-1/2 flex items-center justify-center p-12">
            <div className="max-w-lg">
              <div className="text-right mb-8">
                <h1 className="text-4xl font-light italic text-gray-300 mb-2">Remote Ready</h1>
                <h2 className="text-5xl font-bold mb-4">Bootcamp</h2>
                <div className="w-24 h-0.5 bg-red-600 ml-auto mb-6"></div>
                <h3 className="text-2xl font-semibold mb-4">Master Digital Nomad Life in 14 Days</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Join a global community of digital nomads from Portugal to Thailand. Learn to build your remote
                  business, travel the world, and work from anywhere without your company knowing.
                </p>
              </div>

              <div className="text-right mb-8">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  Join Bootcamp
                </Button>
                <p className="text-sm text-gray-400 mt-3">
                  Starting at ${event.price ? event.price / 100 : 0} (billed once). 14-day money back guaranteed.
                </p>
              </div>

              <div className="flex justify-end gap-8 text-center">
                <div className="cursor-pointer">
                  <Play className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Trailer</span>
                </div>
                <div className="cursor-pointer">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Community</span>
                </div>
                <div className="cursor-pointer">
                  <Globe className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="relative h-screen">
            <Image
              src="/product/RemoteReadyBootcamp/hero.jpg"
              alt="Digital Nomad Working Remotely"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h1 className="text-3xl font-light italic text-gray-300 mb-2">Remote Ready</h1>
              <h2 className="text-4xl font-bold mb-4">Bootcamp</h2>
              <h3 className="text-xl font-semibold mb-4">Master Digital Nomad Life in 14 Days</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join a global community of digital nomads. Learn to build your remote business and work from anywhere.
              </p>

              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-sm w-full mb-4"
                onClick={() => setIsModalOpen(true)}
              >
                Join Bootcamp
              </Button>
              <p className="text-sm text-gray-400">
                Starting at ${event.price ? event.price / 100 : 0} (billed once). 14-day money back guaranteed.
              </p>

              <div className="flex justify-center gap-8 mt-6">
                <div className="cursor-pointer text-center">
                  <Play className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Trailer</span>
                </div>
                <div className="cursor-pointer text-center">
                  <Users className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Community</span>
                </div>
                <div className="cursor-pointer text-center">
                  <Globe className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex">
            {[
              { id: "bootcamp", label: "Bootcamp Info" },
              { id: "community", label: "Community" },
              { id: "faq", label: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-red-600 text-white"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-red-600 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">⚡ Bootcamp Starts Soon - Limited Spots!</h3>
          <p className="text-red-100 mb-6">Only 47 spots remaining. Join now before it's too late.</p>
          <CountdownTimer targetDate={bootcampStartDate} />
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === "bootcamp" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">About this Bootcamp</h2>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="bg-gray-800 rounded-lg p-8 mb-8">
                  <h3 className="text-xl font-bold mb-4">What You'll Master in 14 Days</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Launch your first digital product business</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Set up proxy systems to work remotely (without company knowing)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Master nomad travel strategies and location independence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Connect with successful nomads in 50+ countries</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-lg p-8">
                  <h3 className="text-xl font-bold mb-4">Your Global Mentors</h3>
                  <p className="text-gray-300 mb-4">
                    Get direct access to successful digital nomads currently living and working from:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                    <div>🇵🇹 Portugal</div>
                    <div>🇧🇷 Brazil</div>
                    <div>🇹🇭 Thailand</div>
                    <div>🇷🇴 Romania</div>
                    <div>🇲🇽 Mexico</div>
                    <div>🇻🇳 Vietnam</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-800 rounded-lg p-8 mb-8">
                  <h3 className="text-xl font-bold mb-4">14-Day Roadmap</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-600 pl-4">
                      <h4 className="font-semibold text-red-400">Days 1-3: Foundation</h4>
                      <p className="text-gray-300 text-sm">Choose your business model, set up systems</p>
                    </div>
                    <div className="border-l-4 border-red-600 pl-4">
                      <h4 className="font-semibold text-red-400">Days 4-7: Build</h4>
                      <p className="text-gray-300 text-sm">Create your first digital product</p>
                    </div>
                    <div className="border-l-4 border-red-600 pl-4">
                      <h4 className="font-semibold text-red-400">Days 8-11: Launch</h4>
                      <p className="text-gray-300 text-sm">Go live and get your first customers</p>
                    </div>
                    <div className="border-l-4 border-red-600 pl-4">
                      <h4 className="font-semibold text-red-400">Days 12-14: Scale</h4>
                      <p className="text-gray-300 text-sm">Optimize and prepare for travel</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-sm"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Secure Your Spot Now
                  </Button>
                  <p className="text-red-400 text-sm mt-2 font-semibold">⚠️ Only 47 spots remaining</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "community" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Join Our Global Community</h2>
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <Users className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">2,500+ Active Digital Nomads</h3>
              <p className="text-gray-300 text-lg mb-6">
                Connect with successful entrepreneurs working from 50+ countries. Get real-time advice, share
                experiences, and build lasting friendships.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Daily Check-ins</h4>
                  <p className="text-gray-400">Share progress and get support</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Location Channels</h4>
                  <p className="text-gray-400">Country-specific advice and meetups</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Expert AMAs</h4>
                  <p className="text-gray-400">Weekly sessions with successful nomads</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2">How is this different from other courses?</h3>
                <p className="text-gray-300">
                  This is a live 14-day intensive with real mentors currently living as nomads. You get direct access to
                  people doing exactly what you want to do.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What if I can't attend live sessions?</h3>
                <p className="text-gray-300">
                  All sessions are recorded and available in the community. Plus, our global mentors are in different
                  time zones for maximum coverage.
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Is the proxy setup legal?</h3>
                <p className="text-gray-300">
                  Yes, we teach legitimate remote work strategies and location-independent business models. Everything
                  is above board and ethical.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <SocialProofGallery />

      {/* Final CTA */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Digital Nomad Revolution?</h2>
          <p className="text-gray-300 text-lg mb-8">
            2,500+ people have already transformed their lives. Your spot is waiting.
          </p>
          <div className="mb-8">
            <CountdownTimer targetDate={bootcampStartDate} />
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-xl font-bold rounded-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Join Now - Only 47 Spots Left
          </Button>
          <p className="text-gray-400 text-sm mt-4">14-day money back guarantee • Lifetime community access</p>
        </div>
      </div>

      {/* Ticket Component Modal */}
      {event && <TicketComponent event={event} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default function RemoteReadyBootcampPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-300">Loading bootcamp...</p>
          </div>
        </div>
      }
    >
      <EventContent />
    </Suspense>
  )
}
