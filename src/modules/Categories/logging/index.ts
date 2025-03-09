
import { createLogger } from '@/modules/Logging';

// Ana kategori modülü loggeri
export const categoriesLogger = createLogger('Categories');

// Alt modüller için özelleştirilmiş loggerlar
export const operationsLogger = categoriesLogger.createSubLogger('Operations');
export const validationLogger = categoriesLogger.createSubLogger('Validation');
export const uiLogger = categoriesLogger.createSubLogger('UI');
export const performanceLogger = categoriesLogger.createSubLogger('Performance');

// Hizmetler için loggerlar
export const categoryServiceLogger = operationsLogger.createSubLogger('CategoryService');
export const categoryQueryLogger = operationsLogger.createSubLogger('Query');
export const categoryMutationLogger = operationsLogger.createSubLogger('Mutation');
