'use client'

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-gray-800 hover:text-primary transition-colors">
            Roamly
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/jobs" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Jobs
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            {session ? (
              <Link href="/dashboard">
                <Button variant="hero" size="sm" className="text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="http://localhost:3000/product?productId=1">
                <Button variant="hero" size="sm" className="text-white">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <Link href="/about" className="block text-gray-700 hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link href="/jobs" className="block text-gray-700 hover:text-primary transition-colors font-medium">
                Jobs
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              {session ? (
                <Link href="/dashboard">
                  <Button variant="hero" size="sm" className="w-full mt-4 text-white">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="http://localhost:3000/product?productId=1">
                  <Button variant="hero" size="sm" className="w-full mt-4 text-white">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;