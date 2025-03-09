
import { createLogger } from '@/modules/Logging';

// Ana kategori logger'ı
const logger = createLogger('Categories');

// Alt modüller için logger'lar
export const categoryQueryLogger = logger.createSubLogger('Query');
export const categoryMutationLogger = logger.createSubLogger('Mutation');
export const categoryUILogger = logger.createSubLogger('UI');
export const categoryValidationLogger = logger.createSubLogger('Validation');
export const operationsLogger = logger.createSubLogger('Operations');
export const apiLogger = logger.createSubLogger('API');
export const formsLogger = logger.createSubLogger('Forms');
export const eventsLogger = logger.createSubLogger('Events');
export const uiLogger = logger.createSubLogger('UI');
export const categoryServiceLogger = logger.createSubLogger('Service');

// Ana logger'ı dışa aktar
export { logger as categoriesLogger, logger as CategoriesLogger };
