
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
    whole: Number(whole).toLocaleString('tr-TR'),
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
