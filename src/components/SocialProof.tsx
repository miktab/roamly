"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

interface SocialProofProps {
  images: string[]
  title?: string
  subtitle?: string
}

const SocialProof = ({ images, title = "Success Stories", subtitle = "Join thousands who've transformed their lives" }: SocialProofProps) => {
  return (
    <section className="py-16 bg-gradient-to-br from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {images.map((imageSrc, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
            >
              <div className="aspect-square relative">
                <Image
                  src={imageSrc}
                  alt={`Success story ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-8 h-8 bg-sky-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-10 w-6 h-6 bg-sky-500/20 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>
    </section>
  )
}

export default SocialProof
