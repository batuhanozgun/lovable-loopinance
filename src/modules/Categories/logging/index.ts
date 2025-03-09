
import { categoriesLogger } from './categories.logger';
import { uiLogger } from './ui.logger';
import { operationsLogger } from './operations.logger';
import { serviceLogger } from './service.logger';
import { formsLogger } from './forms.logger';

// Tüm loggerları dışa aktar
export {
  categoriesLogger,
  uiLogger,
  operationsLogger,
  serviceLogger,
  formsLogger
};

// Varsayılan dışa aktarım
export default categoriesLogger;
