
/**
 * Ödeme durumu için enum
 */
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELED = 'canceled'
}

/**
 * Ödeme yöntemi için enum
 */
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  ONLINE_WALLET = 'online_wallet'
}

/**
 * Kredi kartı bilgilerini tanımlar
 */
export interface ICardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

/**
 * Ödeme detaylarını tanımlar
 */
export interface IPaymentDetails {
  amount: number;
  currency: string;
  method: PaymentMethod;
  cardDetails?: ICardDetails;
  description?: string;
}
