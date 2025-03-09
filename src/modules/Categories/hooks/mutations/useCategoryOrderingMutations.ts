
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ICategoryOrder, ISubCategoryOrder, ICategoryMoveOperation } from '../../types';
import { CategoryOrganizationService } from '../../services/category/category-organization.service';

/**
 * Kategori ve alt kategorilerin sıralama mutasyonlarını yöneten hook
 */
export const useCategoryOrderingMutations = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['Categories', 'common', 'errors']);
  
  // Kategori sıralama mutasyonu
  const updateCategoryOrderMutation = useMutation({
    mutationFn: (categoryOrders: ICategoryOrder[]) => 
      CategoryOrganizationService.updateCategoryOrder(categoryOrders),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(t('Categories:sort.success'));
    },
    onError: (error: Error) => {
      toast.error(t('errors:update.failed', { error: error.message }));
    }
  });
  
  // Alt kategori sıralama mutasyonu
  const updateSubCategoryOrderMutation = useMutation({
    mutationFn: (subCategoryOrders: ISubCategoryOrder[]) => 
      CategoryOrganizationService.updateSubCategoryOrder(subCategoryOrders),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(t('Categories:subcategory.sort.success'));
    },
    onError: (error: Error) => {
      toast.error(t('errors:update.failed', { error: error.message }));
    }
  });
  
  // Alt kategorileri taşıma mutasyonu
  const moveSubCategoriesMutation = useMutation({
    mutationFn: ({ sourceId, targetId, subCategoryIds }: ICategoryMoveOperation) => 
      CategoryOrganizationService.moveSubCategoriesToCategory(sourceId, targetId, subCategoryIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(t('Categories:move.success'));
    },
    onError: (error: Error) => {
      toast.error(t('errors:update.failed', { error: error.message }));
    }
  });
  
  return {
    updateCategoryOrder: updateCategoryOrderMutation.mutate,
    isUpdatingCategoryOrder: updateCategoryOrderMutation.isPending,
    
    updateSubCategoryOrder: updateSubCategoryOrderMutation.mutate,
    isUpdatingSubCategoryOrder: updateSubCategoryOrderMutation.isPending,
    
    moveSubCategories: moveSubCategoriesMutation.mutate,
    isMovingSubCategories: moveSubCategoriesMutation.isPending
  };
};
