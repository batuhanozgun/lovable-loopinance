
import { formatCurrency } from '@/modules/Payment/utils/currencyUtils';
import { SubscriptionPlanType } from '../../../../types/ISubscription';

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  formattedAmount: string;
  status: 'paid' | 'pending' | 'failed';
  plan: SubscriptionPlanType;
}

interface PaymentMethod {
  type: 'card';
  lastFour: string;
  expiry: string;
  brand: string;
  isDefault: boolean;
}

// Demo fatura verileri
export const getDemoInvoices = (locale: string, currency: string): Invoice[] => {
  const monthlyPrice = locale.startsWith('tr') ? 49 : 4.99;
  const yearlyPrice = locale.startsWith('tr') ? 468 : 59.88;
  
  return [
    {
      id: 'INV-001',
      date: new Date(2023, 11, 1),
      amount: yearlyPrice,
      formattedAmount: formatCurrency(yearlyPrice, locale, currency),
      status: 'paid',
      plan: SubscriptionPlanType.YEARLY
    },
    {
      id: 'INV-002',
      date: new Date(2022, 11, 1),
      amount: yearlyPrice,
      formattedAmount: formatCurrency(yearlyPrice, locale, currency),
      status: 'paid',
      plan: SubscriptionPlanType.YEARLY
    },
    {
      id: 'INV-003',
      date: new Date(2021, 11, 1),
      amount: monthlyPrice,
      formattedAmount: formatCurrency(monthlyPrice, locale, currency),
      status: 'paid',
      plan: SubscriptionPlanType.MONTHLY
    }
  ];
};

// Ödeme yöntemleri
export const getPaymentMethods = (): PaymentMethod[] => {
  return [
    {
      type: 'card',
      lastFour: '4242',
      expiry: '12/25',
      brand: 'Visa',
      isDefault: true
    }
  ];
};
