
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { ISubCategory } from '@/modules/Categories/types';
import { EditSubcategoryDialog } from '../EditSubcategoryDialog';
import { DeleteSubcategoryDialog } from '../DeleteSubcategoryDialog';
import { useDialogs } from './hooks/useDialogs';

interface SubcategoryItemProps {
  subCategory: ISubCategory;
  onEdit: (updatedSubCategory: ISubCategory) => void;
  onDelete: (id: string) => void;
}

export const SubcategoryItem: React.FC<SubcategoryItemProps> = ({
  subCategory,
  onEdit,
  onDelete
}) => {
  const {
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    editName,
    setEditName
  } = useDialogs(subCategory);

  const handleEditSave = () => {
    if (editName.trim()) {
      onEdit({
        ...subCategory,
        name: editName.trim()
      });
    }
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete(subCategory.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm">{subCategory.name}</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setIsEditDialogOpen(true)}
            className="p-1.5 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Düzenle"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Sil"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <EditSubcategoryDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        name={editName}
        setName={setEditName}
        onSave={handleEditSave}
      />

      <DeleteSubcategoryDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        subCategory={subCategory}
        onConfirm={handleDelete}
      />
    </>
  );
};
