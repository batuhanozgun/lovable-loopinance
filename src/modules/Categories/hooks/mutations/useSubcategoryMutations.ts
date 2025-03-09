
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { SubcategoryService } from '../../services/category';
import { categoryMutationLogger } from '../../logging';
import type { ICreateSubCategoryData, IUpdateSubCategoryData } from '../../types';

/**
 * Alt kategori işlemleri için mutations hook'u
 */
export const useSubcategoryMutations = (invalidateCategories: () => void) => {
  const { t } = useTranslation(['messages', 'errors'], { keyPrefix: 'categories' });
  const logger = categoryMutationLogger.createSubLogger('SubcategoryMutations');
  const subcategoryService = new SubcategoryService();

  // Alt kategori oluşturma mutasyonu
  const create = useMutation({
    mutationFn: (data: ICreateSubCategoryData) => {
      logger.debug('Alt kategori oluşturuluyor', { data });
      return subcategoryService.createSubCategory(data);
    },
    onSuccess: () => {
      logger.debug('Alt kategori başarıyla oluşturuldu');
      toast({
        title: t('subcategory.create.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori oluşturma hatası', error);
      toast({
        title: t('subcategory.create.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  // Alt kategori güncelleme mutasyonu
  const update = useMutation({
    mutationFn: ({ id, data }: { id: string, data: IUpdateSubCategoryData }) => {
      logger.debug('Alt kategori güncelleniyor', { id, data });
      return subcategoryService.updateSubCategory(id, data);
    },
    onSuccess: () => {
      logger.debug('Alt kategori başarıyla güncellendi');
      toast({
        title: t('subcategory.update.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori güncelleme hatası', error);
      toast({
        title: t('subcategory.update.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  // Alt kategori silme mutasyonu
  const remove = useMutation({
    mutationFn: (id: string) => {
      logger.debug('Alt kategori siliniyor', { id });
      return subcategoryService.deleteSubCategory(id);
    },
    onSuccess: () => {
      logger.debug('Alt kategori başarıyla silindi');
      toast({
        title: t('subcategory.delete.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori silme hatası', error);
      toast({
        title: t('subcategory.delete.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  return {
    create,
    update,
    delete: remove
  };
};
