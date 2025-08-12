'use client';

import { useState, useEffect } from 'react';
import { 
  trackEvent, 
  trackFormStep, 
  trackFormSubmission, 
  trackCTAClick,
  trackFormNavigation,
  trackEngagement
} from '@/lib/analytics';

// Debug component to test GA4 events (only in development)
export default function AnalyticsDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  useEffect(() => {
    // Only run on client side and in development
    if (typeof window === 'undefined') return;
    
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    // Listen for GA4 events
    const originalGtag = window.gtag;
    if (originalGtag) {
      window.gtag = (...args: unknown[]) => {
        // Log events to console and state
        if (args[0] === 'event') {
          const eventName = args[1];
          const eventParams = args[2] || {};
          const logEntry = `${new Date().toLocaleTimeString()}: ${eventName} - ${JSON.stringify(eventParams)}`;
          setEventLog(prev => [logEntry, ...prev.slice(0, 9)]);
          console.log('🔥 GA4 Event:', eventName, eventParams);
        }
        originalGtag(...args);
      };
    }
  }, []);

  const testEvents = {
    'Test Form Step': () => trackFormStep(1, 'Test Step', { test: true }),
    'Test CTA Click': () => trackCTAClick('Test Button', 'Debug Panel'),
    'Test Form Navigation': () => trackFormNavigation('next', 1, 2),
    'Test Engagement': () => trackEngagement('test_engagement', { source: 'debug' }),
    'Test Form Submission': () => trackFormSubmission({
      goatType: 'test',
      goatCount: '1-5',
      urgency: 'planning',
      zipCode: '12345',
      name: 'Test User',
      phone: '555-0123',
      email: 'test@example.com'
    }),
    'Test Custom Event': () => trackEvent({
      action: 'test_custom_event',
      category: 'Testing',
      label: 'Debug Panel Test',
      value: 1
    })
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-2xl z-[100] max-w-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-green-400">🔬 GA4 Debug Panel</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-lg font-bold"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-xs text-gray-300">
          GA4 ID: {process.env.NEXT_PUBLIC_GA_ID || 'Not configured'}
        </p>
        <p className="text-xs text-gray-300">
          Events Tracked: {eventLog.length}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1 mb-4">
        {Object.entries(testEvents).map(([name, handler]) => (
          <button
            key={name}
            onClick={handler}
            className="text-xs bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded transition-colors"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-3">
        <div className="text-xs text-gray-300 mb-2">Recent Events:</div>
        <div className="max-h-32 overflow-y-auto space-y-1">
          {eventLog.length > 0 ? (
            eventLog.map((log, index) => (
              <div key={index} className="text-xs text-green-300 font-mono break-all">
                {log}
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500">No events tracked yet...</div>
          )}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          Open browser dev tools to see detailed event logs
        </div>
      </div>
    </div>
  );
}