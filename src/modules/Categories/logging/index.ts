
import { createLogger } from '@/modules/Logging';

// Categories modülü için temel logger
const logger = createLogger('Categories');

// Alt modüller için logger'lar
const categoriesLogger = logger.createSubLogger('Categories');
const operationsLogger = logger.createSubLogger('Operations');
const eventsLogger = logger.createSubLogger('Events');
const formsLogger = logger.createSubLogger('Forms');

export {
  logger as CategoriesLogger,
  categoriesLogger,
  operationsLogger,
  eventsLogger,
  formsLogger
};
