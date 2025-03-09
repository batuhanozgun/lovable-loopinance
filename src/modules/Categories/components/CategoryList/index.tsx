
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
import { ICategory } from '../../types';
import { SortableItem } from './components/SortableItem';

interface CategoryListProps {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  updateCategoryOrder: (data: { id: string; sort_order: number }[]) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, updateCategoryOrder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
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
        <div className="space-y-2">
          {categories.map((category) => (
            <SortableItem key={category.id} category={category} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default CategoryList;
