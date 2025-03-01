
import { useCallback } from 'react';

// Interface for user events
interface UserEvent {
  eventType: 'click' | 'scroll' | 'hover' | 'navigation';
  component: string;
  metadata?: Record<string, any>;
  timestamp: number;
}

// Logger for user events
export const useEventsLogger = () => {
  // Create a base event object
  const createEvent = useCallback((
    eventType: UserEvent['eventType'], 
    component: string, 
    metadata?: Record<string, any>
  ): UserEvent => {
    return {
      eventType,
      component,
      metadata,
      timestamp: Date.now()
    };
  }, []);

  // Log CTA button click
  const logCtaClick = useCallback((ctaType: string) => {
    const event = createEvent('click', 'CTA', { ctaType });
    console.log('[Event] CTA clicked:', event);
    // In a real application, this would send data to an analytics service
  }, [createEvent]);

  // Log navigation
  const logNavigation = useCallback((destination: string) => {
    const event = createEvent('navigation', 'Header', { destination });
    console.log('[Event] Navigation:', event);
    // In a real application, this would send data to an analytics service
  }, [createEvent]);

  // Log footer link click
  const logFooterLinkClick = useCallback((section: string, linkName: string) => {
    const event = createEvent('click', 'Footer', { section, linkName });
    console.log('[Event] Footer link clicked:', event);
    // In a real application, this would send data to an analytics service
  }, [createEvent]);

  // Log scroll position
  const logScrollPosition = useCallback((scrollDepth: number) => {
    const event = createEvent('scroll', 'Page', { scrollDepth });
    console.log('[Event] Scroll position:', event);
    // In a real application, this would send data to an analytics service
  }, [createEvent]);

  return {
    logCtaClick,
    logNavigation,
    logFooterLinkClick,
    logScrollPosition
  };
};
