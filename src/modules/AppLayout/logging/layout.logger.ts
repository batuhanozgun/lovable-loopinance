
import { LoggerService } from '@/modules/Logging/services/LoggerService';

export const LayoutLogger = {
  getInstance: (context = 'AppLayout') => {
    return LoggerService.getInstance(context);
  }
};
