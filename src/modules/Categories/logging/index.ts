
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

// Ana logger'ı dışa aktar
export { logger as categoriesLogger };
