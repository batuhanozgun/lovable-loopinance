
/**
 * Tam ve ondalık kısımları birleştirerek decimal değer oluşturur
 */
export const combineAmountParts = (whole: string, decimal: string): number => {
  const cleanWhole = whole.replace(/[.,\s]/g, '') || '0';
  const cleanDecimal = decimal.padEnd(2, '0');
  return parseFloat(`${cleanWhole}.${cleanDecimal}`);
};

/**
 * Ondalıklı sayıyı tam ve ondalık kısımlara ayırır
 */
export const splitAmount = (amount: number): { whole: string; decimal: string } => {
  const [whole, decimal = '00'] = amount.toFixed(2).split('.');
  return {
    whole: formatNumberForDisplay(whole),
    decimal
  };
};

/**
 * Para birimini formatlar
 */
export const formatCurrency = (amount: number, currency: string): string => {
  const formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  });
  
  return formatter.format(amount);
};

/**
 * Sayısal veriyi temizler (nokta ve virgül gibi ayırıcıları kaldırır)
 * @param input Temizlenecek girdi
 * @returns Temizlenmiş sayısal değer
 */
export const cleanNumberInput = (input: string): string => {
  return input.replace(/[.,\s]/g, '');
};

/**
 * Sayıyı binlik ayraçlı formatta gösterim için formatlar
 * @param input Formatlanacak sayı değeri
 * @returns Binlik ayraçlı formatlanmış sayı
 */
export const formatNumberForDisplay = (input: string): string => {
  const cleaned = cleanNumberInput(input);
  if (!cleaned) return '';
  return Number(cleaned).toLocaleString('tr-TR').replace(/,/g, ".");
};

/**
 * Türkçe yerelleştirilmiş ondalıklı sayıyı JavaScript Number'a dönüştürür
 * @param amount Ondalık ayırıcı olarak virgül içeren sayısal değer
 * @returns JavaScript Number değeri
 */
export const parseLocalizedNumber = (amount: string): number => {
  // Binlik ayracı olarak kullanılan noktaları kaldır
  // Ondalık ayracı olarak kullanılan virgülü noktaya çevir
  if (!amount) return 0;
  
  const cleaned = amount.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned);
};

/**
 * Ondalıklı tutarı kuruş birimine (tam sayı) çevirir
 * @param amount Ondalıklı tutar değeri (örneğin: 15.75)
 * @returns Kuruş cinsinden tam sayı değeri (örneğin: 1575)
 */
export const convertAmountToCents = (amount: number): number => {
  // Ondalıklı sayıyı 2 basamaklı yuvarlayıp kuruşa çevir (100 ile çarparak)
  return Math.round(amount * 100);
};

/**
 * Kuruş cinsinden tam sayı değerini ondalıklı TL değerine çevirir
 * @param cents Kuruş cinsinden tam sayı değeri (örneğin: 1575)
 * @returns Ondalıklı TL değeri (örneğin: 15.75)
 */
export const convertCentsToAmount = (cents: number): number => {
  // Tam sayı değerini 100'e bölerek ondalıklı değere çevir
  return cents / 100;
};
