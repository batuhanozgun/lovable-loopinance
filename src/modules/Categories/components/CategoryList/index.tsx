
import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { ICategory, ICategoryUpdateParams, ISubCategory, ISubCategoryUpdateParams } from '../../types';
import { SortableItem } from './components/SortableItem';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { useCategoryCrudMutations } from '../../hooks/mutations/useCategoryCrudMutations';
import { useSubcategoryMutations } from '../../hooks/mutations/useSubcategoryMutations';

interface CategoryListProps {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  updateCategoryOrder: (data: { id: string; sort_order: number }[]) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, updateCategoryOrder }) => {
  const { t } = useTranslation(['Categories', 'Messages']);
  const { toast } = useToast();
  const { updateCategory, deleteCategory } = useCategoryCrudMutations();
  const { updateSubCategory, deleteSubCategory } = useSubcategoryMutations();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Sürükleme işleminin başlaması için gereken minimum mesafe
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    setCategories((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      
      const sortData = newItems.map((category, index) => ({
        id: category.id,
        sort_order: index
      }));
      
      try {
        updateCategoryOrder(sortData);
      } catch (error) {
        console.error('Kategori sıralama hatası:', error);
      }
      
      return newItems;
    });
  };

  const handleEditCategory = async (editedCategory: ICategory) => {
    try {
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
    } catch (error) {
      console.error('Kategori güncelleme hatası:', error);
      toast({
        variant: "destructive",
        title: t('Categories:errors.update.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory.mutateAsync(categoryId);
      
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== categoryId)
      );
      
      toast({
        title: t('Messages:category.delete.success'),
        description: t('Messages:category.delete.successDescription'),
      });
    } catch (error) {
      console.error('Kategori silme hatası:', error);
      toast({
        variant: "destructive",
        title: t('Categories:errors.delete.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const handleEditSubCategory = async (categoryId: string, updatedSubCategory: ISubCategory) => {
    try {
      const updateParams: ISubCategoryUpdateParams = {
        id: updatedSubCategory.id,
        data: {
          name: updatedSubCategory.name
        }
      };
      
      // updateSubCategory.mutateAsync kullanarak alt kategori güncellemesi yapılıyor
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
    } catch (error) {
      console.error('Alt kategori güncelleme hatası:', error);
      
      toast({
        variant: "destructive",
        title: t('Categories:errors.subcategory.update.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
      
      throw error;
    }
  };

  const handleDeleteSubCategory = async (categoryId: string, subCategoryId: string) => {
    try {
      // deleteSubCategory.mutateAsync kullanarak alt kategori silme işlemi yapılıyor
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
    } catch (error) {
      console.error('Alt kategori silme hatası:', error);
      
      toast({
        variant: "destructive",
        title: t('Categories:errors.subcategory.delete.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
      
      throw error;
    }
  };

  if (!categories || categories.length === 0) {
    return <div className="p-4 text-center text-gray-500">Henüz kategori bulunmuyor.</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={categories.map(category => category.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1">
          {categories.map((category) => (
            <SortableItem 
              key={category.id} 
              category={category} 
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              onEditSubCategory={handleEditSubCategory}
              onDeleteSubCategory={handleDeleteSubCategory}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default CategoryList;
