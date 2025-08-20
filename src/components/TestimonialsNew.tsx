import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, Instagram } from "lucide-react";

const TestimonialsNew: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Bali, Indonesia",
      image: "/roamly/testimonial-sarah.jpg",
      rating: 5,
      date: "2 weeks ago",
      text: "Roamly completely transformed my life! I went from a 9-5 office job to earning $4,000/month while traveling through Southeast Asia. The step-by-step system is incredible and the community support is amazing. Currently writing this from a beachside café in Canggu!"
    },
    {
      name: "Marcus Rodriguez",
      location: "Lisbon, Portugal",
      image: "/roamly/testimonial-marcus.jpg",
      rating: 5,
      date: "1 month ago",
      text: "Best investment I've ever made. Within 6 months, I built multiple income streams and now make more than my corporate salary. The freedom to work from anywhere is priceless. Just closed a $10k client deal from my Airbnb in Lisbon. Highly recommend!"
    },
    {
      name: "Elena Kowalski",
      location: "Mexico City, Mexico",
      image: "/roamly/testimonial-elena.jpg",
      rating: 5,
      date: "3 weeks ago",
      text: "The practical strategies actually work! I was skeptical at first, but Roamly's methods are proven and realistic. Started my online business 8 months ago and now I'm location independent. Living my dream in Mexico City while my income keeps growing."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Real stories from digital nomads who've transformed their lives with Roamly's wealth creation systems.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                {/* Header with profile and rating */}
                <div className="flex items-start gap-4 mb-4">
                  <Image 
                    src={testimonial.image} 
                    alt={`${testimonial.name} profile picture`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    width={48}
                    height={48}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <span className="text-sm text-gray-600">{testimonial.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{testimonial.location}</p>
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                
                {/* Review text */}
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Instagram CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Want to see more success stories?
              </h3>
              <p className="text-gray-700">
                Follow our Instagram for daily updates from our community
              </p>
              <Button variant="default" size="lg" className="text-lg px-8 py-4">
                <Instagram className="mr-2 h-5 w-5" />
                Follow @RoamlyOfficial
              </Button>
            </div>
          </div>
        </div>
        
        {/* Review summary */}
        <div className="text-center mt-12 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            {renderStars(5)}
            <span className="text-lg font-semibold text-gray-900 ml-2">4.9/5</span>
          </div>
          <p className="text-gray-700">Based on 2,847+ reviews from our community</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsNew;
