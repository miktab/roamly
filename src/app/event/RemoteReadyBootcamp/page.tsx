"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bell, Calendar, MapPin, Clock, User, UserPlus, DollarSign, Target, Users, Zap, BookOpen, TrendingUp, Smartphone, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TicketComponent from "@/components/TicketComponent"
import type { Event } from "@/types/event"

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
  const eventId = parseInt(searchParams.get("eventId") || "0", 10);
  
  if (isNaN(eventId) || !Number.isInteger(eventId)) {
    throw new Error("Invalid event data");
  }

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId)
        .then((fetchedEvent) => {
          // Only show this page for RemoteReadyBootcamp events
          if (fetchedEvent.eventType !== 'RemoteReadyBootcamp') {
            setError('This event type is not supported on this page');
            return;
          }
          setEvent(fetchedEvent);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setError("No event ID provided");
      setLoading(false);
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading bootcamp...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Bootcamp not found</h1>
          <Link href="/" className="mt-4 inline-block">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Format the event date and time from gmtdatetime
  const { date, time } = formatEventDateTime(event.gmtdatetime);

  return (
    <div className="min-h-screen">
      {event.soldOut && (
        <div className="bg-red-600 text-white text-center py-2 font-bold">
          <span className="mr-2">Bootcamp Full</span>
          <div className="inline-flex gap-2 mt-2 sm:mt-0">
            <Link href="/#events">
              <Button variant="secondary" size="sm" className="text-red-600 hover:text-red-700">
                See other events
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-br from-emerald-900 to-teal-800 text-white text-center py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative w-full max-w-2xl mx-auto aspect-[3/2] mb-6 rounded-lg overflow-hidden">
            <Image
              src="/roamly/hero-above-clouds.jpg"
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {event.title}
            {event.city && <span className="text-emerald-400"> | {event.city}</span>}
          </h1>
          <p className="text-xl mb-6 text-emerald-100">
            Be Ready to Earn and Travel in 30 Days
          </p>
          <div className="flex flex-col items-center gap-2 text-lg w-full max-w-md mx-auto">
            <div className="flex items-center justify-between w-full bg-emerald-800 rounded-lg p-2">
              <div className="flex items-center">
                <Calendar className="mr-2 text-emerald-400" />
                <span>Starts: {date}</span>
              </div>
            </div>
            {!event.soldOut && (
              <div className="flex items-center w-full">
                <MapPin className="mr-2 text-emerald-400" />
                <span>Online Bootcamp + Community Access</span>
              </div>
            )}
            <div className="flex items-center w-full">
              <Clock className="mr-2 text-emerald-400" />
              <span>Just 15 Minutes Daily</span>
            </div>
            <div className="flex items-center w-full">
              <DollarSign className="mr-2 text-emerald-400" />
              <span>From {event.currency} ${event.price ? event.price / 100 : 0}</span>
            </div>
            <div className="flex items-center w-full">
              <Target className="mr-2 text-emerald-400" />
              <span>30-Day Program</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-800">
              {event.eventType}
            </Badge>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Transform your life in just 30 days with our comprehensive bootcamp designed to get you earning remotely 
              while traveling the world. With one-on-one mentor guidance and just 15 minutes daily commitment, 
              you'll build a sustainable remote business and join a thriving community of digital nomads.
            </p>
          </div>

          {event.soldOut ? (
            <div className="mt-6 mb-8 flex flex-col items-center gap-2">
              <Link href="/#events">
                <Button variant="default" className="w-full sm:w-auto">
                  See other programs
                </Button>
              </Link>
              <span className="text-red-600 text-sm font-semibold text-center mt-2">
                This bootcamp is full
              </span>
            </div>
          ) : (
            <div className="mt-6 mb-8 flex flex-col items-center">
              <Button
                variant="default"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Join the Bootcamp
              </Button>
              <span className="text-red-600 text-sm font-semibold text-center mt-2">
                Limited spots available
              </span>
            </div>
          )}

          {/* Bootcamp Outcomes Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What You'll Achieve in 30 Days
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Launch your first remote income stream</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Build systems that work while you travel</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Connect with successful digital nomads</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Master proven remote work strategies</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Develop location-independent skills</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Create multiple revenue streams</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Get personalized mentor guidance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Access exclusive nomad community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Path Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mt-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Remote Business Path</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h5 className="text-xl font-bold text-blue-800 mb-3">Digital Product Creation</h5>
                <p className="text-gray-700 text-sm">Create and sell online courses, ebooks, templates, and digital tools that generate passive income.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h5 className="text-xl font-bold text-purple-800 mb-3">Personal Brand Building</h5>
                <p className="text-gray-700 text-sm">Build your expertise into a profitable personal brand with content creation and thought leadership.</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-6 text-center">
                <Smartphone className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h5 className="text-xl font-bold text-emerald-800 mb-3">Phone Sales Mastery</h5>
                <p className="text-gray-700 text-sm">Master high-ticket phone sales and build a consultative business that works from anywhere.</p>
              </div>
            </div>
          </div>

          {/* Program Structure */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">Your 30-Day Journey</h4>
            <div className="space-y-4">
              <div className="bg-white border border-emerald-100 rounded-lg p-4">
                <h6 className="font-bold text-emerald-600 mb-2">🚀 Week 1: Foundation & Setup</h6>
                <p className="text-gray-700">Establish your remote work foundation, choose your business path, and set up essential systems.</p>
              </div>
              <div className="bg-white border border-emerald-100 rounded-lg p-4">
                <h6 className="font-bold text-emerald-600 mb-2">💡 Week 2: Skill Development</h6>
                <p className="text-gray-700">Deep dive into your chosen specialization with hands-on training and mentor support.</p>
              </div>
              <div className="bg-white border border-emerald-100 rounded-lg p-4">
                <h6 className="font-bold text-emerald-600 mb-2">🎯 Week 3: Implementation</h6>
                <p className="text-gray-700">Launch your first income stream with real-world application and community feedback.</p>
              </div>
              <div className="bg-white border border-emerald-100 rounded-lg p-4">
                <h6 className="font-bold text-emerald-600 mb-2">📈 Week 4: Scale & Optimize</h6>
                <p className="text-gray-700">Optimize your systems, scale your income, and prepare for location independence.</p>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mt-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Everything You Need to Succeed</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Daily 15-minute focused training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">One-on-one mentor guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Private digital nomad community</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Complete step-by-step curriculum</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Real-world case studies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Personalized action plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Lifetime access to materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Weekly group coaching calls</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-8">
            <div className="flex justify-center items-center gap-8 text-center">
              <div>
                <div className="font-bold text-2xl text-gray-900">🎯 97%</div>
                <div className="text-gray-600 text-sm">Success Rate</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-900">🌍 2,500+</div>
                <div className="text-gray-600 text-sm">Graduates</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-900">💰 $10K+</div>
                <div className="text-gray-600 text-sm">Avg Monthly Income</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          {!event.soldOut && (
            <div className="mt-8 text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Remote Journey?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join hundreds of successful digital nomads who transformed their lives in just 30 days.
              </p>
              <Button
                variant="secondary"
                className="bg-white text-emerald-600 hover:bg-gray-100 font-bold text-lg px-8 py-3"
                onClick={() => setIsModalOpen(true)}
              >
                Secure Your Spot Now
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Component Modal */}
      {event && (
        <TicketComponent
          event={event}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default function RemoteReadyBootcampPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading bootcamp...</p>
        </div>
      </div>
    }>
      <EventContent />
    </Suspense>
  )
}
