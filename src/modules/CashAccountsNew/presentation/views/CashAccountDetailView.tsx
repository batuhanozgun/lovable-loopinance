
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCashAccount } from '../hooks/useCashAccount';
import { formatCurrency } from '../../shared/utils/currencyUtils';
import { CurrencyType } from '../../shared/types';

/**
 * Nakit hesap detay görünümü
 */
export const CashAccountDetailView: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  
  const {
    data: account,
    isLoading,
    isError,
    error,
    refresh
  } = useCashAccount(accountId);
  
  const handleBack = () => {
    navigate('/cash-accounts');
  };
  
  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Button>
        </div>
        <div className="p-6 rounded-lg border border-border">
          <p>{t('common:loading')}</p>
        </div>
      </div>
    );
  }
  
  if (isError || !account) {
    return (
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Button>
        </div>
        <div className="p-6 rounded-lg border border-destructive bg-destructive/10">
          <h2 className="text-xl font-bold mb-4 text-destructive">{t('common:error')}</h2>
          <p className="mb-4">{error instanceof Error ? error.message : t('errors.account.fetch.failed')}</p>
          <Button variant="outline" onClick={() => refresh()}>
            {t('common:buttons.tryAgain')}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common:back')}
        </Button>
        <h1 className="text-2xl font-bold">{account.name}</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">{t('accountDetails.balanceHeading')}</h2>
            <p className="text-3xl font-bold">
              {formatCurrency(account.initial_balance, account.currency as CurrencyType)}
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">{t('accountDetails.infoHeading')}</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">{t('accountDetails.currency')}:</span>{' '}
                {account.currency}
              </p>
              {account.description && (
                <p>
                  <span className="font-medium">{t('accountDetails.description')}:</span>{' '}
                  {account.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
