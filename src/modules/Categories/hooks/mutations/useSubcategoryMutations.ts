
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { SubcategoryService } from '../../services/category.service';
import { categoryMutationLogger } from '../../logging';
import { ISubCategory } from '../../types';

export const useSubcategoryMutations = (onSuccess?: () => void) => {
  const { t } = useTranslation(['categories', 'messages']);
  const logger = categoryMutationLogger.createSubLogger('SubcategoryMutations');

  // Alt kategori oluşturma mutasyonu
  const createSubCategory = useMutation({
    mutationFn: (subCategory: Omit<ISubCategory, 'id'>) => {
      logger.debug('Alt kategori oluşturuluyor', { subCategory });
      return SubcategoryService.createSubCategory(subCategory);
    },
    onSuccess: (data) => {
      logger.info('Alt kategori başarıyla oluşturuldu', { subCategoryId: data.id });
      toast({
        title: t('common:success'),
        description: t('messages:subcategory.create.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Alt kategori oluşturma hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:subcategory.create'),
        variant: 'destructive',
      });
    }
  });

  // Alt kategori güncelleme mutasyonu
  const updateSubCategory = useMutation({
    mutationFn: (subCategory: ISubCategory) => {
      logger.debug('Alt kategori güncelleniyor', { subCategoryId: subCategory.id });
      return SubcategoryService.updateSubCategory(subCategory);
    },
    onSuccess: () => {
      logger.info('Alt kategori başarıyla güncellendi');
      toast({
        title: t('common:success'),
        description: t('messages:subcategory.update.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Alt kategori güncelleme hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:subcategory.update'),
        variant: 'destructive',
      });
    }
  });

  // Alt kategori silme mutasyonu
  const deleteSubCategory = useMutation({
    mutationFn: (subCategoryId: string) => {
      logger.debug('Alt kategori siliniyor', { subCategoryId });
      return SubcategoryService.deleteSubCategory(subCategoryId);
    },
    onSuccess: () => {
      logger.info('Alt kategori başarıyla silindi');
      toast({
        title: t('common:success'),
        description: t('messages:subcategory.delete.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Alt kategori silme hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:subcategory.delete'),
        variant: 'destructive',
      });
    }
  });

  return {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
  };
};
