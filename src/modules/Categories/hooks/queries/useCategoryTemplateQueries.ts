
import { useQuery } from '@tanstack/react-query';
import { CategoryTemplateQueryService } from '../../services/templates';
import type { ICategoryTemplate, ITemplateViewOptions, SupportedLanguage } from '../../types/template';
import { useTranslation } from 'react-i18next';

const categoryTemplateService = new CategoryTemplateQueryService();

/**
 * Kategori şablonlarını getirmek için hook
 */
export const useCategoryTemplates = (options?: Partial<ITemplateViewOptions>) => {
  const { i18n } = useTranslation();
  const language = options?.language || i18n.language as SupportedLanguage;

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
 */
export const useCategoryTemplateById = (id: string, options?: Partial<ITemplateViewOptions>) => {
  const { i18n } = useTranslation();
  const language = options?.language || i18n.language as SupportedLanguage;

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
