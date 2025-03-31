
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileX } from 'lucide-react';

/**
 * İşlem bulunamadığında gösterilecek boş durum bileşeni
 */
export const EmptyTransactionsState: React.FC = () => {
  const { t } = useTranslation('StatementManagement');
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileX className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{t('transactions.empty')}</h3>
      <p className="text-sm text-muted-foreground mt-2">
        {t('common:emptyState.clickNew', { ns: 'common' })}
      </p>
    </div>
  );
};
