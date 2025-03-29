
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCashAccounts } from '../hooks/useCashAccounts';
import { CashAccountCard } from '../components/CashAccountCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { EmptyAccountsState } from '../components/EmptyAccountsState';
import { uiLogger } from '../../logging';

/**
 * Nakit Hesaplar ana görünümü
 */
export const CashAccountsView: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew']);
  const { data: accounts, isLoading, isError, refresh } = useCashAccounts();
  
  // Sayfa yüklendiğinde log oluştur
  React.useEffect(() => {
    uiLogger.info('CashAccountsView rendered');
    return () => {
      uiLogger.info('CashAccountsView unmounted');
    };
  }, []);
  
  // Hesap kartlarını render et
  const renderAccounts = () => {
    // Hesap yoksa boş durum göster
    if (!accounts || accounts.length === 0) {
      return <EmptyAccountsState />;
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
          {t('title')}
        </h1>
        <Button asChild>
          <Link to="/cash-accounts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('newAccount')}
          </Link>
        </Button>
      </div>
      
      {isLoading ? <LoadingSkeleton /> : renderAccounts()}
      
      {isError && (
        <div className="p-4 border border-destructive text-destructive rounded-md mt-4">
          <p className="font-medium mb-2">{t('errors.account.list.failed')}</p>
          <Button variant="outline" size="sm" onClick={() => refresh()}>
            {t('buttons.tryAgain', { ns: 'common' })}
          </Button>
        </div>
      )}
    </div>
  );
};
