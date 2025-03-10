
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useCashAccounts } from '../hooks/useCashAccounts';
import { CashAccountCard } from '../components/CashAccountCard';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Nakit Hesaplar ana görünümü
 */
export const CashAccountsView: React.FC = () => {
  const { t } = useTranslation(['CashAccounts']);
  const { data: accounts, isLoading, isError } = useCashAccounts();

  // Yükleme durumu için iskelet
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="border rounded-lg p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <div className="flex justify-between">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-8 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );

  // Hesap kartlarını render et
  const renderAccounts = () => {
    // Hesap yoksa boş durum göster
    if (!accounts || accounts.length === 0) {
      return (
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
      );
    }

    // Hesapları göster
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <CashAccountCard key={account.id} account={account} />
        ))}
      </div>
    );
  };

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
      
      {isLoading ? renderSkeleton() : renderAccounts()}
      
      {isError && (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {t('CashAccounts:errors.account.list.failed')}
        </div>
      )}
    </div>
  );
};
