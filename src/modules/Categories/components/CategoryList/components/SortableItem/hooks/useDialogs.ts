
import { useState, useEffect } from 'react';
import { ICategory, ISubCategory } from '@/modules/Categories/types';

// Genel tip tanımı, ICategory veya ISubCategory kabul edebilir
type CategoryLike = ICategory | ISubCategory;

export const useDialogs = (item: CategoryLike) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editIcon, setEditIcon] = useState('icon' in item ? item.icon || '' : '');
  
  // Kategori/alt kategori değiştiğinde veya düzenleme dialogu açıldığında, düzenleme verilerini sıfırla
  useEffect(() => {
    if (isEditDialogOpen) {
      setEditName(item.name);
      if ('icon' in item) {
        setEditIcon(item.icon || '');
      }
    }
  }, [item, isEditDialogOpen]);
  
  // Düzenleme dialogunun açılması için yardımcı fonksiyon
  const openEditDialog = () => {
    setEditName(item.name);
    if ('icon' in item) {
      setEditIcon(item.icon || '');
    }
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
