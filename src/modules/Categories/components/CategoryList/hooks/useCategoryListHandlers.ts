
import { useState } from 'react';
import { ICategory, ICategoryUpdateParams, ISubCategory, ISubCategoryUpdateParams } from '@/modules/Categories/types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { operationsLogger } from '@/modules/Categories/logging';
import { useCategoryCrudMutations } from '@/modules/Categories/hooks/mutations/useCategoryCrudMutations';
import { useSubcategoryMutations } from '@/modules/Categories/hooks/mutations/useSubcategoryMutations';

interface UseCategoryListHandlersProps {
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

/**
 * Kategori listesi için işlemleri yöneten hook
 */
export const useCategoryListHandlers = ({ setCategories }: UseCategoryListHandlersProps) => {
  const { t } = useTranslation(['Categories', 'Messages']);
  const { toast } = useToast();
  const { updateCategory, deleteCategory } = useCategoryCrudMutations();
  const { updateSubCategory, deleteSubCategory } = useSubcategoryMutations();
  const logger = operationsLogger.createSubLogger('CategoryListHandlers');

  // Bir kategoriyi düzenleme işlemi
  const handleEditCategory = async (editedCategory: ICategory) => {
    try {
      logger.debug('Kategori düzenleme başlatıldı', { categoryId: editedCategory.id });
      
      const updateParams: ICategoryUpdateParams = {
        id: editedCategory.id,
        data: {
          name: editedCategory.name,
          icon: editedCategory.icon
        }
      };
      
      await updateCategory.mutateAsync(updateParams);
      
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === editedCategory.id 
            ? { ...cat, name: editedCategory.name, icon: editedCategory.icon } 
            : cat
        )
      );
      
      toast({
        title: t('Messages:category.update.success'),
        description: t('Messages:category.update.successDescription'),
      });
      
      logger.debug('Kategori başarıyla güncellendi', { categoryId: editedCategory.id });
    } catch (error) {
      logger.error('Kategori güncelleme hatası', error instanceof Error ? error : new Error(String(error)));
      
      toast({
        variant: "destructive",
        title: t('Categories:errors.update.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  // Bir kategoriyi silme işlemi
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      logger.debug('Kategori silme başlatıldı', { categoryId });
      
      await deleteCategory.mutateAsync(categoryId);
      
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== categoryId)
      );
      
      toast({
        title: t('Messages:category.delete.success'),
        description: t('Messages:category.delete.successDescription'),
      });
      
      logger.debug('Kategori başarıyla silindi', { categoryId });
    } catch (error) {
      logger.error('Kategori silme hatası', error instanceof Error ? error : new Error(String(error)));
      
      toast({
        variant: "destructive",
        title: t('Categories:errors.delete.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  // Bir alt kategoriyi düzenleme işlemi
  const handleEditSubCategory = async (categoryId: string, updatedSubCategory: ISubCategory) => {
    try {
      logger.debug('Alt kategori düzenleme başlatıldı', { 
        categoryId, 
        subCategoryId: updatedSubCategory.id 
      });
      
      const updateParams: ISubCategoryUpdateParams = {
        id: updatedSubCategory.id,
        data: {
          name: updatedSubCategory.name
        }
      };
      
      await updateSubCategory.mutateAsync(updateParams);
      
      setCategories(prevCategories => 
        prevCategories.map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              sub_categories: category.sub_categories?.map(subCat => 
                subCat.id === updatedSubCategory.id 
                  ? { ...subCat, name: updatedSubCategory.name } 
                  : subCat
              )
            };
          }
          return category;
        })
      );
      
      toast({
        title: t('Messages:subcategory.update.success'),
        description: t('Messages:subcategory.update.successDescription'),
      });
      
      logger.debug('Alt kategori başarıyla güncellendi', { 
        categoryId, 
        subCategoryId: updatedSubCategory.id 
      });
    } catch (error) {
      logger.error('Alt kategori güncelleme hatası', error instanceof Error ? error : new Error(String(error)));
      
      toast({
        variant: "destructive",
        title: t('Categories:errors.subcategory.update.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  // Bir alt kategoriyi silme işlemi
  const handleDeleteSubCategory = async (categoryId: string, subCategoryId: string) => {
    try {
      logger.debug('Alt kategori silme başlatıldı', { 
        categoryId, 
        subCategoryId 
      });
      
      await deleteSubCategory.mutateAsync(subCategoryId);
      
      setCategories(prevCategories => 
        prevCategories.map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              sub_categories: category.sub_categories?.filter(subCat => 
                subCat.id !== subCategoryId
              )
            };
          }
          return category;
        })
      );
      
      toast({
        title: t('Messages:subcategory.delete.success'),
        description: t('Messages:subcategory.delete.successDescription'),
      });
      
      logger.debug('Alt kategori başarıyla silindi', { 
        categoryId, 
        subCategoryId 
      });
    } catch (error) {
      logger.error('Alt kategori silme hatası', error instanceof Error ? error : new Error(String(error)));
      
      toast({
        variant: "destructive",
        title: t('Categories:errors.subcategory.delete.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return {
    handleEditCategory,
    handleDeleteCategory,
    handleEditSubCategory,
    handleDeleteSubCategory
  };
};

