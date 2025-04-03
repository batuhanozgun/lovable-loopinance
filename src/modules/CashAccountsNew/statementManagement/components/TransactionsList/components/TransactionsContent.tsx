
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/utils/formatters/currencyFormatter';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { AccountTransaction, StatementTransactionType } from '../../../types/transaction';
import { TransactionRow } from './TransactionRow';
import { EmptyTransactionsState } from './EmptyTransactionsState';

interface TransactionsContentProps {
  transactions: AccountTransaction[];
  currency: CurrencyType;
  isDeleting: boolean;
  onEditTransaction: (transaction: AccountTransaction) => void;
  onDeleteTransaction: (transaction: AccountTransaction) => void;
}

export const TransactionsContent: React.FC<TransactionsContentProps> = ({
  transactions,
  currency,
  isDeleting,
  onEditTransaction,
  onDeleteTransaction
}) => {
  const { t, i18n } = useTranslation(['StatementManagement', 'common']);
  const locale = i18n.language === 'tr' ? 'tr-TR' : 'en-US';

  // İşlemler boşsa
  if (!transactions || transactions.length === 0) {
    return <EmptyTransactionsState />;
  }

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            formatAmount={(amount) => formatCurrency(amount, locale, currency)}
            onEdit={() => onEditTransaction(transaction)}
            onDelete={() => onDeleteTransaction(transaction)}
            disabled={isDeleting}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
