
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { categoryMutationLogger } from '../logging';
import { useCategoryCrudMutations } from './mutations/useCategoryCrudMutations';
import { useSubcategoryMutations } from './mutations/useSubcategoryMutations';
import { useCategoryOrderingMutations } from './mutations/useCategoryOrderingMutations';

/**
 * Kategori mutasyonları için ana hook
 * Diğer özelleşmiş mutasyon hook'larını birleştirir
 */
export const useCategoryMutations = () => {
  const logger = categoryMutationLogger.createSubLogger('CategoryMutations');
  const queryClient = useQueryClient();
  
  logger.debug('Kategori mutasyonları hook başlatılıyor');
  
  // Tüm kategori verilerini yenileme fonksiyonu
  const invalidateCategories = () => {
    logger.debug('Kategori verileri yenileniyor');
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  // Temel CRUD işlemleri için hook'u kullan
  const { createCategory, updateCategory, deleteCategory } = useCategoryCrudMutations(invalidateCategories);
  
  // Alt kategori işlemleri için hook'u kullan
  const subcategory = useSubcategoryMutations(invalidateCategories);
  
  // Sıralama işlemleri için hook'u kullan
  const { updateCategoryOrder, updateSubCategoryOrder, moveSubCategories } = useCategoryOrderingMutations(invalidateCategories);

  const ordering = {
    updateCategoryOrder,
    updateSubCategoryOrder
  };

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    subcategory,
    ordering,
    moveSubCategories
  };
};
