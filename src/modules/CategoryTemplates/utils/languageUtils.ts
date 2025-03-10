
import { SupportedLanguage, DEFAULT_LANGUAGE_SETTINGS } from '../types/template';
import { Json } from '@/integrations/supabase/types';

/**
 * Verilen dil kodunun desteklenen dil olup olmadığını kontrol eder
 * ve desteklenen bir dil kodu döndürür.
 * 
 * @param lang Kontrol edilecek dil kodu
 * @returns Desteklenen dil kodu (geçerli veya varsayılan)
 */
export const getSafeLanguage = (lang: string): SupportedLanguage => {
  return DEFAULT_LANGUAGE_SETTINGS.supportedLanguages.includes(lang as SupportedLanguage) 
    ? (lang as SupportedLanguage) 
    : DEFAULT_LANGUAGE_SETTINGS.defaultLanguage;
};

/**
 * JSON tipindeki veriyi Record<string, string> tipine güvenli şekilde dönüştürür
 * 
 * @param jsonData JSON verisi
 * @returns Record<string, string> tipinde veri veya boş obje
 */
export const safeJsonToStringRecord = (jsonData: Json | null | undefined): Record<string, string> => {
  if (!jsonData || typeof jsonData !== 'object' || Array.isArray(jsonData)) {
    return {};
  }
  
  const result: Record<string, string> = {};
  
  // JSON objesi içindeki anahtarları dön
  Object.entries(jsonData).forEach(([key, value]) => {
    // Sadece string değerleri al
    if (typeof value === 'string') {
      result[key] = value;
    } else if (value !== null && value !== undefined) {
      // String olmayan değerleri string'e çevir
      result[key] = String(value);
    }
  });
  
  return result;
};

/**
 * Belirtilen dildeki ismi döndürür
 * 
 * @param nameObj İsim nesnesi (farklı dillerde isimler içerir)
 * @param language İstenen dil
 * @param fallbackText Hiçbir isim bulunamazsa döndürülecek varsayılan metin
 * @returns Belirtilen dildeki isim veya bir alternatif 
 */
export const getLocalizedName = (
  nameObj: Record<string, string> | null | undefined, 
  language: SupportedLanguage, 
  fallbackText = ''
): string => {
  if (!nameObj || Object.keys(nameObj).length === 0) {
    return fallbackText;
  }
  
  // Belirtilen dilde isim varsa döndür
  if (nameObj[language]) {
    return nameObj[language];
  }
  
  // Varsayılan dilde isim varsa döndür
  if (nameObj[DEFAULT_LANGUAGE_SETTINGS.defaultLanguage]) {
    return nameObj[DEFAULT_LANGUAGE_SETTINGS.defaultLanguage];
  }
  
  // Herhangi bir dilde isim varsa ilkini döndür
  const firstLang = Object.keys(nameObj)[0];
  if (firstLang) {
    return nameObj[firstLang];
  }
  
  return fallbackText;
};
