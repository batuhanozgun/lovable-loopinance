
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
  const { t } = useTranslation();
  const { initial_balance, currency } = account;

  return (
    <div className="text-right">
      <div className="font-medium">
        {formatCurrency(initial_balance, currency as CurrencyType)}
      </div>
      <div className="text-xs text-muted-foreground">
        {t('CashAccountsNew:accountBalance')}
      </div>
    </div>
  );
};
