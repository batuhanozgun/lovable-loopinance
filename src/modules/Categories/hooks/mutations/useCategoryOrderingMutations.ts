
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '../../services/category.service';
import { formsLogger } from '../../logging';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import type { 
  ICategoryOrder, 
  ISubCategoryOrder,
  IReorderCategoriesData,
  IReorderSubCategoriesData,
  ICategoryMoveOperation
} from '../../types';

/**
 * Kategori ve alt kategori sıralama işlemleri için mutation hook'ları
 */
export const useCategoryOrderingMutations = (invalidateCallback?: () => void) => {
  const queryClient = useQueryClient();
  const logger = formsLogger.createSubLogger('CategoryOrderingMutations');
  const { toast } = useToast();
  const { t } = useTranslation(['Messages']);

  // Kategori sıralama mutation'ı
  const reorderCategories = useMutation({
    mutationFn: async ({ categories }: IReorderCategoriesData) => {
      logger.debug('Kategori sıralama isteği', { count: categories.length });
      const result = await organizationService.updateCategoryOrder(categories);
      if (!result.success) {
        throw new Error(result.error || 'Kategori sıralama hatası');
      }
      logger.debug('Kategoriler başarıyla sıralandı');
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (invalidateCallback) invalidateCallback();
      
      toast({
        title: t('Messages:category.reorder.success'),
        description: t('Messages:category.reorder.successDescription'),
      });
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Kategori sıralama hatası', error);
        
        toast({
          variant: "destructive",
          title: t('Messages:category.reorder.error'),
          description: error.message,
        });
      }
    }
  });

  // Alt kategori sıralama mutation'ı
  const reorderSubCategories = useMutation({
    mutationFn: async ({ subCategories }: IReorderSubCategoriesData) => {
      logger.debug('Alt kategori sıralama isteği', { count: subCategories.length });
      const result = await organizationService.updateSubCategoryOrder(subCategories);
      if (!result.success) {
        throw new Error(result.error || 'Alt kategori sıralama hatası');
      }
      logger.debug('Alt kategoriler başarıyla sıralandı');
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (invalidateCallback) invalidateCallback();
      
      toast({
        title: t('Messages:subcategory.reorder.success'),
        description: t('Messages:subcategory.reorder.successDescription'),
      });
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Alt kategori sıralama hatası', error);
        
        toast({
          variant: "destructive",
          title: t('Messages:subcategory.reorder.error'),
          description: error.message,
        });
      }
    }
  });

  // Alt kategorileri taşıma mutation'ı
  const moveSubCategories = useMutation({
    mutationFn: async ({ sourceId, targetId, subCategoryIds }: ICategoryMoveOperation) => {
      logger.debug('Alt kategori taşıma isteği', { 
        sourceId, 
        targetId,
        count: subCategoryIds.length
      });
      
      const result = await organizationService.moveSubCategoriesToCategory(
        sourceId, 
        targetId, 
        subCategoryIds
      );
      
      if (!result.success) {
        throw new Error(result.error || 'Alt kategori taşıma hatası');
      }
      
      logger.debug('Alt kategoriler başarıyla taşındı');
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (invalidateCallback) invalidateCallback();
      
      toast({
        title: t('Messages:subcategory.move.success'),
        description: t('Messages:subcategory.move.successDescription'),
      });
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Alt kategori taşıma hatası', error);
        
        toast({
          variant: "destructive",
          title: t('Messages:subcategory.move.error'),
          description: error.message,
        });
      }
    }
  });

  return {
    reorderCategories,
    reorderSubCategories,
    moveSubCategories
  };
};
