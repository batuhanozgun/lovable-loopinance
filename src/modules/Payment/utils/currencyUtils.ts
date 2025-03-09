
/**
 * Para birimini formatlar
 * @param price Fiyat değeri
 * @param locale Locale değeri (tr-TR, en-US vb.)
 * @param currency Para birimi kodu (TRY, USD vb.)
 * @param displayCurrencySymbol Özel para birimi sembolü (₺, $, € vb.)
 */
export const formatCurrency = (
  price: number, 
  locale = 'tr-TR', 
  currency = 'TRY', 
  displayCurrencySymbol = '₺'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price).replace(currency === 'TRY' ? '₺' : getSymbolFromCurrency(currency), displayCurrencySymbol);
};

/**
 * Para birimi kodundan sembolü döndürür
 */
export const getSymbolFromCurrency = (currencyCode: string): string => {
  const symbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'TRY': '₺',
    'GBP': '£',
    'JPY': '¥',
    'CNY': '¥'
  };
  
  return symbols[currencyCode] || currencyCode;
};
