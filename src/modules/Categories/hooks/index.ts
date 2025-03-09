
import { useCategories, useCategory } from './queries/useCategoryQueries';
import { 
  useCategoryMutations,
  useCategoryCrudMutations, 
  useSubcategoryMutations, 
  useCategoryOrderingMutations 
} from './mutations/useCategoryMutations';

// Tüm hooks'ları merkezi noktadan dışa aktar
export {
  // Kategori sorgulama hooks
  useCategories,
  useCategory,
  
  // Kategori mutasyon hooks
  useCategoryMutations,
  
  // Özel mutasyon hooks (doğrudan erişim gerekirse)
  useCategoryCrudMutations,
  useSubcategoryMutations,
  useCategoryOrderingMutations
};

// Ana merkezi hook'u varsayılan olarak dışa aktar
export default useCategoryMutations;
