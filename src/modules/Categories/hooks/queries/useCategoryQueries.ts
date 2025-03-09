
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '../../services/category';
import { createLogger } from '@/modules/Logging';
import type { ICategory } from '../../types';

// Categories modülü için query logger'ı oluştur
const categoryQueryLogger = createLogger('Categories.Queries');

/**
 * Kategorileri çekmek için hook
 */
export const useCategories = () => {
  const logger = categoryQueryLogger.createSubLogger('CategoriesHook');

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

/**
 * Tek bir kategori getirmek için hook
 */
export const useCategory = (id: string) => {
  const logger = categoryQueryLogger.createSubLogger('CategoryHook');

  const result = useQuery<ICategory, Error>({
    queryKey: ['category', id],
    queryFn: async () => {
      logger.debug('Kategori getiriliyor', { id });
      const category = await CategoryService.getCategoryById(id);
      logger.debug('Kategori başarıyla getirildi', { id });
      return category;
    },
    enabled: !!id,
    meta: {
      onError: (error: Error) => {
        logger.error('Kategori getirme hatası', error, { id });
      }
    }
  });

  return {
    category: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error
  };
};
