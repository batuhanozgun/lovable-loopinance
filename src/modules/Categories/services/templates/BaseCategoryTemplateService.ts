
import { createLogger } from '@/modules/Logging';
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { SupportedLanguage } from '../../types/template';

/**
 * Kategori şablonları için temel servis sınıfı
 * Diğer şablon servisleri tarafından kullanılan ortak metodları içerir
 */
export class BaseCategoryTemplateService {
  protected logger: ModuleLogger;
  protected supabaseClient = supabase;
  
  constructor(moduleName: string) {
    this.logger = createLogger(moduleName);
  }
  
  /**
   * Veritabanı hatasını işleyip uygun şekilde loglayan yardımcı metod
   */
  protected handleDbError(error: any, operation: string, additionalData?: Record<string, any>): never {
    this.logger.error(`${operation} sırasında hata oluştu`, error, additionalData);
    throw new Error(`${operation} sırasında hata: ${error.message || 'Bilinmeyen hata'}`);
  }

  /**
   * İsim alanlarından çoklu dil desteği için belirli dilde isim döndürür
   * Eğer belirtilen dilde bir isim yoksa, varsayılan dil (tr) veya mevcut herhangi bir dil döndürülür
   */
  protected getLocalizedName(nameObject: Record<string, string> | null | undefined, language: SupportedLanguage = 'tr'): string {
    if (!nameObject) {
      return '';
    }

    // Belirtilen dilde isim varsa döndür
    if (nameObject[language]) {
      return nameObject[language];
    }

    // Varsayılan olarak Türkçe ismi döndür (sistem dili)
    if (nameObject['tr']) {
      return nameObject['tr'];
    }

    // Herhangi bir dilde isim varsa ilkini döndür
    const availableLanguage = Object.keys(nameObject)[0];
    if (availableLanguage) {
      return nameObject[availableLanguage];
    }

    // Hiçbir isim bulunamadıysa boş string döndür
    return '';
  }
}

export default BaseCategoryTemplateService;
