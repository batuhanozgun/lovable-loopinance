
import { useQuery } from '@tanstack/react-query';
import { CategoryTemplateQueryService } from '../../services/templates';
import type { ICategoryTemplate, ITemplateViewOptions, SupportedLanguage } from '../../types/template';
import { useTranslation } from 'react-i18next';
import { getSafeLanguage } from '../../utils/languageUtils';

const categoryTemplateService = new CategoryTemplateQueryService();

/**
 * Kategori şablonlarını getirmek için hook
 * Global dil ayarlarını takip eder ve dil değiştiğinde şablonları yeniden yükler
 */
export const useCategoryTemplates = (options?: Partial<ITemplateViewOptions>) => {
  const { i18n } = useTranslation();
  
  // Global dil tercihini kullan, sadece geçerli bir dil tipi olduğundan emin ol
  const language = getSafeLanguage(options?.language || i18n.language);

  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryTemplates', language],
    queryFn: async (): Promise<ICategoryTemplate[]> => {
      // Sorgu fonksiyonunda dil parametresini geçir
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
  
  // Global dil tercihini kullan, sadece geçerli bir dil tipi olduğundan emin ol
  const language = getSafeLanguage(options?.language || i18n.language);

  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryTemplate', id, language],
    queryFn: async (): Promise<ICategoryTemplate | null> => {
      // Sorgu fonksiyonunda dil parametresini geçir
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
