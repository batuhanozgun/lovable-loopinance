
import { useState } from 'react';
import { ISubCategory } from '@/modules/Categories/types';

export const useDialogs = (subCategory: ISubCategory) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(subCategory.name);
  
  // Reset the edit name when the subcategory changes or when dialog opens
  const openEditDialog = () => {
    setEditName(subCategory.name);
    setIsEditDialogOpen(true);
  };
  
  return {
    isEditDialogOpen,
    setIsEditDialogOpen: (isOpen: boolean) => {
      if (isOpen) {
        openEditDialog();
      } else {
        setIsEditDialogOpen(false);
      }
    },
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    editName,
    setEditName
  };
};
