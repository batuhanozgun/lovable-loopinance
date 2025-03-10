
import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ICategory } from '../../types';
import { DraggableItem } from './components/DraggableItem';
import { useTranslation } from 'react-i18next';
import { useCategoryListHandlers, useCategoryDnd } from './hooks';
import { EmptyState } from './components/EmptyState';
import { operationsLogger } from '@/modules/Categories/logging';

interface CategoryListProps {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  reorderCategories: (data: { categories: { id: string; sort_order: number }[] }) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  setCategories, 
  reorderCategories 
}) => {
  const { t } = useTranslation(['Categories']);
  const logger = operationsLogger.createSubLogger('CategoryList');
  
  // Kategori işlemlerini yöneten hook
  const {
    handleEditCategory,
    handleDeleteCategory,
    handleEditSubCategory,
    handleDeleteSubCategory
  } = useCategoryListHandlers({ setCategories });
  
  // Sürükle-bırak işlevselliğini yöneten hook
  const { 
    sensors, 
    handleDragEnd 
  } = useCategoryDnd({ categories, setCategories, reorderCategories });

  if (!categories || categories.length === 0) {
    logger.debug('Kategori listesi boş, EmptyState gösteriliyor');
    return <EmptyState />;
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
            <DraggableItem 
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
