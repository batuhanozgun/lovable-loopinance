
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ICategory, ISubCategory } from '../../../../types';
import { useDialogs } from './hooks/useDialogs';
import { CategoryItem } from './components/CategoryItem';
import { EditCategoryDialog } from './components/EditCategoryDialog';
import { DeleteCategoryDialog } from './components/DeleteCategoryDialog';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface SortableItemProps {
  category: ICategory;
  onEdit?: (category: ICategory) => void;
  onDelete?: (categoryId: string) => void;
  onEditSubCategory?: (categoryId: string, subCategory: ISubCategory) => void;
  onDeleteSubCategory?: (categoryId: string, subCategoryId: string) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({ 
  category,
  onEdit,
  onDelete,
  onEditSubCategory,
  onDeleteSubCategory
}) => {
  const { t } = useTranslation(['Categories', 'Messages']);
  const { toast } = useToast();
  const {
    isEditDialogOpen, setIsEditDialogOpen,
    isDeleteDialogOpen, setIsDeleteDialogOpen,
    editName, setEditName,
    editIcon, setEditIcon
  } = useDialogs(category);
  
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

  const handleEditSave = () => {
    if (onEdit && editName.trim()) {
      onEdit({
        ...category,
        name: editName.trim(),
        icon: editIcon
      });
    }
    setIsEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(category.id);
    }
    setIsDeleteDialogOpen(false);
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
        onEditSubCategory={onEditSubCategory}
        onDeleteSubCategory={onDeleteSubCategory}
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

export default SortableItem;
