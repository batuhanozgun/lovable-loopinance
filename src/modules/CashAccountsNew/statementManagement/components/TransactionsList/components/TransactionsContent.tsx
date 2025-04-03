
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardContent } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';
import { Loader2 } from 'lucide-react';
import { 
  EmptyTransactionsState, 
  TransactionsTableHeader,
  TransactionRow
} from './';
import { AccountTransaction } from '../../../types/transaction';

interface TransactionsContentProps {
  isDeleting: boolean;
  transactions: AccountTransaction[];
  currency: CurrencyType;
  onEditTransaction: (transaction: AccountTransaction) => void;
  onDeleteTransaction: (transaction: AccountTransaction) => void;
}

export const TransactionsContent: React.FC<TransactionsContentProps> = ({ 
  isDeleting, 
  transactions,
  currency,
  onEditTransaction,
  onDeleteTransaction
}) => {
  const { t } = useTranslation('StatementManagement');

  if (isDeleting) {
    return (
      <CardContent>
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> 
          <span>{t('transactions.deleting')}</span>
        </div>
      </CardContent>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <CardContent>
        <EmptyTransactionsState />
      </CardContent>
    );
  }

  return (
    <CardContent>
      <Table>
        <TransactionsTableHeader />
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow 
              key={transaction.id}
              transaction={transaction} 
              currency={currency}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
};
