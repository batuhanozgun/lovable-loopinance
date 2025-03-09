
import { createLogger } from '@/modules/Logging';

// Ana modül loggeri
export const categoriesLogger = createLogger('Categories');

// Alt modül loggerları
export const uiLogger = categoriesLogger.createSubLogger('UI');
export const eventsLogger = categoriesLogger.createSubLogger('Events');
export const operationsLogger = categoriesLogger.createSubLogger('Operations');
export const formsLogger = categoriesLogger.createSubLogger('Forms');
export const apiLogger = categoriesLogger.createSubLogger('API');

// Tip güvenliği için isim exportu
export const CategoriesLogger = 'Categories';
