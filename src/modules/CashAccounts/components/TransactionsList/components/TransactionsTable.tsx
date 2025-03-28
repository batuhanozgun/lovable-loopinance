
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { AccountTransaction, CurrencyType } from '../../../types';
import { TransactionRow } from './TransactionRow';
import { TransactionsTableHeader } from './TransactionsTableHeader';

interface TransactionsTableProps {
  transactions: AccountTransaction[];
  currency: CurrencyType;
  onEdit: (transaction: AccountTransaction) => void;
  onDelete: (transaction: AccountTransaction) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions, 
  currency, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Table>
      <TransactionsTableHeader />
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionRow 
            key={transaction.id}
            transaction={transaction} 
            currency={currency}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};
