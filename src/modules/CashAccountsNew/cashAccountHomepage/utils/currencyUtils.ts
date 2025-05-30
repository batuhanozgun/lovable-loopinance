
import { CurrencyType } from '../types';

/**
 * Para birimini formatlar
 * @param amount Formatlanacak miktar
 * @param currency Para birimi
 * @returns Formatlanmış para birimi dizgisi
 */
export const formatCurrency = (amount: number, currency: CurrencyType): string => {
  const formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

/**
 * Sayıyı belirli bir para birimi formatına göre formatlar (para birimi sembolü olmadan)
 * @param amount Formatlanacak miktar
 * @param currency Para birimi
 * @returns Formatlanmış sayı dizgisi
 */
export const formatNumberByCurrency = (amount: number, currency: CurrencyType): string => {
  const formatter = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};
