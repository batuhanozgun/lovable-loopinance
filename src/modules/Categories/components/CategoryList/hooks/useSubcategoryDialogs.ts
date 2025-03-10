
import { useState } from 'react';
import { ISubCategory } from '@/modules/Categories/types';

interface UseSubcategoryDialogsProps {
  subCategory: ISubCategory;
}

/**
 * Alt kategori diyaloglarını yöneten hook
 */
export const useSubcategoryDialogs = ({ subCategory }: UseSubcategoryDialogsProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(subCategory.name);

  // Modal açıldığında mevcut değerleri yükle
  const resetDialogState = () => {
    setEditName(subCategory.name);
  };

  // Dialog açıldığında formu sıfırla
  const handleEditDialogOpen = (open: boolean) => {
    if (open) {
      resetDialogState();
    }
    setIsEditDialogOpen(open);
  };

  return {
    isEditDialogOpen,
    setIsEditDialogOpen: handleEditDialogOpen,
    isDeleteDialogOpen, 
    setIsDeleteDialogOpen,
    editName,
    setEditName
  };
};
