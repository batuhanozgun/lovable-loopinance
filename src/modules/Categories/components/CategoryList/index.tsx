import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ICategory } from '../../types';

interface SortEndParams {
  oldIndex: number;
  newIndex: number;
}

interface CategoryListProps {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  updateCategoryOrder: (data: { id: string; sort_order: number }[]) => void;
}

const SortableItem = SortableElement(({value}) => <div>{value.name}</div>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value.id}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export const CategoryList: React.FC<CategoryListProps> = ({ categories, setCategories, updateCategoryOrder }) => {
  const handleSortEnd = async ({ oldIndex, newIndex }: SortEndParams) => {
    if (oldIndex === newIndex) {
      return;
    }

    const newItems = arrayMove(categories, oldIndex, newIndex);
    
    // Yeni sıralamayı yerel olarak güncelle
    setCategories(newItems);
    
    // Sıralama verilerini hazırla
    const sortData = newItems.map((category, index) => ({
      id: category.id,
      sort_order: index
    }));
    
    try {
      // API değişikliği düzeltmesi: .mutate() yerine direkt fonksiyon çağrısı kullanıyoruz
      updateCategoryOrder(sortData);
    } catch (error) {
      console.error('Kategori sıralama hatası:', error);
      // Başarısız olursa orijinal sıralamaya geri dön
      setCategories(categories);
    }
  };

  return <SortableList items={categories} onSortEnd={handleSortEnd} />;
};
