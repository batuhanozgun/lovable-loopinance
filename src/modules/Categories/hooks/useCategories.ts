
import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '../services/category.service';
import { categoriesLogger } from '../logging';
import type { ICategory } from '../types';

export const CATEGORIES_QUERY_KEY = 'categories';

/**
 * Kategorileri yönetmek için hook
 */
export const useCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: () => CategoryService.getAllCategories(),
    onError: (err) => {
      categoriesLogger.error('Kategorileri getirme hatası', err);
    }
  });

  return {
    categories: categories || [],
    isLoading,
    isError,
    error,
    refetch
  };
};

/**
 * Belirli bir kategoriyi getirmek için hook
 */
export const useCategory = (id: string) => {
  const {
    data: category,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, id],
    queryFn: () => CategoryService.getCategoryById(id),
    enabled: !!id,
    onError: (err) => {
      categoriesLogger.error('Kategori detayları getirme hatası', err, { categoryId: id });
    }
  });

  return {
    category: category as ICategory,
    isLoading,
    isError,
    error,
    refetch
  };
};
