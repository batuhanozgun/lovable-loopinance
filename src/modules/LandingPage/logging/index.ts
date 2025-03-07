
import { createLogger } from '@/modules/Logging';

// LandingPage modülü için temel logger
const logger = createLogger('LandingPage');

// Alt modüller için logger'lar
const analyticsLogger = logger.createSubLogger('Analytics');
const eventsLogger = logger.createSubLogger('Events');
const performanceLogger = logger.createSubLogger('Performance');

export {
  logger as LandingPageLogger,
  analyticsLogger,
  eventsLogger,
  performanceLogger
};
