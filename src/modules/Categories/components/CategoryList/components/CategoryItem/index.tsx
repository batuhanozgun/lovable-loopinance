
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ICategory, ISubCategory } from '@/modules/Categories/types';
import { useTranslation } from 'react-i18next';
import { SubcategoryItem } from '../SubcategoryItem';

interface CategoryItemProps {
  category: ICategory;
  attributes?: any;
  listeners?: any;
  onEditClick: (e: React.MouseEvent) => void;
  onDeleteClick: (e: React.MouseEvent) => void;
  onEditSubCategory?: (subCategory: ISubCategory) => Promise<void>;
  onDeleteSubCategory?: (subCategoryId: string) => Promise<void>;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  attributes,
  listeners,
  onEditClick,
  onDeleteClick,
  onEditSubCategory,
  onDeleteSubCategory
}) => {
  const { t } = useTranslation(['Categories']);
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubCategories = category.sub_categories && category.sub_categories.length > 0;

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleEditSubCategory = (updatedSubCategory: ISubCategory) => {
    if (onEditSubCategory) {
      return onEditSubCategory(updatedSubCategory);
    }
    return Promise.resolve();
  };

  const handleDeleteSubCategory = (subCategoryId: string) => {
    if (onDeleteSubCategory) {
      return onDeleteSubCategory(subCategoryId);
    }
    return Promise.resolve();
  };

  return (
    <>
      <div 
        {...attributes}
        {...listeners}
        className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab hover:bg-gray-50 transition-colors relative"
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
            <div className="flex gap-1 ml-2">
              <button
                type="button"
                onClick={onEditClick}
                className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title={t('Categories:actions.edit')}
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={onDeleteClick}
                className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title={t('Categories:actions.delete')}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
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
            <SubcategoryItem
              subCategory={subCategory}
              onEdit={handleEditSubCategory}
              onDelete={handleDeleteSubCategory}
            />
          </div>
        ))}
      </div>
    </>
  );
};
