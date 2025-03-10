
import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { ISubCategory } from '@/modules/Categories/types';
import { 
  EditSubcategoryDialog, 
  DeleteSubcategoryDialog 
} from '@/modules/Categories/components/Dialogs';
import { useSubcategoryDialogs } from '@/modules/Categories/hooks/dialogs/useSubcategoryDialogs';
import { useTranslation } from 'react-i18next';

interface SubcategoryItemProps {
  subCategory: ISubCategory;
  onEdit: (updatedSubCategory: ISubCategory) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const SubcategoryItem: React.FC<SubcategoryItemProps> = ({
  subCategory,
  onEdit,
  onDelete
}) => {
  const { t } = useTranslation(['Categories']);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const {
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    editName,
    setEditName
  } = useSubcategoryDialogs(subCategory);

  const handleEditSave = async () => {
    if (editName.trim()) {
      try {
        setIsEditing(true);
        
        await onEdit({
          ...subCategory,
          name: editName.trim()
        });
        
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error('Alt kategori düzenleme hatası:', error);
      } finally {
        setIsEditing(false);
      }
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(subCategory.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Alt kategori silme hatası:', error);
    } finally {
      setIsDeleting(false);
    }
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
            title={t('Categories:actions.edit', 'Düzenle')}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title={t('Categories:actions.delete', 'Sil')}
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
        isLoading={isEditing}
      />

      <DeleteSubcategoryDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        subCategory={subCategory}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};
