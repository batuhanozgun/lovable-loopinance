
import { useQuery } from '@tanstack/react-query';
import { CategoryTemplateQueryService } from '../../services/templates';
import type { ICategoryTemplate, ITemplateViewOptions, SupportedLanguage } from '../../types/template';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE_SETTINGS } from '../../types/template';

const categoryTemplateService = new CategoryTemplateQueryService();

/**
 * Kategori şablonlarını getirmek için hook
 * Global dil ayarlarını takip eder ve dil değiştiğinde şablonları yeniden yükler
 */
export const useCategoryTemplates = (options?: Partial<ITemplateViewOptions>) => {
  const { i18n } = useTranslation();
  
  // Güvenli bir şekilde dil tipini döndür, eğer desteklenmiyorsa varsayılan dili kullan
  const getSafeLanguage = (lang: string): SupportedLanguage => {
    return DEFAULT_LANGUAGE_SETTINGS.supportedLanguages.includes(lang as SupportedLanguage) 
      ? (lang as SupportedLanguage) 
      : DEFAULT_LANGUAGE_SETTINGS.defaultLanguage;
  };
  
  // Belirtilen dil varsa kullan, yoksa global dil tercihini kullan
  const language = options?.language || getSafeLanguage(i18n.language);

  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryTemplates', language],
    queryFn: async (): Promise<ICategoryTemplate[]> => {
      return categoryTemplateService.getAllCategoryTemplates(language);
    }
  });

  return {
    categoryTemplates: data || [],
    isLoading,
    error
  };
};

/**
 * Belirli bir kategori şablonunu ID'ye göre getirmek için hook
 * Global dil ayarlarını takip eder ve dil değiştiğinde şablonu yeniden yükler
 */
export const useCategoryTemplateById = (id: string, options?: Partial<ITemplateViewOptions>) => {
  const { i18n } = useTranslation();
  
  // Güvenli bir şekilde dil tipini döndür, eğer desteklenmiyorsa varsayılan dili kullan
  const getSafeLanguage = (lang: string): SupportedLanguage => {
    return DEFAULT_LANGUAGE_SETTINGS.supportedLanguages.includes(lang as SupportedLanguage) 
      ? (lang as SupportedLanguage) 
      : DEFAULT_LANGUAGE_SETTINGS.defaultLanguage;
  };
  
  // Belirtilen dil varsa kullan, yoksa global dil tercihini kullan
  const language = options?.language || getSafeLanguage(i18n.language);

  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryTemplate', id, language],
    queryFn: async (): Promise<ICategoryTemplate | null> => {
      return categoryTemplateService.getCategoryTemplateById(id, language);
    },
    enabled: !!id
  });

  return {
    categoryTemplate: data,
    isLoading,
    error
  };
};
