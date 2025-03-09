
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
import { ICategory, ICategoryUpdateParams } from '../../types';
import { SortableItem } from './components/SortableItem';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { useCategoryCrudMutations } from '../../hooks/mutations/useCategoryCrudMutations';

interface CategoryListProps {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  updateCategoryOrder: (data: { id: string; sort_order: number }[]) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, updateCategoryOrder }) => {
  const { t } = useTranslation(['Categories', 'Messages']);
  const { toast } = useToast();
  const { updateCategory, deleteCategory } = useCategoryCrudMutations();
  
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
      
      // Sıralama verilerini hazırla
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
      
      await updateCategory(updateParams);
      
      // Kategori listesini güncelle
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === editedCategory.id 
            ? { ...cat, name: editedCategory.name, icon: editedCategory.icon } 
            : cat
        )
      );
      
      // Başarı toast mesajı göster
      toast({
        title: t('Messages:category.update.success'),
        description: t('Messages:category.update.successDescription'),
      });
    } catch (error) {
      console.error('Kategori güncelleme hatası:', error);
      // Hata toast mesajı göster
      toast({
        variant: "destructive",
        title: t('Categories:errors.update.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      
      // Kategori listesinden sil
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== categoryId)
      );
      
      // Başarı toast mesajı göster
      toast({
        title: t('Messages:category.delete.success'),
        description: t('Messages:category.delete.successDescription'),
      });
    } catch (error) {
      console.error('Kategori silme hatası:', error);
      // Hata toast mesajı göster
      toast({
        variant: "destructive",
        title: t('Categories:errors.delete.failed'),
        description: error instanceof Error ? error.message : String(error),
      });
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
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default CategoryList;
