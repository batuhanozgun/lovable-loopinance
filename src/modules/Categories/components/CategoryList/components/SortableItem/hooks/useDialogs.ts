
import { useState } from 'react';
import { ICategory } from '../../../../../types';

export const useDialogs = (category: ICategory) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [editIcon, setEditIcon] = useState(category.icon || '');
  
  return {
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    editName,
    setEditName,
    editIcon,
    setEditIcon
  };
};
