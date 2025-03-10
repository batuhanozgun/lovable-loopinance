
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { TransactionFilterOptions } from '../../../hooks/transactions/types';

interface TransactionFiltersProps {
  activeFilters?: TransactionFilterOptions;
  onSortByDate?: (order: 'asc' | 'desc') => void;
  onSortByAmount?: (order: 'asc' | 'desc') => void;
  onFilterByType?: (type: 'income' | 'expense' | 'all') => void;
  onResetFilters?: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  activeFilters,
  onSortByDate,
  onSortByAmount,
  onFilterByType,
  onResetFilters,
}) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  const hasFilters = Boolean(activeFilters && (
    activeFilters.sortBy !== 'date' || 
    activeFilters.sortOrder !== 'desc' || 
    activeFilters.transactionType !== 'all'
  ));

  return (
    <>
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
      
      {activeFilters && activeFilters.transactionType !== 'all' && (
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">
            {t(`CashAccounts:filters.showing${activeFilters.transactionType.charAt(0).toUpperCase() + activeFilters.transactionType.slice(1)}Only`)}
          </Badge>
        </div>
      )}
    </>
  );
};
