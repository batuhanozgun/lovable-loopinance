
import { useEffect } from 'react';
import { useEventsLogger } from '../logging/events.logger';

export const useScrollTracking = () => {
  const { logScrollPosition } = useEventsLogger();

  useEffect(() => {
    let lastLoggedPosition = 0;
    const scrollThreshold = 20; // Log every 20% scroll

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate scroll depth as percentage
      const scrollDepth = Math.min(
        100,
        Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
      );
      
      // Only log if we've passed a new threshold
      const currentThreshold = Math.floor(scrollDepth / scrollThreshold) * scrollThreshold;
      if (currentThreshold > lastLoggedPosition) {
        lastLoggedPosition = currentThreshold;
        logScrollPosition(currentThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [logScrollPosition]);
};
