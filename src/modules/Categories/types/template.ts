
/**
 * Kategori şablonu tipi tanımı
 */
export interface ICategoryTemplate {
  id: string;
  name: Record<string, string>;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sub_categories?: ISubCategoryTemplate[];
}

/**
 * Alt kategori şablonu tipi tanımı
 */
export interface ISubCategoryTemplate {
  id: string;
  name: Record<string, string>;
  category_template_id: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Şablondan kategori oluşturma verisi
 */
export interface ICreateCategoryFromTemplateData {
  templateId: string;
  userId: string;
  language?: SupportedLanguage;
}

/**
 * Şablon liste görünümü için ayarlar
 */
export interface ITemplateViewOptions {
  language: SupportedLanguage;
}

/**
 * Desteklenen diller
 */
export type SupportedLanguage = 'tr' | 'en';

/**
 * Dil ayarları
 */
export interface ILanguageSettings {
  defaultLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
}

/**
 * Varsayılan dil ayarları
 */
export const DEFAULT_LANGUAGE_SETTINGS: ILanguageSettings = {
  defaultLanguage: 'tr',
  supportedLanguages: ['tr', 'en']
};
