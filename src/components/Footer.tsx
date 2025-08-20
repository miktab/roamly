'use client';

import React from 'react';
import { InstagramIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-sky-50 to-white text-gray-800 py-16 border-t border-sky-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-black bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: "'Inter', sans-serif" }}>Roamly</h3>
            <p className="text-sm text-gray-600 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Make money while traveling the world</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-sky-500 transition-colors font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-600 hover:text-sky-500 transition-colors font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-sky-500 transition-colors font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-sky-500 transition-colors font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-sky-500 transition-colors font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://instagram.com/roamly" className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="mailto:hello@roamly.com" className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <MailIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-sky-200 text-center">
          <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Roamly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
