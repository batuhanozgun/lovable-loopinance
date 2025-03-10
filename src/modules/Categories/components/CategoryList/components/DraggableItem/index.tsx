
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ICategory, ISubCategory } from '@/modules/Categories/types';
import { useCategoryDialogs } from '@/modules/Categories/hooks/dialogs/useCategoryDialogs';
import { CategoryItem } from '../CategoryItem';
import { 
  EditCategoryDialog, 
  DeleteCategoryDialog 
} from '@/modules/Categories/components/Dialogs';

interface DraggableItemProps {
  category: ICategory;
  onEdit?: (category: ICategory) => Promise<void>;
  onDelete?: (categoryId: string) => Promise<void>;
  onEditSubCategory?: (categoryId: string, subCategory: ISubCategory) => Promise<void>;
  onDeleteSubCategory?: (categoryId: string, subCategoryId: string) => Promise<void>;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ 
  category,
  onEdit,
  onDelete,
  onEditSubCategory,
  onDeleteSubCategory
}) => {
  const {
    isEditDialogOpen, setIsEditDialogOpen,
    isDeleteDialogOpen, setIsDeleteDialogOpen,
    editName, setEditName,
    editIcon, setEditIcon
  } = useCategoryDialogs(category);
  
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

  const handleEditSave = async () => {
    if (onEdit && editName.trim()) {
      await onEdit({
        ...category,
        name: editName.trim(),
        icon: editIcon
      });
    }
    setIsEditDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (onDelete) {
      await onDelete(category.id);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleEditSubCategory = async (updatedSubCategory: ISubCategory) => {
    if (onEditSubCategory) {
      await onEditSubCategory(category.id, updatedSubCategory);
    }
  };

  const handleDeleteSubCategory = async (subCategoryId: string) => {
    if (onDeleteSubCategory) {
      await onDeleteSubCategory(category.id, subCategoryId);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-2"
    >
      <CategoryItem 
        category={category} 
        attributes={attributes}
        listeners={listeners}
        onEditClick={() => setIsEditDialogOpen(true)}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
        onEditSubCategory={handleEditSubCategory}
        onDeleteSubCategory={handleDeleteSubCategory}
      />

      <EditCategoryDialog 
        isOpen={isEditDialogOpen} 
        setIsOpen={setIsEditDialogOpen}
        name={editName}
        setName={setEditName}
        icon={editIcon}
        setIcon={setEditIcon}
        onSave={handleEditSave}
      />

      <DeleteCategoryDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        category={category}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
