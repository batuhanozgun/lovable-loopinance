
import React from 'react';
import { useTranslation } from 'react-i18next';

export const EmptyTransactionsState: React.FC = () => {
  const { t } = useTranslation(['CashAccounts']);
  
  return (
    <div className="text-center py-8 text-muted-foreground">
      {t('noTransactions')}
    </div>
  );
};
