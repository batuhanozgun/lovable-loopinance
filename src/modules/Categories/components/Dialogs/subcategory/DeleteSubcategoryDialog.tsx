
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ISubCategory } from '@/modules/Categories/types';

interface DeleteSubcategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  subCategory: ISubCategory;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeleteSubcategoryDialog: React.FC<DeleteSubcategoryDialogProps> = ({
  isOpen,
  setIsOpen,
  subCategory,
  onConfirm,
  isDeleting = false
}) => {
  const { t } = useTranslation(['Categories']);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Categories:delete.subCategoryTitle', 'Alt Kategoriyi Sil')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('Categories:delete.subCategoryDescription', 'Bu alt kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t('Categories:delete.cancel', 'İptal')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? t('Categories:delete.deleting', 'Siliniyor...') : t('Categories:delete.confirm', 'Sil')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
