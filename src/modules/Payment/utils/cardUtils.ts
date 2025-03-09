
import { paymentLogger } from '../logging';

/**
 * Kredi kartı numarasını formatlar (örn: 1234 5678 9012 3456)
 */
export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  
  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  
  return parts.length ? parts.join(' ') : value;
};

/**
 * Son kullanma tarihini formatlar (MM/YY)
 */
export const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }
  
  return v;
};

/**
 * Kredi kartı numarasını maskeler
 */
export const maskCardNumber = (cardNumber: string): string => {
  const cardNum = cardNumber.replace(/\s/g, '');
  if (cardNum.length < 4) return cardNumber;
  return `**** **** **** ${cardNum.slice(-4)}`;
};

/**
 * Kredi kartı numarasının geçerliliğini kontrol eder (basit doğrulama)
 */
export const isValidCardNumber = (cardNumber: string): boolean => {
  const sanitized = cardNumber.replace(/\s+/g, '');
  return /^\d{16}$/.test(sanitized);
};

/**
 * CVV numarasının geçerliliğini kontrol eder
 */
export const isValidCvv = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

/**
 * Son kullanma tarihinin geçerliliğini kontrol eder
 */
export const isValidExpiryDate = (expiryDate: string): boolean => {
  // MM/YY formatında olmalı
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/').map(part => parseInt(part, 10));
  
  // Ay 1-12 arasında olmalı
  if (month < 1 || month > 12) return false;
  
  // Şimdiki yıl ve ay
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // Son iki hane
  const currentMonth = now.getMonth() + 1; // Ocak = 1
  
  // Yıl şimdiden küçükse geçersiz
  if (year < currentYear) return false;
  
  // Yıl şimdiki yıla eşitse, ay şimdiki aydan küçük olmamalı
  if (year === currentYear && month < currentMonth) return false;
  
  return true;
};

/**
 * Test kartı olup olmadığını kontrol eder
 */
export const isTestCard = (cardNumber: string): boolean => {
  const sanitized = cardNumber.replace(/\s+/g, '');
  return sanitized.startsWith('4111') || sanitized.startsWith('4242');
};
