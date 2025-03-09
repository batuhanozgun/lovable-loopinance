
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { uiLogger } from '../../../../logging';

interface ListHeaderProps {
  onNewCategory: () => void;
  isFormVisible: boolean;
}

/**
 * Kategori listesinin üst kısmını oluşturan bileşen
 */
export const ListHeader: React.FC<ListHeaderProps> = ({ 
  onNewCategory, 
  isFormVisible 
}) => {
  const { t } = useTranslation(['Categories']);
  const logger = uiLogger.createSubLogger('ListHeader');
  
  const handleAddClick = () => {
    logger.debug('Yeni kategori butonu tıklandı');
    onNewCategory();
  };
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('Categories:title')}</h2>
        <p className="text-muted-foreground">
          {t('Categories:description')}
        </p>
      </div>
      
      {!isFormVisible && (
        <Button onClick={handleAddClick} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t('Categories:actions.addNew')}
        </Button>
      )}
    </div>
  );
};

export default ListHeader;
