
import { createLogger } from '@/modules/Logging';

// Ana kategori modülü loggerları
export const categoriesLogger = createLogger('Categories');
export const uiLogger = createLogger('Categories.UI');
export const serviceLogger = createLogger('Categories.Service');
export const formsLogger = createLogger('Categories.Forms');
export const operationsLogger = createLogger('Categories.Operations');

// Varsayılan dışa aktarım
export default categoriesLogger;
