"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Bell, Calendar, MapPin, Clock, User, UserPlus, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TicketComponent from "@/components/TicketComponent"
import SocialProof from "@/components/SocialProof"
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
          // Only show this page for moneyWebinar events
          if (fetchedEvent.eventType !== 'moneyWebinar') {
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
            <Link href="/events">
              <Button variant="secondary" size="sm" className="text-red-600 hover:text-red-700">
                See other events
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-br from-green-900 to-emerald-800 text-white text-center py-12">
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
            {event.city && <span className="text-green-400"> | {event.city}</span>}
          </h1>
          <div className="flex flex-col items-center gap-2 text-lg w-full max-w-md mx-auto">
            <div className="flex items-center justify-between w-full bg-gray-800 rounded-lg p-2">
              <div className="flex items-center">
                <Calendar className="mr-2 text-green-400" />
                <span>{date}</span>
              </div>
            </div>
            {!event.soldOut && (
              <div className="flex items-center w-full">
                <MapPin className="mr-2 text-green-400" />
                <span>Online Event via Zoom</span>
              </div>
            )}
            <div className="flex items-center w-full">
              <Clock className="mr-2 text-green-400" />
              <span>Start Time: {time}</span>
            </div>
            <div className="flex items-center w-full">
              <DollarSign className="mr-2 text-green-400" />
              <span>From {event.currency} ${event.price ? event.price / 100 : 0}</span>
            </div>
            <div className="flex items-center w-full">
              <Clock className="mr-2 text-green-400" />
              <span>Duration: {event.duration_in_minutes} minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
              Money Webinar
            </Badge>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Connect with digital nomads currently living and working in Thailand, Brazil, Italy, and Australia. 
              Learn exactly how they got started and the systems they use to maintain steady income while traveling.
            </p>
          </div>

          {event.soldOut ? (
            <div className="mt-6 mb-8 flex flex-col items-center gap-2">
              <Link href="/events">
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
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Register Now
              </Button>
              <span className="text-red-600 text-sm font-semibold text-center mt-2">
                Spaces are limited
              </span>
            </div>
          )}

          {/* Featured Topics Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              💰 What You'll Learn
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Remote Arbitrage Strategies:</strong> How to leverage location differences for maximum profit</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Stealth Remote Work Setup:</strong> Technical tools to work undetected by employers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Digital Product Empire:</strong> Build passive income streams that travel with you</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Crypto & International Banking:</strong> Manage money across borders like a pro</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Freelance Rate Optimization:</strong> Command premium rates from anywhere in the world</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Q&A Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">🎯 Live Q&A with Active Nomads</h4>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <h6 className="font-bold text-green-600 mb-2">🇹🇭 Thailand Nomad Panel (15 mins)</h6>
                <p className="text-gray-700">Meet 3 nomads currently earning $5K-15K/month while based in Chiang Mai and Bangkok.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <h6 className="font-bold text-green-600 mb-2">💡 Main Strategies Presentation (35 mins)</h6>
                <p className="text-gray-700">Deep dive into the exact methods, tools, and systems our speakers use to maintain location independence.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <h6 className="font-bold text-green-600 mb-2">❓ Your Questions Answered (10 mins)</h6>
                <p className="text-gray-700">Get specific advice for your situation directly from people living the nomad lifestyle right now.</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <div className="flex justify-center items-center gap-8 text-center">
              <div>
                <div className="font-bold text-2xl text-gray-900">💰 $8K</div>
                <div className="text-gray-600 text-sm">Avg Monthly Income</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-900">🌏 25+</div>
                <div className="text-gray-600 text-sm">Countries Represented</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-900">⭐ 4.9/5</div>
                <div className="text-gray-600 text-sm">Attendee Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Gallery */}
      <SocialProof 
        images={[
          "/roamly/socialProof/1.jpg",
          "/roamly/socialProof/2.jpg", 
          "/roamly/socialProof/3.jpg",
          "/roamly/socialProof/4.jpg"
        ]}
        title="Success Stories"
        subtitle="Join hundreds of nomads who've built location-independent income streams"
      />

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

export default function MoneyWebinarPage() {
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
