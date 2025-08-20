'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, Video } from "lucide-react";

interface Event {
  eventId: number;
  gmtdatetime: string;
  title: string;
  country: string | null;
  city: string | null;
  timezone: string;
  price: number;
  currency: string;
  duration_in_minutes: number;
  soldOut: boolean;
  eventType: string;
  zoomInvite: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/get_events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string, timezone: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  const handleEventClick = (eventId: number) => {
    router.push(`/event?eventId=${eventId}`);
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white" id="events">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-700">
              Loading upcoming events...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-white" id="events">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <p className="text-lg text-red-600">
              Error loading events: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-20 px-4 bg-white" id="events">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-700">
              No upcoming events at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white" id="events">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-700">
            Join our exclusive sessions and learn cutting-edge income strategies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card 
              key={event.eventId} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 relative overflow-hidden bg-white border border-gray-200"
              onClick={() => handleEventClick(event.eventId)}
            >
              {event.soldOut && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                  Sold Out
                </Badge>
              )}
              
              <CardHeader>
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    {event.eventType}
                  </Badge>
                  <CardTitle className="text-xl leading-tight text-gray-900">{event.title}</CardTitle>
                  {event.city && event.country && (
                    <CardDescription className="text-sm text-gray-600">
                      {event.city}, {event.country}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(event.gmtdatetime)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {formatTime(event.gmtdatetime, event.timezone)} • {event.duration_in_minutes} min
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Video className="w-4 h-4" />
                      <span className="text-sm">Online Event</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-900 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">
                        {event.price === 0 ? 'Free' : `${event.price} ${event.currency}`}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={event.soldOut}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event.eventId);
                    }}
                  >
                    {event.soldOut ? 'Sold Out' : 'Learn More'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => router.push('/events')}>
              View All Events
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
