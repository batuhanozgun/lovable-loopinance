
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ListHeaderProps {
  onNewCategory: () => void;
  isFormVisible: boolean;
}

export const ListHeader: React.FC<ListHeaderProps> = ({ 
  onNewCategory, 
  isFormVisible 
}) => {
  const { t } = useTranslation(['Categories']);
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('Categories:title')}</h2>
        <p className="text-muted-foreground">{t('Categories:subtitle')}</p>
      </div>
      <Button onClick={onNewCategory} disabled={isFormVisible}>
        <Plus className="w-4 h-4 mr-2" />
        {t('Categories:actions.create')}
      </Button>
    </div>
  );
};
