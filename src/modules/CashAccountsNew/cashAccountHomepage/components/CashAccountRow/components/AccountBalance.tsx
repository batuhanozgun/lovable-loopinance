
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CashAccount, CurrencyType } from '../../../types';
import { formatCurrency } from '../../../utils/currencyUtils';

interface AccountBalanceProps {
  account: CashAccount;
}

/**
 * Nakit hesap bakiyesini gösteren bileşen
 */
export const AccountBalance: React.FC<AccountBalanceProps> = ({ account }) => {
  const { t } = useTranslation(['CashAccountHomepage']);
  const { current_balance, initial_balance, currency } = account;
  
  // Güncel bakiye değerini göster (eğer yoksa initial_balance'ı kullan)
  const displayBalance = current_balance !== undefined ? current_balance : initial_balance;

  return (
    <div className="text-right mr-1">
      <div className="text-sm font-medium">
        {formatCurrency(displayBalance, currency as CurrencyType)}
      </div>
      <div className="text-xs text-muted-foreground">
        {t('accountBalance')}
      </div>
    </div>
  );
};
