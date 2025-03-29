
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

/**
 * Hesap yokken gösterilecek boş durum bileşeni
 */
export const EmptyAccountsState: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew']);
  
  return (
    <div className="rounded-lg border border-dashed p-12 text-center">
      <h3 className="text-lg font-medium mb-2">
        {t('noAccounts')}
      </h3>
      <p className="text-muted-foreground mb-4">
        {t('createAccountDescription')}
      </p>
      <Button asChild>
        <Link to="/cash-accounts-new/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('newAccount')}
        </Link>
      </Button>
    </div>
  );
};
