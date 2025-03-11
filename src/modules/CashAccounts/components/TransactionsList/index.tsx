
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountTransaction, CurrencyType, TransactionType } from '@/modules/CashAccounts/types';
import { formatCurrency } from '@/modules/CashAccounts/utils/currencyUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  Filter,
  ArrowDown,
  ArrowUp,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface TransactionsListProps {
  transactions: AccountTransaction[];
  isLoading: boolean;
  currency: CurrencyType;
  onSortByDate?: (order: 'asc' | 'desc') => void;
  onSortByAmount?: (order: 'asc' | 'desc') => void;
  onFilterByType?: (type: 'income' | 'expense' | 'all') => void;
  onResetFilters?: () => void;
  activeFilters?: {
    sortBy?: 'date' | 'amount';
    sortOrder?: 'asc' | 'desc';
    transactionType?: 'income' | 'expense' | 'all';
  };
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions, 
  isLoading, 
  currency,
  onSortByDate,
  onSortByAmount,
  onFilterByType,
  onResetFilters,
  activeFilters
}) => {
  const { t, i18n } = useTranslation(['CashAccounts']);
  const dateLocale = i18n.language === 'tr' ? tr : enUS;
  const [showFilters, setShowFilters] = useState(false);
  
  const hasFilters = Boolean(activeFilters && (
    activeFilters.sortBy !== 'date' || 
    activeFilters.sortOrder !== 'desc' || 
    activeFilters.transactionType !== 'all'
  ));

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{t('CashAccounts:noTransactions')}</p>
        </CardContent>
      </Card>
    );
  }

  const renderSortOrder = (field: 'date' | 'amount') => {
    if (!activeFilters || activeFilters.sortBy !== field) return null;
    
    return activeFilters.sortOrder === 'asc' ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('CashAccounts:transactions')}</CardTitle>
            <CardDescription>{t('CashAccounts:transaction.date')}</CardDescription>
          </div>
          
          {(onSortByDate || onSortByAmount || onFilterByType) && (
            <div className="flex items-center gap-2">
              {hasFilters && onResetFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onResetFilters}
                  title={t('common:reset')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {t('common:filter')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onSortByDate && (
                    <>
                      <DropdownMenuItem onClick={() => onSortByDate('desc')}>
                        {t('CashAccounts:filters.sortByDateDesc')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSortByDate('asc')}>
                        {t('CashAccounts:filters.sortByDateAsc')}
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {onSortByAmount && (
                    <>
                      <DropdownMenuItem onClick={() => onSortByAmount('desc')}>
                        {t('CashAccounts:filters.sortByAmountDesc')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSortByAmount('asc')}>
                        {t('CashAccounts:filters.sortByAmountAsc')}
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {onFilterByType && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onFilterByType('all')}>
                        {t('CashAccounts:filters.showAll')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onFilterByType('income')}>
                        {t('CashAccounts:filters.showIncome')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onFilterByType('expense')}>
                        {t('CashAccounts:filters.showExpenses')}
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        {activeFilters && activeFilters.transactionType !== 'all' && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">
              {t(`CashAccounts:filters.showing${activeFilters.transactionType.charAt(0).toUpperCase() + activeFilters.transactionType.slice(1)}Only`)}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className={onSortByDate ? "cursor-pointer" : ""}
                onClick={onSortByDate ? () => onSortByDate(
                  activeFilters?.sortBy === 'date' && activeFilters?.sortOrder === 'desc' ? 'asc' : 'desc'
                ) : undefined}
              >
                <div className="flex items-center">
                  {t('CashAccounts:transaction.date')}
                  {onSortByDate && (
                    activeFilters?.sortBy === 'date' ? renderSortOrder('date') : <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>{t('CashAccounts:transaction.description')}</TableHead>
              <TableHead>{t('CashAccounts:transaction.type')}</TableHead>
              <TableHead 
                className={`text-right ${onSortByAmount ? "cursor-pointer" : ""}`}
                onClick={onSortByAmount ? () => onSortByAmount(
                  activeFilters?.sortBy === 'amount' && activeFilters?.sortOrder === 'desc' ? 'asc' : 'desc'
                ) : undefined}
              >
                <div className="flex items-center justify-end">
                  {t('CashAccounts:transaction.amount')}
                  {onSortByAmount && (
                    activeFilters?.sortBy === 'amount' ? renderSortOrder('amount') : <ArrowUpDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(new Date(transaction.transaction_date), 'PP', { locale: dateLocale })}
                </TableCell>
                <TableCell>{transaction.description || '-'}</TableCell>
                <TableCell>
                  <span 
                    className={transaction.transaction_type === TransactionType.INCOME 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {t(`CashAccounts:transaction.types.${transaction.transaction_type}`)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span 
                    className={transaction.transaction_type === TransactionType.INCOME 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {formatCurrency(transaction.amount, currency)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
