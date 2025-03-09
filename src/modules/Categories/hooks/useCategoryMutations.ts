
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '../services/category.service';
import { CATEGORIES_QUERY_KEY } from './useCategories';
import { operationsLogger } from '../logging';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import type { 
  ICreateCategoryData, 
  IUpdateCategoryData,
  ICreateSubCategoryData,
  IUpdateSubCategoryData,
  ICategoryMoveOperation
} from '../types';

/**
 * Kategori mutasyonlarını yönetmek için hook
 */
export const useCategoryMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation(['Categories', 'Messages', 'Errors']);
  
  // Kategori oluşturma
  const createCategory = useMutation({
    mutationFn: (data: ICreateCategoryData) => CategoryService.createCategory(data),
    onSuccess: () => {
      toast({
        title: t('Messages:create.success'),
        description: t('Categories:form.categoryName')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Kategori oluşturma hatası', error);
      toast({
        title: t('Errors:create.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Kategori güncelleme
  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateCategoryData }) => CategoryService.updateCategory(id, data),
    onSuccess: () => {
      toast({
        title: t('Messages:update.success'),
        description: t('Categories:form.categoryName')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Kategori güncelleme hatası', error);
      toast({
        title: t('Errors:update.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Kategori silme
  const deleteCategory = useMutation({
    mutationFn: (id: string) => CategoryService.deleteCategory(id),
    onSuccess: () => {
      toast({
        title: t('Messages:delete.success'),
        description: t('Categories:form.categoryName')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Kategori silme hatası', error);
      toast({
        title: t('Errors:delete.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Alt kategori oluşturma
  const createSubCategory = useMutation({
    mutationFn: (data: ICreateSubCategoryData) => CategoryService.createSubCategory(data),
    onSuccess: () => {
      toast({
        title: t('Messages:create.success'),
        description: t('Categories:form.subCategoryName')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Alt kategori oluşturma hatası', error);
      toast({
        title: t('Errors:create.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Alt kategori güncelleme
  const updateSubCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateSubCategoryData }) => CategoryService.updateSubCategory(id, data),
    onSuccess: () => {
      toast({
        title: t('Messages:update.success'),
        description: t('Categories:form.subCategoryName')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Alt kategori güncelleme hatası', error);
      toast({
        title: t('Errors:update.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Alt kategori silme
  const deleteSubCategory = useMutation({
    mutationFn: (id: string) => CategoryService.deleteSubCategory(id),
    onSuccess: () => {
      toast({
        title: t('Messages:delete.success'),
        description: t('Categories:form.subCategoryName')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Alt kategori silme hatası', error);
      toast({
        title: t('Errors:delete.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Kategori sıralamasını güncelleme
  const updateCategoryOrder = useMutation({
    mutationFn: (categories: { id: string, sort_order: number }[]) => CategoryService.updateCategoryOrder(categories),
    onSuccess: () => {
      toast({
        title: t('Messages:sort.success')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Kategori sıralama hatası', error);
      toast({
        title: t('Errors:sort.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Alt kategori sıralamasını güncelleme
  const updateSubCategoryOrder = useMutation({
    mutationFn: (subCategories: { id: string, sort_order: number }[]) => CategoryService.updateSubCategoryOrder(subCategories),
    onSuccess: () => {
      toast({
        title: t('Messages:sort.success')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Alt kategori sıralama hatası', error);
      toast({
        title: t('Errors:sort.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  // Alt kategorileri taşıma
  const moveSubCategories = useMutation({
    mutationFn: ({ sourceId, targetId, subCategoryIds }: ICategoryMoveOperation) => 
      CategoryService.moveSubCategories(sourceId, targetId, subCategoryIds),
    onSuccess: () => {
      toast({
        title: t('Messages:move.success')
      });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      operationsLogger.error('Alt kategori taşıma hatası', error);
      toast({
        title: t('Errors:move.failed'),
        description: error.message,
        variant: 'destructive'
      });
    }
  });
  
  return {
    createCategory,
    updateCategory,
    deleteCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    updateCategoryOrder,
    updateSubCategoryOrder,
    moveSubCategories
  };
};
