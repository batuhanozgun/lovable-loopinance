
// Feature type definition
export interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

// Analytics event types
export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  COMPONENT_VIEW = 'component_view',
  CTA_CLICK = 'cta_click',
  NAVIGATION = 'navigation',
  SCROLL = 'scroll'
}

// User event types
export interface UserEventData {
  eventType: AnalyticsEventType;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Page analytics data
export interface PageAnalyticsData {
  viewDuration: number;
  scrollDepth: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  viewportWidth: number;
  viewportHeight: number;
}
