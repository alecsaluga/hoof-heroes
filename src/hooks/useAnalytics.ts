'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pageview, trackScroll, trackEngagement } from '@/lib/analytics';

// Custom hook for page view tracking
export const usePageTracking = () => {
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      pageview(window.location.pathname);
    }
    
  }, [router]);
};

// Custom hook for scroll tracking
export const useScrollTracking = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    let ticking = false;
    const scrollThresholds = [25, 50, 75, 90];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.round((scrollTop / docHeight) * 100);

          // Track scroll milestones
          scrollThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
              trackScroll(threshold);
              trackedThresholds.add(threshold);
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Custom hook for engagement tracking
export const useEngagementTracking = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    let startTime = Date.now();
    let isActive = true;
    const engagementTimeout: NodeJS.Timeout = setTimeout(() => {
      if (isActive) {
        trackEngagement('30_second_engagement', {
          page_url: window.location.pathname,
          timestamp: new Date().toISOString()
        });
      }
    }, 30000);

    // Track when user becomes active/inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        const sessionTime = Date.now() - startTime;
        trackEngagement('session_time', { 
          duration_seconds: Math.round(sessionTime / 1000),
          page_url: window.location.pathname
        });
      } else {
        isActive = true;
        startTime = Date.now();
      }
    };

    // Track user activity
    const handleUserActivity = () => {
      if (!isActive) {
        isActive = true;
        startTime = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mousemove', handleUserActivity, { passive: true });
    document.addEventListener('keypress', handleUserActivity, { passive: true });
    document.addEventListener('scroll', handleUserActivity, { passive: true });
    document.addEventListener('click', handleUserActivity, { passive: true });

    return () => {
      clearTimeout(engagementTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
      document.removeEventListener('scroll', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
    };
  }, []);
};

// Combined analytics hook
export const useAnalytics = () => {
  usePageTracking();
  useScrollTracking(); 
  useEngagementTracking();
};