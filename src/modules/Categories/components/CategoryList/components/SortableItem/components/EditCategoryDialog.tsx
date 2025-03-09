
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

interface EditCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  name: string;
  setName: (name: string) => void;
  icon: string;
  setIcon: (icon: string) => void;
  onSave: () => void;
}

export const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  isOpen,
  setIsOpen,
  name,
  setName,
  icon,
  setIcon,
  onSave
}) => {
  const { t } = useTranslation(['Categories']);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Categories:form.editCategory')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t('Categories:form.categoryName')}
            </label>
            <input
              id="name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="icon" className="text-sm font-medium">
              {t('Categories:form.icon')}
            </label>
            <input
              id="icon"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="📝"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('Categories:form.cancel')}
          </Button>
          <Button onClick={onSave}>
            {t('Categories:form.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
