
import { createLogger } from '@/modules/Logging';

// AppLayout modülü için temel logger
const logger = createLogger('AppLayout');

// AppLayout altındaki alt modüller için logger'lar
const layoutLogger = logger.createSubLogger('Layout');
const sidebarLogger = logger.createSubLogger('Sidebar');
const appHeaderLogger = logger.createSubLogger('AppHeader');
const bottomNavLogger = logger.createSubLogger('BottomNav');

export {
  logger as AppLayoutLogger,
  layoutLogger,
  sidebarLogger,
  appHeaderLogger,
  bottomNavLogger
};
