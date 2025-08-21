import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Have questions about our events or services? We're here to help you start your digital nomad journey.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center mr-3">
                  <Mail className="w-5 h-5 text-sky-600" />
                </div>
                Send us a message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input 
                      type="text" 
                      placeholder="Your first name" 
                      className="border-gray-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input 
                      type="text" 
                      placeholder="Your last name" 
                      className="border-gray-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="border-gray-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input 
                    type="text" 
                    placeholder="What's this about?" 
                    className="border-gray-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="border-gray-200 focus:border-sky-500 focus:ring-sky-200 rounded-xl resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200" 
                  size="lg"
                >
                  Send Message ✨
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-2xl shadow-lg border border-sky-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Mail className="w-6 h-6 text-sky-500 mr-3" />
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email us at</p>
                      <a href="mailto:hello@roamly.com" className="text-lg font-semibold text-sky-700 hover:text-sky-800 transition-colors">
                        hello@roamly.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Based in</p>
                      <p className="text-lg font-semibold text-gray-800">Worldwide (Remote Team)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                  Office Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Monday - Friday</span>
                    <span className="text-sky-600 font-semibold">9:00 AM - 6:00 PM (UTC)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Saturday</span>
                    <span className="text-sky-600 font-semibold">10:00 AM - 4:00 PM (UTC)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">Sunday</span>
                    <span className="text-gray-500 font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-indigo-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold text-sm">⚡</span>
                  </div>
                  Response Time
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We typically respond to all inquiries within <span className="font-semibold text-indigo-600">24 hours</span> during business days.
                </p>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  <p className="text-sm text-gray-600">💡 <strong>Pro tip:</strong> Include your timezone for faster scheduling!</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-400 to-blue-500 p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Quick Questions?
                </h3>
                <p className="text-sky-100 mb-6 leading-relaxed">
                  For immediate answers, check out our upcoming events or join our community of digital nomads.
                </p>
                <Button variant="secondary" className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-200">
                  View FAQ & Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
