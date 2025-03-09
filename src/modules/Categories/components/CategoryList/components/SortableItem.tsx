
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ICategory } from '../../../types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SortableItemProps {
  category: ICategory;
}

export const SortableItem: React.FC<SortableItemProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubCategories = category.sub_categories && category.sub_categories.length > 0;
  
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

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-2"
    >
      <div 
        {...attributes}
        {...listeners}
        className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasSubCategories && (
              <button 
                onClick={toggleExpand}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                type="button"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            )}
            <div className="font-medium">{category.name}</div>
          </div>
          <div className="flex items-center gap-2">
            {hasSubCategories && (
              <Badge variant="outline" className="text-xs">
                {category.sub_categories?.length}
              </Badge>
            )}
            {category.icon && <span className="text-gray-500">{category.icon}</span>}
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "pl-8 overflow-hidden transition-all duration-300", 
          isExpanded 
            ? "max-h-96 opacity-100 mt-2 space-y-2 animate-accordion-down" 
            : "max-h-0 opacity-0 animate-accordion-up"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasSubCategories && category.sub_categories?.map((subCategory) => (
          <div 
            key={subCategory.id}
            className="p-2 bg-white rounded border border-gray-100 text-sm shadow-sm"
          >
            {subCategory.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortableItem;
