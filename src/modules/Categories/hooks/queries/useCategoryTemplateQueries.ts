
import { useQuery } from '@tanstack/react-query';
import { CategoryTemplateQueryService } from '../../services/templates';
import type { ICategoryTemplate } from '../../types/template';

const categoryTemplateService = new CategoryTemplateQueryService();

/**
 * Kategori şablonlarını getirmek için hook
 */
export const useCategoryTemplates = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryTemplates'],
    queryFn: async (): Promise<ICategoryTemplate[]> => {
      return categoryTemplateService.getAllCategoryTemplates();
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
export const useCategoryTemplateById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryTemplate', id],
    queryFn: async (): Promise<ICategoryTemplate | null> => {
      return categoryTemplateService.getCategoryTemplateById(id);
    },
    enabled: !!id
  });

  return {
    categoryTemplate: data,
    isLoading,
    error
  };
};
