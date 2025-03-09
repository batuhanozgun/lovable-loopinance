
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
  const { createSubCategory, updateSubCategory, deleteSubCategory } = useSubcategoryMutations(invalidateCategories);
  
  // Sıralama işlemleri için hook'u kullan
  const { updateCategoryOrder, updateSubCategoryOrder, moveSubCategories } = useCategoryOrderingMutations(invalidateCategories);

  return {
    // CRUD işlemleri
    createCategory,
    updateCategory,
    deleteCategory,
    
    // Alt kategori işlemleri - ayrıca doğrudan erişim için
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    
    // Organizasyon işlemleri
    updateCategoryOrder,
    updateSubCategoryOrder,
    moveSubCategories,
    
    // Gruplandırılmış erişim
    subcategory: {
      create: createSubCategory,
      update: updateSubCategory,
      delete: deleteSubCategory
    },
    
    ordering: {
      updateCategoryOrder,
      updateSubCategoryOrder,
      moveSubCategories
    }
  };
};

export {
  useCategoryCrudMutations,
  useSubcategoryMutations,
  useCategoryOrderingMutations
};
