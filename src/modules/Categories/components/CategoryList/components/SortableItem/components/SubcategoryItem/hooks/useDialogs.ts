
import { useState } from 'react';
import { ISubCategory } from '@/modules/Categories/types';

export const useDialogs = (subCategory: ISubCategory) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(subCategory.name);
  
  return {
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    editName,
    setEditName
  };
};
