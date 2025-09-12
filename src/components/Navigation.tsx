'use client'

import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

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
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="hero" size="sm" className="text-white">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="hero" size="sm" className="text-white">
                  Sign In
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
                <div className="space-y-3 pt-2">
                  <Link href="/dashboard">
                    <Button variant="hero" size="sm" className="w-full text-white">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="w-full text-gray-700 hover:text-gray-900"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <Button variant="hero" size="sm" className="w-full mt-4 text-white">
                    Sign In
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