
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subcategoryService } from '../../services/category.service';
import { formsLogger } from '../../logging';
import type { 
  ICreateSubCategoryData, 
  IUpdateSubCategoryData, 
  ISubCategoryUpdateParams, 
  ISubCategory 
} from '../../types';

/**
 * Alt kategori işlemleri için mutation hook'ları
 */
export const useSubcategoryMutations = (invalidateCallback?: () => void) => {
  const queryClient = useQueryClient();
  const logger = formsLogger.createSubLogger('SubcategoryMutations');

  // Alt kategori oluşturma mutation'ı
  const createSubCategory = useMutation({
    mutationFn: async (data: ICreateSubCategoryData) => {
      logger.debug('Alt kategori oluşturma isteği', { name: data.name, categoryId: data.category_id });
      const result = await subcategoryService.createSubCategory(data);
      logger.debug('Alt kategori başarıyla oluşturuldu', { id: result.id });
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', variables.category_id] });
      if (invalidateCallback) invalidateCallback();
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Alt kategori oluşturma hatası', error);
      }
    }
  });

  // Alt kategori güncelleme mutation'ı
  const updateSubCategory = useMutation({
    mutationFn: async ({ id, data }: ISubCategoryUpdateParams): Promise<ISubCategory> => {
      logger.debug('Alt kategori güncelleme isteği', { id });
      const result = await subcategoryService.updateSubCategory(id, data);
      logger.debug('Alt kategori başarıyla güncellendi', { id });
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (invalidateCallback) invalidateCallback();
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Alt kategori güncelleme hatası', error);
      }
    }
  });

  // Alt kategori silme mutation'ı
  const deleteSubCategory = useMutation({
    mutationFn: async (id: string) => {
      logger.debug('Alt kategori silme isteği', { id });
      await subcategoryService.deleteSubCategory(id);
      logger.debug('Alt kategori başarıyla silindi', { id });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (invalidateCallback) invalidateCallback();
    },
    meta: {
      onError: (error: Error) => {
        logger.error('Alt kategori silme hatası', error);
      }
    }
  });

  return {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
  };
};
