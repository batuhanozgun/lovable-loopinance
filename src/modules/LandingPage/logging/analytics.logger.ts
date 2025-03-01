
import { useCallback } from 'react';

// Interface for page analytics
interface PageAnalytics {
  viewDuration: number;
  scrollDepth: number;
  deviceType: string;
  viewportWidth: number;
  viewportHeight: number;
}

// Logger for analytics data
export const useAnalyticsLogger = () => {
  // Get device type
  const getDeviceType = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }, []);

  // Log component view
  const logComponentView = useCallback((componentName: string) => {
    console.log(`[Analytics] Component viewed: ${componentName}`);
    // In a real application, this would send data to an analytics service
  }, []);

  // Log page analytics
  const logPageAnalytics = useCallback((data: Partial<PageAnalytics>) => {
    const analytics: PageAnalytics = {
      viewDuration: data.viewDuration || 0,
      scrollDepth: data.scrollDepth || 0,
      deviceType: data.deviceType || getDeviceType(),
      viewportWidth: data.viewportWidth || window.innerWidth,
      viewportHeight: data.viewportHeight || window.innerHeight
    };
    
    console.log('[Analytics] Page analytics:', analytics);
    // In a real application, this would send data to an analytics service
  }, [getDeviceType]);

  return {
    logComponentView,
    logPageAnalytics,
    getDeviceType
  };
};
