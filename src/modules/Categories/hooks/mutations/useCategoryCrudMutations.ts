
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { CategoryManagementService } from '../../services/category.service';
import { categoryMutationLogger } from '../../logging';
import { ICategory } from '../../types';

export const useCategoryCrudMutations = (onSuccess?: () => void) => {
  const { t } = useTranslation(['categories', 'messages']);
  const logger = categoryMutationLogger.createSubLogger('CategoryCRUD');

  // Kategori oluşturma mutasyonu
  const createCategory = useMutation({
    mutationFn: (category: Omit<ICategory, 'id'>) => {
      logger.debug('Kategori oluşturuluyor', { category });
      return CategoryManagementService.createCategory(category);
    },
    onSuccess: (data) => {
      logger.info('Kategori başarıyla oluşturuldu', { categoryId: data.id });
      toast({
        title: t('common:success'),
        description: t('messages:create.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Kategori oluşturma hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:create'),
        variant: 'destructive',
      });
    }
  });

  // Kategori güncelleme mutasyonu
  const updateCategory = useMutation({
    mutationFn: (category: ICategory) => {
      logger.debug('Kategori güncelleniyor', { categoryId: category.id });
      return CategoryManagementService.updateCategory(category);
    },
    onSuccess: () => {
      logger.info('Kategori başarıyla güncellendi');
      toast({
        title: t('common:success'),
        description: t('messages:update.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Kategori güncelleme hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:update'),
        variant: 'destructive',
      });
    }
  });

  // Kategori silme mutasyonu
  const deleteCategory = useMutation({
    mutationFn: (categoryId: string) => {
      logger.debug('Kategori siliniyor', { categoryId });
      return CategoryManagementService.deleteCategory(categoryId);
    },
    onSuccess: () => {
      logger.info('Kategori başarıyla silindi');
      toast({
        title: t('common:success'),
        description: t('messages:delete.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Kategori silme hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:delete'),
        variant: 'destructive',
      });
    }
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory
  };
};
