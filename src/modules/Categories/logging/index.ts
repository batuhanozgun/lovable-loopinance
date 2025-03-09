
import { createLogger } from '@/modules/Logging';

// Ana modül logger
const logger = createLogger('Categories');

// Alt modül loggerları
const uiLogger = logger.createSubLogger('UI');
const serviceLogger = logger.createSubLogger('Services');
const categoryMutationLogger = logger.createSubLogger('Mutations');
const categoryQueryLogger = logger.createSubLogger('Queries');

export {
  logger as CategoriesLogger,
  uiLogger,
  serviceLogger,
  categoryMutationLogger,
  categoryQueryLogger
};

// Varsayılan dışa aktarım
export default logger;
