
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
