
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { CategoryService } from '../services/category.service';
import { operationsLogger } from '../logging';
import type { 
  ICreateCategoryData, 
  IUpdateCategoryData,
  ICreateSubCategoryData,
  IUpdateSubCategoryData
} from '../types';

/**
 * Kategori mutasyonları için hook
 */
export const useCategoryMutations = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['messages', 'errors'], { keyPrefix: 'categories' });
  const logger = operationsLogger.createSubLogger('CategoryMutations');
  
  // Tüm kategori verilerini yenileme fonksiyonu
  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  // Kategori oluşturma mutasyonu
  const createCategory = useMutation({
    mutationFn: (data: ICreateCategoryData) => {
      logger.debug('Kategori oluşturuluyor', { data });
      return CategoryService.createCategory(data);
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
      return CategoryService.updateCategory(id, data);
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
      return CategoryService.deleteCategory(id);
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

  // Alt kategori işlemleri
  const subcategory = {
    // Alt kategori oluşturma mutasyonu
    create: useMutation({
      mutationFn: (data: ICreateSubCategoryData) => {
        logger.debug('Alt kategori oluşturuluyor', { data });
        return CategoryService.createSubCategory(data);
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
    }),

    // Alt kategori güncelleme mutasyonu
    update: useMutation({
      mutationFn: ({ id, data }: { id: string, data: IUpdateSubCategoryData }) => {
        logger.debug('Alt kategori güncelleniyor', { id, data });
        return CategoryService.updateSubCategory(id, data);
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
    }),

    // Alt kategori silme mutasyonu
    delete: useMutation({
      mutationFn: (id: string) => {
        logger.debug('Alt kategori siliniyor', { id });
        return CategoryService.deleteSubCategory(id);
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
    })
  };

  // Sıralama işlemleri
  const ordering = {
    // Kategori sıralamasını güncelleme mutasyonu
    updateCategoryOrder: useMutation({
      mutationFn: (categories: { id: string, sort_order: number }[]) => {
        logger.debug('Kategori sıralaması güncelleniyor', { count: categories.length });
        return CategoryService.updateCategoryOrder(categories);
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
    }),

    // Alt kategori sıralamasını güncelleme mutasyonu
    updateSubCategoryOrder: useMutation({
      mutationFn: (subCategories: { id: string, sort_order: number }[]) => {
        logger.debug('Alt kategori sıralaması güncelleniyor', { count: subCategories.length });
        return CategoryService.updateSubCategoryOrder(subCategories);
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
    })
  };

  // Alt kategori taşıma işlemi
  const moveSubCategories = useMutation({
    mutationFn: ({ sourceId, targetId, subCategoryIds }: { 
      sourceId: string, 
      targetId: string, 
      subCategoryIds: string[] 
    }) => {
      logger.debug('Alt kategoriler taşınıyor', { sourceId, targetId, count: subCategoryIds.length });
      return CategoryService.moveSubCategories(sourceId, targetId, subCategoryIds);
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
    createCategory,
    updateCategory,
    deleteCategory,
    subcategory,
    ordering,
    moveSubCategories
  };
};
