'use client';

import { useState, useEffect } from 'react';
import { trackEngagement } from '@/lib/analytics';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    
    // Track consent acceptance
    trackEngagement('cookie_consent_accepted', {
      consent_timestamp: new Date().toISOString(),
      page_url: window.location.pathname
    });
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    
    // Track consent decline
    trackEngagement('cookie_consent_declined', {
      consent_timestamp: new Date().toISOString(),
      page_url: window.location.pathname
    });
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            We use cookies and analytics to improve your experience and provide better service. 
            By using our site, you consent to our use of cookies for analytics and marketing purposes.
          </p>
          <div className="mt-2">
            <a 
              href="/privacy" 
              className="text-primary hover:text-accent underline"
              onClick={() => trackEngagement('privacy_policy_click', { source: 'cookie_banner' })}
            >
              Learn more in our Privacy Policy
            </a>
          </div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm bg-transparent border border-gray-400 text-gray-300 hover:bg-gray-700 rounded transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-primary hover:bg-primary-dark text-white rounded transition-colors"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}