
import { LoggerService } from '@/modules/Logging/services/LoggerService';

// Payment işlemleri için logger
export const payment = LoggerService.getInstance('Payment.Payment');
