
/**
 * Tam ve ondalık kısımları birleştirerek decimal değer oluşturur
 */
export const combineAmountParts = (whole: string, decimal: string): number => {
  // Tam sayı kısmını temizle (nokta, virgül, boşluk gibi karakterleri kaldır)
  // Eğer boş veya geçersiz ise "0" olarak ayarla
  const cleanWhole = whole.replace(/[.,\s]/g, '') || '0';
  
  // Ondalık kısmı 2 basamağa tamamla (eksikse sağa 0 ekle)
  const cleanDecimal = (decimal || '00').padEnd(2, '0');
  
  // Birleştirip sayıya dönüştür
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
  if (!cleaned) return '0';
  
  // Sayısal değer kontrolü yap
  const numValue = Number(cleaned);
  if (isNaN(numValue)) return '0';
  
  return numValue.toLocaleString('tr-TR').replace(/,/g, ".");
};

/**
 * Türkçe yerelleştirilmiş ondalıklı sayıyı JavaScript Number'a dönüştürür
 * @param amount Ondalık ayırıcı olarak virgül içeren sayısal değer
 * @returns JavaScript Number değeri
 */
export const parseLocalizedNumber = (amount: string): number => {
  if (!amount) return 0;
  
  // Boş string kontrolü
  const trimmed = amount.trim();
  if (trimmed === '') return 0;
  
  // Sayısal olmayan karakterleri kontrol et
  if (!/^[0-9.,\s]+$/.test(trimmed)) return 0;
  
  const cleaned = trimmed.replace(/\./g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  
  // NaN kontrolü
  return isNaN(parsed) ? 0 : parsed;
};
