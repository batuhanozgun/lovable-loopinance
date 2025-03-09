
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { operationsLogger } from '../../logging';
import { CategoryManagementService } from '../../services/category.service';
import { ICategory } from '../../types';

/**
 * Kategori CRUD işlemleri için hook
 */
export const useCategoryCrudMutations = (onSuccess?: () => void) => {
  const { t } = useTranslation(['categories', 'common', 'messages', 'errors']);
  const queryClient = useQueryClient();
  const logger = operationsLogger.createSubLogger('CategoryCRUD');

  // Kategori oluşturma mutasyonu
  const createCategoryMutation = useMutation({
    mutationFn: (category: Omit<ICategory, 'id'>) => {
      logger.debug('Kategori oluşturuluyor', { category });
      return CategoryManagementService.createCategory(category);
    },
    onSuccess: (data) => {
      logger.info('Kategori başarıyla oluşturuldu', { categoryId: data.id });
      toast.success(t('messages:create.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Kategori oluşturma hatası', error);
      toast.error(t('errors:create.failed', { error: error.message }));
    }
  });

  // Kategori güncelleme mutasyonu
  const updateCategoryMutation = useMutation({
    mutationFn: (category: ICategory) => {
      logger.debug('Kategori güncelleniyor', { categoryId: category.id });
      return CategoryManagementService.updateCategory(category);
    },
    onSuccess: () => {
      logger.info('Kategori başarıyla güncellendi');
      toast.success(t('messages:update.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Kategori güncelleme hatası', error);
      toast.error(t('errors:update.failed', { error: error.message }));
    }
  });

  // Kategori silme mutasyonu
  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => {
      logger.debug('Kategori siliniyor', { categoryId });
      return CategoryManagementService.deleteCategory(categoryId);
    },
    onSuccess: () => {
      logger.info('Kategori başarıyla silindi');
      toast.success(t('messages:delete.success'));
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      logger.error('Kategori silme hatası', error);
      toast.error(t('errors:delete.failed', { error: error.message }));
    }
  });

  return {
    createCategory: createCategoryMutation.mutate,
    isCreatingCategory: createCategoryMutation.isPending,
    
    updateCategory: updateCategoryMutation.mutate,
    isUpdatingCategory: updateCategoryMutation.isPending,
    
    deleteCategory: deleteCategoryMutation.mutate,
    isDeletingCategory: deleteCategoryMutation.isPending
  };
};
