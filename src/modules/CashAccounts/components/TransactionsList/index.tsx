
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  CalendarIcon, 
  ChevronDown, 
  Edit, 
  Filter, 
  MoreHorizontal, 
  SortAsc, 
  SortDesc, 
  Trash2 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '../../utils/currencyUtils';
import { TransactionType, AccountTransaction, CurrencyType } from '../../types';
import { TransactionForm } from '../TransactionForm';
import { DeleteTransactionDialog } from '../TransactionForm/components/DeleteTransactionDialog';

interface TransactionsListProps {
  transactions: AccountTransaction[];
  isLoading: boolean;
  currency: CurrencyType;
  onSortByDate: (order: 'asc' | 'desc') => void;
  onSortByAmount: (order: 'asc' | 'desc') => void;
  onFilterByType: (type: 'income' | 'expense' | 'all') => void;
  onResetFilters: () => void;
  activeFilters: any;
  statementId: string;
  accountId: string;
  isStatementOpen?: boolean;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  isLoading,
  currency,
  onSortByDate,
  onSortByAmount,
  onFilterByType,
  onResetFilters,
  activeFilters,
  statementId,
  accountId,
  isStatementOpen = false
}) => {
  const { t } = useTranslation(['CashAccounts', 'common']);

  // İşlem düzenleme state'i
  const [editingTransaction, setEditingTransaction] = useState<AccountTransaction | null>(null);
  
  // İşlem silme state'i
  const [deletingTransaction, setDeletingTransaction] = useState<AccountTransaction | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  const handleEditTransaction = (transaction: AccountTransaction) => {
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = (transaction: AccountTransaction) => {
    setDeletingTransaction(transaction);
  };

  const isFilterActive = activeFilters.transactionType !== 'all';

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <span>{t('CashAccounts:transactions')}</span>
              {isFilterActive && (
                <Badge variant="outline" className="ml-2">
                  {activeFilters.transactionType === 'income' 
                    ? t('CashAccounts:filters.showingIncomeOnly') 
                    : t('CashAccounts:filters.showingExpenseOnly')}
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <SortAsc className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('common:sort')}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onSortByDate('desc')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SortDesc className="mr-2 h-4 w-4" />
                    {t('CashAccounts:filters.sortByDateDesc')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSortByDate('asc')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <SortAsc className="mr-2 h-4 w-4" />
                    {t('CashAccounts:filters.sortByDateAsc')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onSortByAmount('desc')}>
                    <SortDesc className="mr-2 h-4 w-4" />
                    {t('CashAccounts:filters.sortByAmountDesc')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSortByAmount('asc')}>
                    <SortAsc className="mr-2 h-4 w-4" />
                    {t('CashAccounts:filters.sortByAmountAsc')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('common:filter')}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onFilterByType('all')}>
                    {t('CashAccounts:filters.showAll')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onFilterByType('income')}>
                    <ArrowUpCircle className="mr-2 h-4 w-4 text-green-500" />
                    {t('CashAccounts:filters.showIncome')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onFilterByType('expense')}>
                    <ArrowDownCircle className="mr-2 h-4 w-4 text-red-500" />
                    {t('CashAccounts:filters.showExpenses')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onResetFilters}>
                    {t('common:resetFilters')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('CashAccounts:noTransactions')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('CashAccounts:transaction.date')}</TableHead>
                  <TableHead>{t('CashAccounts:transaction.type')}</TableHead>
                  <TableHead>{t('CashAccounts:transaction.description')}</TableHead>
                  <TableHead className="text-right">{t('CashAccounts:transaction.amount')}</TableHead>
                  <TableHead className="text-right">{t('common:actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {format(new Date(transaction.transaction_date), 'dd/MM/yyyy')}
                      <div className="text-xs text-muted-foreground">
                        {transaction.transaction_time?.substring(0, 5)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.transaction_type === TransactionType.INCOME ? (
                        <div className="flex items-center text-green-500">
                          <ArrowUpCircle className="mr-1 h-4 w-4" />
                          {t('CashAccounts:transaction.types.income')}
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <ArrowDownCircle className="mr-1 h-4 w-4" />
                          {t('CashAccounts:transaction.types.expense')}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {transaction.description || '-'}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={transaction.transaction_type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'}>
                        {transaction.transaction_type === TransactionType.EXPENSE ? '- ' : '+ '}
                        {formatCurrency(transaction.amount, currency)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">{t('common:openMenu')}</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditTransaction(transaction)}
                            disabled={!isStatementOpen}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {t('common:edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteTransaction(transaction)}
                            className="text-destructive focus:text-destructive"
                            disabled={!isStatementOpen}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('common:delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* İşlem düzenleme formu */}
      {editingTransaction && (
        <TransactionForm
          statementId={statementId}
          accountId={accountId}
          currency={currency}
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          transaction={editingTransaction}
        />
      )}
      
      {/* İşlem silme dialogu */}
      {deletingTransaction && (
        <DeleteTransactionDialog
          isOpen={!!deletingTransaction}
          onClose={() => setDeletingTransaction(null)}
          transactionId={deletingTransaction.id}
          statementId={statementId}
        />
      )}
    </>
  );
};
