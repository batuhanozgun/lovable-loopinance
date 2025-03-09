
import { categoriesLogger } from './categories.logger';
import { uiLogger } from './ui.logger';
import { operationsLogger } from './operations.logger';
import { serviceLogger } from './service.logger';
import { formsLogger } from './forms.logger';
import { eventsLogger } from './events.logger';

// Tüm loggerları dışa aktar
export {
  categoriesLogger,
  uiLogger,
  operationsLogger,
  serviceLogger,
  formsLogger,
  eventsLogger
};

// Varsayılan dışa aktarım
export default categoriesLogger;
