
/**
 * Fiyat formatlama yardımcıları
 */
class PriceFormatter {
  /**
   * Fiyatı belirtilen para biriminde formatlar
   */
  formatPrice(price: number, currency: string = "USD", locale: string = "tr-TR"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }

  /**
   * Fiyatı basit şekilde formatlar
   */
  formatSimplePrice(price: number, decimals: number = 2): string {
    return price.toFixed(decimals);
  }
}

export const priceFormatter = new PriceFormatter();
