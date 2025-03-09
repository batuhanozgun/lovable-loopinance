
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '../services/category';
import { uiLogger } from '../logging';
import type { ICategory } from '../types';

/**
 * Kategorileri çekmek için hook
 */
export const useCategories = () => {
  const logger = uiLogger.createSubLogger('CategoriesHook');

  const result = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      logger.debug('Kategoriler getiriliyor');
      const categories = await CategoryService.getAllCategories();
      logger.debug('Kategoriler başarıyla getirildi', { count: categories.length });
      return categories;
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Kategorileri getirme hatası', error);
      }
    }
  });

  return {
    categories: result.data || [],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error
  };
};
