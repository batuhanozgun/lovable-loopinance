
import { PaymentStatus } from './IPayment';

/**
 * Ödeme işlemi sonucunu tanımlar
 */
export interface IPaymentResult {
  success: boolean;
  transactionId?: string;
  status: PaymentStatus;
  amount?: number;
  currency?: string;
  timestamp?: string;
  error?: IPaymentError;
}

/**
 * Ödeme işlemi hatasını tanımlar
 */
export interface IPaymentError {
  code: string;
  message: string;
  details?: string;
}
