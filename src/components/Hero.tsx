import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, DollarSign } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-sky" />
      <div className="absolute inset-0 bg-gradient-watercolor opacity-50" />
      
      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-sky-300/30 rounded-full animate-float" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-sky-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/50 rounded-full animate-watercolor" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold hero-text leading-tight text-gray-800">
                <span className="block">Make Money</span>
                <span className="block text-primary">Digitally</span>
                <span className="block">& Regain Your Freedom</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 max-w-lg">
                This is a site to help you get started with making money digitally and regain your freedom. 
                Work from anywhere in the world. Live the dream of location independence and financial freedom.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/product/RemoteReadyBootcamp?productId=1">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Start Your Journey
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/product/RemoteReadyBootcamp?productId=1">
                <Button variant="cloud" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start text-darker">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Work Anywhere</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Unlimited Earning</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <Image 
                src={"/roamly/hero-above-clouds.jpg"} 
                alt="Digital nomad working above the clouds - representing freedom and remote work opportunities"
                className="w-full h-auto rounded-2xl shadow-floating animate-float"
                width={800}
                height={600}
                priority
              />
              <div className="absolute inset-0 bg-gradient-watercolor rounded-2xl opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;