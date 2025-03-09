
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { CategoryOrganizationService } from '../../services/category';
import { categoryMutationLogger } from '../../logging';

/**
 * Kategori ve alt kategori sıralama işlemleri için hook
 */
export const useCategoryOrderingMutations = (invalidateCategories: () => void) => {
  const { t } = useTranslation(['messages', 'errors'], { keyPrefix: 'categories' });
  const logger = categoryMutationLogger.createSubLogger('OrderingMutations');
  const organizationService = new CategoryOrganizationService();

  // Kategori sıralamasını güncelleme mutasyonu
  const updateCategoryOrder = useMutation({
    mutationFn: (categories: { id: string, sort_order: number }[]) => {
      logger.debug('Kategori sıralaması güncelleniyor', { count: categories.length });
      return organizationService.updateCategoryOrder(categories);
    },
    onSuccess: () => {
      logger.debug('Kategori sıralaması başarıyla güncellendi');
      toast({
        title: t('sort.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Kategori sıralama hatası', error);
      toast({
        title: t('sort.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  // Alt kategori sıralamasını güncelleme mutasyonu
  const updateSubCategoryOrder = useMutation({
    mutationFn: (subCategories: { id: string, sort_order: number }[]) => {
      logger.debug('Alt kategori sıralaması güncelleniyor', { count: subCategories.length });
      return organizationService.updateSubCategoryOrder(subCategories);
    },
    onSuccess: () => {
      logger.debug('Alt kategori sıralaması başarıyla güncellendi');
      toast({
        title: t('subcategory.sort.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori sıralama hatası', error);
      toast({
        title: t('subcategory.sort.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  // Alt kategori taşıma işlemi
  const moveSubCategories = useMutation({
    mutationFn: ({ sourceId, targetId, subCategoryIds }: { 
      sourceId: string, 
      targetId: string, 
      subCategoryIds: string[] 
    }) => {
      logger.debug('Alt kategoriler taşınıyor', { sourceId, targetId, count: subCategoryIds.length });
      return organizationService.moveSubCategories(sourceId, targetId, subCategoryIds);
    },
    onSuccess: () => {
      logger.debug('Alt kategoriler başarıyla taşındı');
      toast({
        title: t('move.success'),
        variant: 'default',
      });
      invalidateCategories();
    },
    onError: (error: Error) => {
      logger.error('Alt kategori taşıma hatası', error);
      toast({
        title: t('move.failed', { ns: 'errors' }),
        variant: 'destructive',
      });
    }
  });

  return {
    updateCategoryOrder,
    updateSubCategoryOrder,
    moveSubCategories
  };
};
