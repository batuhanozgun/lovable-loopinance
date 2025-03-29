
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Nakit hesap bulunamadığında görüntülenecek boş durum bileşeni
 */
export const EmptyAccountsState: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew']);
  
  return (
    <div className="rounded-lg border border-dashed p-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
        <Wallet className="h-8 w-8 text-primary" />
      </div>
      
      <h3 className="text-lg font-medium mb-2">
        {t('noAccounts')}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {t('description')}
      </p>
      
      <Button asChild>
        <Link to="/cash-accounts/new">
          {t('createAccount')}
        </Link>
      </Button>
    </div>
  );
};
