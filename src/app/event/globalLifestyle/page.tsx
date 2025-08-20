"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bell, Calendar, MapPin, Clock, User, UserPlus, DollarSign } from 'lucide-react'
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
                    // Only show this page for globalLifestyle events
          if (fetchedEvent.eventType !== 'globalLifestyle') {
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
          <p className="mt-4 text-lg text-gray-600">Loading event...</p>
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
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Event not found</h1>
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
          <span className="mr-2">Sold out</span>
          <div className="inline-flex gap-2 mt-2 sm:mt-0">
            <Link href="/#events">
              <Button variant="secondary" size="sm" className="text-red-600 hover:text-red-700">
                See other events
              </Button>
            </Link>
          </div>
        </div>
      )}
      
            <div className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white text-center py-12">
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
                        {event.city && <span className="text-purple-400"> | {event.city}</span>}
          </h1>
          <div className="flex flex-col items-center gap-2 text-lg w-full max-w-md mx-auto">
            <div className="flex items-center justify-between w-full bg-purple-800 rounded-lg p-2">
              <div className="flex items-center">
                <Calendar className="mr-2 text-purple-400" />
                <span>{date}</span>
              </div>
            </div>
            {!event.soldOut && (
              <div className="flex items-center w-full">
                <MapPin className="mr-2 text-purple-400" />
                <span>Online Event via Zoom</span>
              </div>
            )}
            <div className="flex items-center w-full">
              <Clock className="mr-2 text-purple-400" />
              <span>Start Time: {time}</span>
            </div>
            <div className="flex items-center w-full">
              <DollarSign className="mr-2 text-purple-400" />
              <span>From {event.currency} ${event.price ? event.price / 100 : 0}</span>
            </div>
            <div className="flex items-center w-full">
              <Clock className="mr-2 text-purple-400" />
              <span>Duration: {event.duration_in_minutes} minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
              {event.eventType}
            </Badge>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Transform your lifestyle and build sustainable wealth while living your dream life anywhere in the world. 
              This exclusive session reveals proven strategies for creating location-independent income streams and 
              designing the ultimate global lifestyle.
            </p>
          </div>

          {event.soldOut ? (
            <div className="mt-6 mb-8 flex flex-col items-center gap-2">
              <Link href="/#events">
                <Button variant="default" className="w-full sm:w-auto">
                  See other events
                </Button>
              </Link>
              <span className="text-red-600 text-sm font-semibold text-center mt-2">
                This event is Sold out
              </span>
            </div>
          ) : (
            <div className="mt-6 mb-8 flex flex-col items-center">
              <Button
                variant="default"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Register Now
              </Button>
              <span className="text-red-600 text-sm font-semibold text-center mt-2">
                Spaces are limited
              </span>
            </div>
          )}

          {/* Lifestyle Topics Section */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What You'll Discover
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Location-independent business models that scale globally</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">How to build passive income streams while traveling</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Digital nomad tax strategies and offshore opportunities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Creating multiple revenue streams from anywhere</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Global investment opportunities for nomads</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Building an international network of opportunities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Legal structures for global entrepreneurs</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Live Q&A with successful global entrepreneurs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Format Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">Event Format</h4>
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <h6 className="font-bold text-purple-600 mb-2">🌟 Welcome & Networking (5 mins)</h6>
                <p className="text-gray-700">Connect with like-minded global entrepreneurs and set intentions for transformation.</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <h6 className="font-bold text-purple-600 mb-2">🚀 Lifestyle Design Masterclass ({event.duration_in_minutes - 15} mins)</h6>
                <p className="text-gray-700">Deep dive into proven strategies for building wealth while living your dream lifestyle anywhere.</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <h6 className="font-bold text-purple-600 mb-2">💬 Interactive Q&A (10 mins)</h6>
                <p className="text-gray-700">Get personalized advice and connect with our community of global entrepreneurs.</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-8">
            <div className="flex justify-center items-center gap-8 text-center">
              <div>
                <div className="font-bold text-2xl text-gray-900">🏝️ 200+</div>
                <div className="text-gray-600 text-sm">Countries Covered</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-900">💰 $50M+</div>
                <div className="text-gray-600 text-sm">Income Generated</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-900">⭐ 4.9/5</div>
                <div className="text-gray-600 text-sm">Satisfaction Rating</div>
              </div>
            </div>
          </div>
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

export default function GlobalLifestylePage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading event...</p>
        </div>
      </div>
    }>
      <EventContent />
    </Suspense>
  )
}
