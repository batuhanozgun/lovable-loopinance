
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ICategory } from '../../../types';

interface SortableItemProps {
  category: ICategory;
}

export const SortableItem: React.FC<SortableItemProps> = ({ category }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: category.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="font-medium">{category.name}</div>
        {category.icon && <span className="text-gray-500">{category.icon}</span>}
      </div>
    </div>
  );
};

export default SortableItem;
