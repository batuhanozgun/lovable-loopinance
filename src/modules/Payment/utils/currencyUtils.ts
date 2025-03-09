
/**
 * Para birimini formatlar
 * @param price Fiyat değeri
 * @param locale Locale değeri (tr-TR, en-US vb.)
 * @param currency Para birimi kodu (TRY, USD vb.)
 * @param displayCurrencySymbol Özel para birimi sembolü (₺, $, € vb.) - opsiyonel
 */
export const formatCurrency = (
  price: number, 
  locale = 'tr-TR', 
  currency = locale === 'tr-TR' ? 'TRY' : 'USD', 
  displayCurrencySymbol?: string
): string => {
  // NumberFormat ile para birimini formatla
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
  
  // Eğer özel sembol belirtildiyse, para birimi sembolünü değiştir
  if (displayCurrencySymbol) {
    const currencySymbol = getSymbolFromCurrency(currency);
    return formatted.replace(currencySymbol, displayCurrencySymbol);
  }
  
  return formatted;
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
