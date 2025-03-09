
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { categoryMutationLogger } from '../../logging';
import { CategoryOrganizationService } from '../../services/category.service';
import { ICategoryOrder, ISubCategoryOrder } from '../../types';

export const useCategoryOrderingMutations = (onSuccess?: () => void) => {
  const { t } = useTranslation(['categories', 'messages']);
  const logger = categoryMutationLogger.createSubLogger('CategoryOrdering');

  // Kategori sıralama mutasyonu
  const updateCategoryOrder = useMutation({
    mutationFn: (categories: ICategoryOrder[]) => {
      logger.debug('Kategori sıralaması güncelleniyor', { count: categories.length });
      return CategoryOrganizationService.updateCategoryOrder(categories);
    },
    onSuccess: () => {
      logger.info('Kategori sıralaması başarıyla güncellendi');
      toast({
        title: t('common:success'),
        description: t('messages:sort.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Kategori sıralama güncellemesi hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:sort'),
        variant: 'destructive',
      });
    }
  });

  // Alt kategori sıralama mutasyonu
  const updateSubCategoryOrder = useMutation({
    mutationFn: (subCategories: ISubCategoryOrder[]) => {
      logger.debug('Alt kategori sıralaması güncelleniyor', { count: subCategories.length });
      return CategoryOrganizationService.updateSubCategoryOrder(subCategories);
    },
    onSuccess: () => {
      logger.info('Alt kategori sıralaması başarıyla güncellendi');
      toast({
        title: t('common:success'),
        description: t('messages:subcategory.sort.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Alt kategori sıralama güncellemesi hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:subcategory.sort'),
        variant: 'destructive',
      });
    }
  });

  // Alt kategorileri taşıma mutasyonu
  const moveSubCategories = useMutation({
    mutationFn: ({ sourceId, targetId }: { sourceId: string; targetId: string | null }) => {
      logger.debug('Alt kategoriler taşınıyor', { sourceId, targetId });
      return CategoryOrganizationService.moveSubCategories(sourceId, targetId);
    },
    onSuccess: () => {
      logger.info('Alt kategoriler başarıyla taşındı');
      toast({
        title: t('common:success'),
        description: t('messages:move.success'),
      });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      logger.error('Alt kategorileri taşıma hatası', { error });
      toast({
        title: t('common:error'),
        description: t('errors:move'),
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
