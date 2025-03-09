
import { payment } from './payment.logger';

// Tüm loglayıcıları dışa aktar
export const paymentLoggers = {
  payment
};

// Doğrudan erişim için kısayollar
export { payment as paymentLogger } from './payment.logger';
