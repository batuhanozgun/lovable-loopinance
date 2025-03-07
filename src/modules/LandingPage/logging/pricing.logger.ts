
import { LandingPageLogger } from './index';

// Fiyatlandırma modülü için genel logger
export const pricingLogger = LandingPageLogger.createSubLogger('Pricing');

// Alt modül loggerları
export const pricingEventsLogger = pricingLogger.createSubLogger('Events');
export const pricingAnalyticsLogger = pricingLogger.createSubLogger('Analytics');
export const pricingPerformanceLogger = pricingLogger.createSubLogger('Performance');
