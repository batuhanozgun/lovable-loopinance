
import { createLogger } from '@/modules/Logging';
import { useCategoryCrudMutations } from './useCategoryCrudMutations';
import { useSubcategoryMutations } from './useSubcategoryMutations';
import { useCategoryOrderingMutations } from './useCategoryOrderingMutations';
import { operationsLogger } from '../../logging';

/**
 * Kategori mutasyonları için ana hook
 * Diğer özelleşmiş mutasyon hook'larını birleştirir
 */
export const useCategoryMutations = () => {
  const logger = operationsLogger.createSubLogger('CategoryMutations');
  
  logger.debug('Kategori mutasyonları hook başlatılıyor');
  
  // Tüm kategori verilerini yenileme fonksiyonu
  const invalidateCategories = () => {
    logger.debug('Kategori verileri yenileniyor');
    // Bu callback fonksiyonu ile tüm mutation hook'lara tutarlı bir şekilde iletilir
  };

  // Temel CRUD işlemleri için hook'u kullan
  const { createCategory, updateCategory, deleteCategory } = useCategoryCrudMutations(invalidateCategories);
  
  // Alt kategori işlemleri için hook'u kullan
  const subcategory = useSubcategoryMutations(invalidateCategories);
  
  // Sıralama işlemleri için hook'u kullan
  const { updateCategoryOrder, updateSubCategoryOrder, moveSubCategories } = useCategoryOrderingMutations(invalidateCategories);

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    subcategory,
    ordering: {
      updateCategoryOrder,
      updateSubCategoryOrder,
      moveSubCategories
    },
    // Eski API ile uyumluluk için direkt erişim
    updateCategoryOrder,
    updateSubCategoryOrder,
    moveSubCategories
  };
};

export {
  useCategoryCrudMutations,
  useSubcategoryMutations,
  useCategoryOrderingMutations
};
