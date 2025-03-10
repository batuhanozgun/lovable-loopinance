
import { useState, useEffect } from 'react';
import { ISubCategory } from '../../types';

export const useSubcategoryDialogs = (subCategory: ISubCategory) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(subCategory.name);
  
  // Alt kategori değiştiğinde veya düzenleme dialogu açıldığında, düzenleme adını sıfırla
  useEffect(() => {
    if (isEditDialogOpen) {
      setEditName(subCategory.name);
    }
  }, [subCategory.name, isEditDialogOpen]);
  
  // Düzenleme dialogunun açılması için yardımcı fonksiyon
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
