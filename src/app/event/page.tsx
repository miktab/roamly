"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function EventRouterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  useEffect(() => {
    const eventId = searchParams.get("eventId")
    
    if (!eventId) {
      // If no eventId, redirect to events page
      router.push("/events")
      return
    }

    // Fetch event to get the eventType and redirect accordingly
    const fetchEventAndRedirect = async () => {
      try {
        const response = await fetch(`/api/event/get_event?eventId=${eventId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const event = await response.json()
        
        if (!event) {
          router.push("/events")
          return
        }

        // Route based on eventType
        const eventType = event.eventType?.replace(/\s+/g, '') || 'general'
        router.push(`/event/${eventType}?eventId=${eventId}`)
        
      } catch (error) {
        console.error("Error fetching event:", error)
        router.push("/events")
      }
    }

    fetchEventAndRedirect()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Redirecting to event...</p>
      </div>
    </div>
  )
}

export default function EventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventRouterContent />
    </Suspense>
  )
}
