
import { useState, useEffect } from 'react';
import { ICategory } from '../../types';

export const useCategoryDialogs = (category: ICategory) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [editIcon, setEditIcon] = useState(category.icon || '');
  
  // Kategori değiştiğinde veya düzenleme dialogu açıldığında, düzenleme verilerini sıfırla
  useEffect(() => {
    if (isEditDialogOpen) {
      setEditName(category.name);
      setEditIcon(category.icon || '');
    }
  }, [category, isEditDialogOpen]);
  
  // Düzenleme dialogunun açılması için yardımcı fonksiyon
  const openEditDialog = () => {
    setEditName(category.name);
    setEditIcon(category.icon || '');
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
    setEditName,
    editIcon,
    setEditIcon
  };
};
