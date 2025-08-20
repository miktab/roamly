"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RemoteReadyBootcampPage() {
  const [activeTab, setActiveTab] = useState("class-info")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const mentors = [
    {
      name: "Carlos Rodriguez",
      location: "Barcelona, Spain",
      expertise: "Digital Marketing & E-commerce",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      expertise: "Software Development & Tech",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Priya Sharma",
      location: "Bangkok, Thailand",
      expertise: "Content Creation & Social Media",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Lucas Silva",
      location: "Rio de Janeiro, Brazil",
      expertise: "Freelancing & Remote Work Strategy",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "class-info":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Remote Ready Bootcamp - Digital Nomad Lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Program Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">Start your online business in 14 days from scratch</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">Online course with direct mentor access</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">Real digital nomad mentors (not just teachers)</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white">Travel tips for choosing your destination</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-yellow-400 font-semibold mb-4">TRANSFORM YOUR LIFE:</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Ready to break free from the 9-to-5 grind? Our intensive 14-day bootcamp will teach you everything you
                need to become location-independent and start earning while traveling the world. Learn from real digital
                nomads currently living and working from Spain, Thailand, Japan, and Brazil.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">What You'll Master:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Making an income online by yourself - complete independence</li>
                    <li>• Setting up your digital product business from scratch</li>
                    <li>• Working from anywhere in the world</li>
                    <li>• Secret methods used by real digital nomads (insider tactics)</li>
                    <li>• Connect with other people making money while traveling</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Program Format:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Build multiple income streams simultaneously</li>
                    <li>• Master the art of location scouting for nomads</li>
                    <li>• Learn visa strategies for long-term travel</li>
                    <li>• Network with our global community of earners</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case "mentors":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Program Put Together by These People</h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our mentors aren't just teaching theory - they're living the digital nomad lifestyle right now, earning
                income from beautiful locations around the world and have designed this program based on their real
                experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {mentors.map((mentor, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg">{mentor.name}</h4>
                        <p className="text-blue-400 text-sm mb-2">📍 Currently in {mentor.location}</p>
                        <p className="text-gray-300 text-sm">{mentor.expertise}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-4">Why This Program Works</h4>
              <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">Created by Practitioners</h5>
                  <p className="text-sm">
                    Program designed by people actually living the lifestyle, not just teaching it
                  </p>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">Proven Methods</h5>
                  <p className="text-sm">Every strategy taught is currently being used by our mentors to earn income</p>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">Real-World Tested</h5>
                  <p className="text-sm">All techniques have been tested across different countries and markets</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "faq":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need any prior experience to join?",
                  a: "No prior experience required! Our bootcamp is designed for complete beginners who want to transition to remote work and start their own online business from scratch.",
                },
                {
                  q: "What if I can't attend all live sessions?",
                  a: "All sessions are recorded and available for lifetime access. You can catch up at your own pace and still get direct mentor access through our community.",
                },
                {
                  q: "How quickly can I start earning after the bootcamp?",
                  a: "Many students start generating their first income within 30-60 days of completing the program. The secret methods we teach are designed for quick implementation and results.",
                },
                {
                  q: "Is there ongoing support after the 14 days?",
                  a: "Yes! You get lifetime access to our private community of digital nomads making money while traveling, plus monthly group coaching calls with mentors.",
                },
                {
                  q: "What equipment do I need?",
                  a: "Just a laptop and reliable internet connection. We'll show you any tools or software you need during the bootcamp, plus give you travel tips for staying connected anywhere.",
                },
                {
                  q: "How is this different from other online courses?",
                  a: "Our mentors are actually living as digital nomads right now - earning money from Spain, Thailand, Japan, and Brazil. You're learning from people doing it, not just teaching it.",
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold">{faq.q}</h4>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === index ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-300">{faq.a}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Be Remote Ready</h1>
            <p className="text-xl text-gray-300 mb-2">Ready to earn and travel in 14 days</p>
            <p className="text-lg text-blue-400">14-Day Intensive Bootcamp</p>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-yellow-400 font-semibold mb-2">🌍 Taught by Real Digital Nomads</p>
            <p className="text-gray-300">Currently living and working from Spain • Thailand • Japan • Brazil</p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
              Register Now - Transform Your Life
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "class-info", label: "Class Info" },
              { id: "mentors", label: "Your Mentors" },
              { id: "faq", label: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-white text-white"
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {activeTab === "class-info" && "About this Class"}
            {activeTab === "mentors" && "Meet Your Mentors"}
            {activeTab === "faq" && "Questions & Answers"}
          </h2>
        </div>

        {renderTabContent()}

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
            Register Now - Start Your Journey
          </Button>
          <p className="text-gray-400 mt-4 text-sm">Join hundreds of students who've transformed their lives</p>
        </div>
      </div>
    </div>
  )
}
