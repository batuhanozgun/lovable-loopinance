
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { createLogger } from '@/modules/Logging';
import { SubcategoryService } from '../../services/category.service';
import { ISubCategory } from '../../types';

// Alt kategori işlemleri için logger
const categoryMutationLogger = createLogger('Categories.Mutations');

/**
 * Alt kategori işlemleri için hook
 */
export const useSubcategoryMutations = (onSuccess?: () => void) => {
  const { t } = useTranslation(['categories', 'common', 'messages', 'errors']);
  const queryClient = useQueryClient();
  const logger = categoryMutationLogger.createSubLogger('SubcategoryMutations');

  // Alt kategori oluşturma mutasyonu
  const createSubCategoryMutation = useMutation({
    mutationFn: (subCategory: Omit<ISubCategory, 'id'>) => {
      logger.debug('Alt kategori oluşturuluyor', { subCategory });
      return SubcategoryService.createSubCategory(subCategory);
    },
    onSuccess: (data) => {
      logger.info('Alt kategori başarıyla oluşturuldu', { subCategoryId: data.id });
      toast.success(t('messages:subcategory.create.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori oluşturma hatası', error);
      toast.error(t('errors:subcategory.create.failed', { error: error.message }));
    }
  });

  // Alt kategori güncelleme mutasyonu
  const updateSubCategoryMutation = useMutation({
    mutationFn: (subCategory: ISubCategory) => {
      logger.debug('Alt kategori güncelleniyor', { subCategoryId: subCategory.id });
      return SubcategoryService.updateSubCategory(subCategory);
    },
    onSuccess: () => {
      logger.info('Alt kategori başarıyla güncellendi');
      toast.success(t('messages:subcategory.update.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori güncelleme hatası', error);
      toast.error(t('errors:subcategory.update.failed', { error: error.message }));
    }
  });

  // Alt kategori silme mutasyonu
  const deleteSubCategoryMutation = useMutation({
    mutationFn: (subCategoryId: string) => {
      logger.debug('Alt kategori siliniyor', { subCategoryId });
      return SubcategoryService.deleteSubCategory(subCategoryId);
    },
    onSuccess: () => {
      logger.info('Alt kategori başarıyla silindi');
      toast.success(t('messages:subcategory.delete.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori silme hatası', error);
      toast.error(t('errors:subcategory.delete.failed', { error: error.message }));
    }
  });

  return {
    createSubCategory: createSubCategoryMutation.mutate,
    isCreatingSubCategory: createSubCategoryMutation.isPending,
    
    updateSubCategory: updateSubCategoryMutation.mutate,
    isUpdatingSubCategory: updateSubCategoryMutation.isPending,
    
    deleteSubCategory: deleteSubCategoryMutation.mutate,
    isDeletingSubCategory: deleteSubCategoryMutation.isPending
  };
};
