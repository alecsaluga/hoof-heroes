'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trackCTAClick } from '@/lib/analytics';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            {/* Goat Icon SVG */}
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Professional goat hoof trimming services icon"
              >
                {/* Simple goat head icon */}
                <path 
                  d="M12 3C8.5 3 6 5.5 6 8.5C6 9.5 6.2 10.4 6.6 11.2L5 13L6.5 14.5L8 13C9.2 14.2 10.5 14.8 12 14.8C13.5 14.8 14.8 14.2 16 13L17.5 14.5L19 13L17.4 11.2C17.8 10.4 18 9.5 18 8.5C18 5.5 15.5 3 12 3Z" 
                  fill="currentColor"
                />
                <circle cx="10" cy="8" r="1" fill="white" />
                <circle cx="14" cy="8" r="1" fill="white" />
                {/* Horns */}
                <path d="M9 4L8 2M15 4L16 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Beard */}
                <path d="M12 12L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            
            <div>
              <div className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}>
                Hoof <span className="text-primary">Heroes</span>
              </div>
              <div className={`text-xs -mt-1 transition-colors duration-300 ${
                isScrolled ? 'text-gray-500' : 'text-gray-600'
              }`}>Professional Goat Care</div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <a href="#services" className={`font-medium transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-700 hover:text-primary'
            }`}>
              Services
            </a>
            <a href="#faq" className={`font-medium transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-700 hover:text-primary'
            }`}>
              FAQ
            </a>
            <Link href="/privacy" className={`font-medium transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-primary' : 'text-gray-700 hover:text-primary'
            }`}>
              Privacy
            </Link>
            <button 
              onClick={() => {
                trackCTAClick('Get Quote', 'Header Navigation');
                const form = document.querySelector('#get-quote-btn') as HTMLButtonElement;
                if (form) form.click();
              }}
              className="btn-primary text-sm px-4 py-2"
            >
              Get Quote
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => {
                trackCTAClick('Get Quote', 'Header Navigation');
                const form = document.querySelector('#get-quote-btn') as HTMLButtonElement;
                if (form) form.click();
              }}
              className="btn-primary text-sm px-4 py-2"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}