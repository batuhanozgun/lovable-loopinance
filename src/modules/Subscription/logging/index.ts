
import { createLogger } from '@/modules/Logging';

// Subscription modülü için temel logger
const logger = createLogger('Subscription');

// Subscription altındaki alt modüller için logger'lar
const subscriptionLogger = logger.createSubLogger('Service');
const eventsLogger = logger.createSubLogger('Events');
const viewsLogger = logger.createSubLogger('Views');

export {
  logger as SubscriptionLogger,
  subscriptionLogger,
  eventsLogger,
  viewsLogger
};
