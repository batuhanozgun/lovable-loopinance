
import { SupportedLanguage, DEFAULT_LANGUAGE_SETTINGS } from '../types/template';

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
 * Birden çok dil desteği olan bir isim nesnesinden, belirli bir dildeki ismi döndürür
 * 
 * @param nameObj İsim nesnesi (farklı dillerde isimler içerir)
 * @param language İstenen dil
 * @param fallbackText Hiçbir isim bulunamazsa döndürülecek varsayılan metin
 * @returns Belirtilen dildeki isim veya bir alternatif 
 */
export const getLocalizedName = (
  nameObj: Record<string, string> | undefined | null, 
  language: SupportedLanguage, 
  fallbackText = ''
): string => {
  if (!nameObj) return fallbackText;
  
  // Belirtilen dilde isim varsa döndür
  if (nameObj[language]) {
    return nameObj[language];
  }
  
  // Varsayılan dilde isim varsa döndür (Türkçe)
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
