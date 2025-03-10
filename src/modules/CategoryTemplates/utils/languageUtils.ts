
import { Json } from '@/integrations/supabase/types';
import { SupportedLanguage } from '../types/template';

/**
 * Kullanıcı arayüzü için çoklu dil formatından doğru dilde metni getirir
 * @param nameObj İsim objesi (birden fazla dil içerebilir)
 * @param language Tercih edilen dil
 * @param fallbackText Dil bulunamadığında kullanılacak varsayılan metin
 * @returns Dile göre isim
 */
export function getLocalizedName(
  nameObj: Record<string, string> | null | undefined,
  language: SupportedLanguage,
  fallbackText: string = 'İsimsiz'
): string {
  if (!nameObj) return fallbackText;
  
  // Önce tercih edilen dili kontrol et
  if (nameObj[language]) {
    return nameObj[language];
  }
  
  // Tercih edilen dil yoksa Türkçe'yi dene
  if (nameObj['tr']) {
    return nameObj['tr'];
  }
  
  // Türkçe de yoksa İngilizce'yi dene
  if (nameObj['en']) {
    return nameObj['en'];
  }
  
  // İlk bulduğun değeri kullan
  const firstValue = Object.values(nameObj).find(value => !!value);
  if (firstValue) {
    return firstValue;
  }
  
  // Hiçbir değer bulunamadıysa fallback metni kullan
  return fallbackText;
}

/**
 * Dili güvenli şekilde geçerli bir SupportedLanguage tipine dönüştürür
 * @param language Dönüştürülecek dil değeri
 * @returns Geçerli bir SupportedLanguage ('tr' veya 'en')
 */
export function getSafeLanguage(language: string | undefined): SupportedLanguage {
  if (!language) return 'tr';
  
  // Alt kısmını alıp küçük harfe çevirelim (örn: en-US -> en)
  const langCode = language.split('-')[0].toLowerCase();
  
  return (langCode === 'en') ? 'en' : 'tr';
}

/**
 * Veritabanından gelen JSON tipi veriyi güvenli şekilde Record<string, string> tipine dönüştürür
 * @param jsonData Veritabanından gelen JSON verisi
 * @returns İşlenmiş Record<string, string> verisi veya boş obje
 */
export function safeJsonToStringRecord(jsonData: Json | null | undefined): Record<string, string> {
  if (!jsonData) return {};
  
  try {
    // Zaten obje ise ve string key/value'lara sahipse direkt döndür
    if (typeof jsonData === 'object' && jsonData !== null) {
      const result: Record<string, string> = {};
      
      // Her key için değeri string'e dönüştür
      Object.entries(jsonData).forEach(([key, value]) => {
        result[key] = String(value);
      });
      
      return result;
    }
    
    // JSON string ise parse et
    if (typeof jsonData === 'string') {
      try {
        const parsed = JSON.parse(jsonData);
        if (typeof parsed === 'object' && parsed !== null) {
          return safeJsonToStringRecord(parsed);
        }
      } catch (e) {
        console.error('JSON parse hatası:', e);
      }
    }
  } catch (error) {
    console.error('safeJsonToStringRecord hatası:', error);
  }
  
  return {};
}
