
import { useEffect, useState, useCallback } from 'react';
import { analyticsLogger } from '../logging';

export const usePageAnalytics = () => {
  const [startTime] = useState<number>(Date.now());
  const [scrollDepth, setScrollDepth] = useState<number>(0);

  const logPageAnalytics = useCallback(({ viewDuration, scrollDepth }: { viewDuration: number, scrollDepth: number }) => {
    analyticsLogger.info("Page analytics data recorded", { viewDuration, scrollDepth });
  }, []);

  // Calculate and update scroll depth
  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // Calculate scroll depth as percentage
    const newScrollDepth = Math.min(
      100,
      Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
    );
    
    setScrollDepth(newScrollDepth);
  }, []);

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Log analytics on unmount or every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const viewDuration = Math.round((Date.now() - startTime) / 1000);
      logPageAnalytics({ viewDuration, scrollDepth });
    }, 30000); // Log every 30 seconds

    return () => {
      clearInterval(interval);
      const viewDuration = Math.round((Date.now() - startTime) / 1000);
      logPageAnalytics({ viewDuration, scrollDepth });
    };
  }, [startTime, scrollDepth, logPageAnalytics]);

  return { scrollDepth, logPageAnalytics };
};
