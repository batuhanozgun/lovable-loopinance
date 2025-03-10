
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
import { ICategory } from '../../../types';

interface DeleteCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: ICategory;
  onConfirm: () => void;
}

export const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  isOpen,
  setIsOpen,
  category,
  onConfirm
}) => {
  const { t } = useTranslation(['Categories']);
  const hasSubCategories = category.sub_categories && category.sub_categories.length > 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Categories:delete.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('Categories:delete.description')}
            {hasSubCategories && (
              <p className="mt-2 text-red-500">
                {t('Categories:delete.warningSubcategories', { count: category.sub_categories?.length })}
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('Categories:delete.cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {t('Categories:delete.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
