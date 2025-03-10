
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export const EmptyState: React.FC = () => {
  const { t } = useTranslation(['CashAccounts']);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-center text-muted-foreground">{t('CashAccounts:noTransactions')}</p>
      </CardContent>
    </Card>
  );
};
