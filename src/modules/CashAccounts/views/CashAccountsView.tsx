
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

/**
 * Nakit Hesaplar ana görünümü
 */
export const CashAccountsView: React.FC = () => {
  const { t } = useTranslation(['CashAccounts']);

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {t('CashAccounts:title')}
        </h1>
        <Button asChild>
          <Link to="/cash-accounts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('CashAccounts:newAccount')}
          </Link>
        </Button>
      </div>
      
      <div className="rounded-lg border border-dashed p-12 text-center">
        <h3 className="text-lg font-medium mb-2">
          {t('CashAccounts:noAccounts')}
        </h3>
        <p className="text-muted-foreground mb-4">
          {t('CashAccounts:description')}
        </p>
        <Button asChild>
          <Link to="/cash-accounts/new">
            {t('CashAccounts:createAccount')}
          </Link>
        </Button>
      </div>
    </div>
  );
};
