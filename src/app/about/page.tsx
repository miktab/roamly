import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Roamly
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            We're on a mission to help digital nomads and remote workers create sustainable income streams while exploring the world.
          </p>
          <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden">
            <Image
              src="/roamly/hero-above-clouds.jpg"
              alt="Digital nomads working above the clouds"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Roamly was born from the belief that work and travel don't have to be mutually exclusive. 
                We've helped thousands of professionals transition to location-independent lifestyles while 
                maintaining and growing their income.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our team consists of experienced digital nomads, entrepreneurs, and remote work specialists 
                who understand the challenges and opportunities of the modern workforce.
              </p>
              <Link href="/events">
                <Button variant="hero" size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white">
                  Join Our Next Event
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/roamly/testimonial-sarah.jpg"
                alt="Digital nomad working remotely"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Freedom</h3>
              <p className="text-slate-300 leading-relaxed">
                We believe everyone deserves the freedom to work from anywhere and design their ideal lifestyle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Innovation</h3>
              <p className="text-slate-300 leading-relaxed">
                We constantly explore new income strategies and technologies to help our community thrive.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Community</h3>
              <p className="text-slate-300 leading-relaxed">
                We foster a supportive community where nomads share experiences and help each other succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of digital nomads who have transformed their careers with Roamly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button variant="default" size="lg">
                View Upcoming Events
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
