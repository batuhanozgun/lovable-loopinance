
import React, { useState } from 'react';
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
}

export const EditSubcategoryDialog: React.FC<EditSubcategoryDialogProps> = ({
  isOpen,
  setIsOpen,
  name,
  setName,
  onSave
}) => {
  const { t } = useTranslation(['Categories']);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    
    try {
      setIsLoading(true);
      await onSave();
    } catch (error) {
      console.error('Alt kategori düzenleme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button onClick={handleSave} disabled={isLoading || !name.trim()}>
            {isLoading ? t('Categories:form.saving', 'Kaydediliyor...') : t('Categories:form.submit', 'Kaydet')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
