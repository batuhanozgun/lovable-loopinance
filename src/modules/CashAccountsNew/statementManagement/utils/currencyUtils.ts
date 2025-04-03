
/**
 * Para birimi formatlama işlemleri için yardımcı fonksiyonlar
 */

import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';

/**
 * Belirli bir tutarı para birimi formatında formatlar
 * @param amount Formatlanacak tutar
 * @param locale Kullanılacak locale (tr-TR, en-US, vb.)
 * @param currency Para birimi türü
 * @returns Formatlanmış para birimi string değeri
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'tr-TR',
  currency: CurrencyType = CurrencyType.TRY
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    // Hata durumunda basit bir string döndür
    return `${amount} ${currency}`;
  }
};
