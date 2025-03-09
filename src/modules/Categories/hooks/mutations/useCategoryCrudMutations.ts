
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { CategoryManagementService } from '../../services/category';
import { categoryMutationLogger } from '../../logging';
import type { ICreateCategoryData, IUpdateCategoryData } from '../../types';

/**
 * Kategori temel CRUD işlemleri için mutations hook'u
 */
export const useCategoryCrudMutations = (invalidateCategories: () => void) => {
  const { t } = useTranslation(['messages', 'errors'], { keyPrefix: 'categories' });
  const logger = categoryMutationLogger.createSubLogger('CategoryCrud');
  const categoryService = new CategoryManagementService();

  // Kategori oluşturma mutasyonu
  const createCategory = useMutation({
    mutationFn: (data: ICreateCategoryData) => {
      logger.debug('Kategori oluşturuluyor', { data });
      return categoryService.createCategory(data);
    },
    onSuccess: () => {
      logger.debug('Kategori başarıyla oluşturuldu');
      toast({
        title: t('create.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Kategori oluşturma hatası', error);
      toast({
        title: t('create.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  // Kategori güncelleme mutasyonu
  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string, data: IUpdateCategoryData }) => {
      logger.debug('Kategori güncelleniyor', { id, data });
      return categoryService.updateCategory(id, data);
    },
    onSuccess: () => {
      logger.debug('Kategori başarıyla güncellendi');
      toast({
        title: t('update.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Kategori güncelleme hatası', error);
      toast({
        title: t('update.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  // Kategori silme mutasyonu
  const deleteCategory = useMutation({
    mutationFn: (id: string) => {
      logger.debug('Kategori siliniyor', { id });
      return categoryService.deleteCategory(id);
    },
    onSuccess: () => {
      logger.debug('Kategori başarıyla silindi');
      toast({
        title: t('delete.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Kategori silme hatası', error);
      toast({
        title: t('delete.failed', { ns: 'errors' }),
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
