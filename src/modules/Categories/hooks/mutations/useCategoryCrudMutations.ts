
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryManagementService } from '../../services/CategoryManagementService';
import { formsLogger } from '../../logging';
import type { ICreateCategoryData, IUpdateCategoryData } from '../../types';

/**
 * Kategori CRUD işlemleri için mutation hook'ları
 */
export const useCategoryCrudMutations = (invalidateCallback?: () => void) => {
  const queryClient = useQueryClient();
  const logger = formsLogger.createSubLogger('CategoryMutations');
  const categoryService = new CategoryManagementService();

  // Kategori oluşturma mutation'ı
  const createCategory = useMutation({
    mutationFn: async (data: ICreateCategoryData) => {
      logger.debug('Kategori oluşturma isteği', { name: data.name });
      const result = await categoryService.createCategory(data);
      logger.debug('Kategori başarıyla oluşturuldu', { id: result.id });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (invalidateCallback) invalidateCallback();
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Kategori oluşturma hatası', error);
      }
    }
  });

  // Kategori güncelleme mutation'ı
  const updateCategory = useMutation({
    mutationFn: async (data: IUpdateCategoryData) => {
      logger.debug('Kategori güncelleme isteği', { id: data.id });
      const result = await categoryService.updateCategory(data);
      logger.debug('Kategori başarıyla güncellendi', { id: data.id });
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] });
      if (invalidateCallback) invalidateCallback();
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Kategori güncelleme hatası', error);
      }
    }
  });

  // Kategori silme mutation'ı
  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      logger.debug('Kategori silme isteği', { id });
      await categoryService.deleteCategory(id);
      logger.debug('Kategori başarıyla silindi', { id });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (invalidateCallback) invalidateCallback();
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Kategori silme hatası', error);
      }
    }
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory
  };
};
