
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EditSubcategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  name: string;
  setName: (name: string) => void;
  onSave: () => void;
  isLoading?: boolean;
}

export const EditSubcategoryDialog: React.FC<EditSubcategoryDialogProps> = ({
  isOpen,
  setIsOpen,
  name,
  setName,
  onSave,
  isLoading = false
}) => {
  const { t } = useTranslation(['Categories']);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Categories:form.editSubCategory', 'Alt Kategoriyi Düzenle')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t('Categories:form.subCategoryName', 'Alt Kategori Adı')}
            </label>
            <input
              id="name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            {t('Categories:form.cancel', 'İptal')}
          </Button>
          <Button onClick={onSave} disabled={isLoading || !name.trim()}>
            {isLoading ? t('Categories:form.saving', 'Kaydediliyor...') : t('Categories:form.submit', 'Kaydet')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
