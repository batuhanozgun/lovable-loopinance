
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { operationsLogger } from '../../logging';
import { ICategoryOrder, ISubCategoryOrder, ICategoryMoveOperation } from '../../types';
import { CategoryOrganizationService } from '../../services/category.service';

/**
 * Kategori ve alt kategorilerin sıralama mutasyonlarını yöneten hook
 */
export const useCategoryOrderingMutations = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['categories', 'common', 'errors']);
  const logger = operationsLogger.createSubLogger('CategoryOrdering');
  
  // Kategori sıralama mutasyonu
  const updateCategoryOrderMutation = useMutation({
    mutationFn: (categoryOrders: ICategoryOrder[]) => {
      logger.debug('Kategori sıralaması güncelleniyor', { count: categoryOrders.length });
      return CategoryOrganizationService.updateCategoryOrder(categoryOrders);
    },
    onSuccess: () => {
      logger.info('Kategori sıralaması başarıyla güncellendi');
      toast.success(t('categories:sort.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Kategori sıralama hatası', error);
      toast.error(t('errors:update.failed', { error: error.message }));
    }
  });
  
  // Alt kategori sıralama mutasyonu
  const updateSubCategoryOrderMutation = useMutation({
    mutationFn: (subCategoryOrders: ISubCategoryOrder[]) => {
      logger.debug('Alt kategori sıralaması güncelleniyor', { count: subCategoryOrders.length });
      return CategoryOrganizationService.updateSubCategoryOrder(subCategoryOrders);
    },
    onSuccess: () => {
      logger.info('Alt kategori sıralaması başarıyla güncellendi');
      toast.success(t('categories:subcategory.sort.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori sıralama hatası', error);
      toast.error(t('errors:update.failed', { error: error.message }));
    }
  });
  
  // Alt kategorileri taşıma mutasyonu
  const moveSubCategoriesMutation = useMutation({
    mutationFn: ({ sourceId, targetId, subCategoryIds }: ICategoryMoveOperation) => {
      logger.debug('Alt kategoriler taşınıyor', { sourceId, targetId, count: subCategoryIds.length });
      return CategoryOrganizationService.moveSubCategoriesToCategory(sourceId, targetId, subCategoryIds);
    },
    onSuccess: () => {
      logger.info('Alt kategoriler başarıyla taşındı');
      toast.success(t('categories:move.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori taşıma hatası', error);
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
