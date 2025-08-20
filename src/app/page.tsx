import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Products from "@/components/Products";
import TestimonialsNew from "@/components/TestimonialsNew";
import CallToAction from "@/components/CallToAction";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Products />
      <TestimonialsNew />
      <CallToAction />
    </div>
  );
}
