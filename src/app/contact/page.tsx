import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Have questions about our events or services? We're here to help you start your digital nomad journey.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            {/* Contact Info */}
            <div className="space-y-8 w-full max-w-2xl">
              <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Mail className="w-6 h-6 text-emerald-500 mr-3" />
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-slate-700/50 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Email us at</p>
                      <a href="mailto:roamlyofficial@gmail.com" className="text-lg font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                        roamlyofficial@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-slate-700/50 backdrop-blur-sm rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Based in</p>
                      <p className="text-lg font-semibold text-white">Worldwide (Remote Team)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Office Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="font-medium text-slate-300">Monday - Friday</span>
                    <span className="text-emerald-400 font-semibold">9:00 AM - 6:00 PM (UTC)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="font-medium text-slate-300">Saturday</span>
                    <span className="text-emerald-400 font-semibold">10:00 AM - 4:00 PM (UTC)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-slate-300">Sunday</span>
                    <span className="text-slate-500 font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-8 rounded-2xl shadow-lg border border-slate-600">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-emerald-400 font-bold text-sm">⚡</span>
                  </div>
                  Response Time
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  We typically respond to all inquiries within <span className="font-semibold text-emerald-400">24 hours</span> during business days.
                </p>
                <div className="bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl">
                  <p className="text-sm text-slate-400">💡 <strong>Pro tip:</strong> Include your timezone for faster scheduling!</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Quick Questions?
                </h3>
                <p className="text-emerald-100 mb-6 leading-relaxed">
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
