import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Events />
        <Testimonials />
        <CallToAction />
      </main>
    </div>
  );
}
