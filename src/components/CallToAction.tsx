import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-sky" />
      <div className="absolute inset-0 bg-gradient-watercolor opacity-60" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-1/4 w-20 h-20 bg-sky-500/20 rounded-full animate-watercolor" />
      <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-white/30 rounded-full animate-float" />
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-sky-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Sparkles className="h-6 w-6" />
              <span className="text-lg font-semibold">Ready to Start?</span>
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold hero-text leading-tight">
              Your Adventure Awaits
            </h2>
            <p className="text-xl lg:text-2xl hero-subtext max-w-2xl mx-auto">
              Join thousands of successful digital nomads who've transformed their lives 
              with Roamly's proven wealth creation systems.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="http://localhost:3000/product?productId=1">
              <Button variant="hero" size="lg" className="text-lg px-12 py-6">
                Get Started Today
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-darker">
              No experience required • Start earning in 30 days
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-darker">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-darker">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">$2M+</div>
              <div className="text-sm text-darker">Generated Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;