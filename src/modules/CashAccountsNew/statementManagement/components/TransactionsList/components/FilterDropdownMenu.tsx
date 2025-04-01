
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TransactionType } from '@/modules/CashAccountsNew/transactionManagement/types';

interface FilterDropdownMenuProps {
  onFilterByType: (type: TransactionType | 'all') => void;
  onResetFilters: () => void;
}

export const FilterDropdownMenu: React.FC<FilterDropdownMenuProps> = ({
  onFilterByType,
  onResetFilters
}) => {
  const { t } = useTranslation('StatementManagement');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          {t('common:filter', { ns: 'common' })}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background">
        <DropdownMenuItem onClick={() => onFilterByType('all')}>
          {t('transactions.filters.showAll')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onFilterByType(TransactionType.INCOME)}>
          {t('transactions.filters.showIncome')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onFilterByType(TransactionType.EXPENSE)}>
          {t('transactions.filters.showExpenses')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={onResetFilters}>
          {t('common:resetFilters', { ns: 'common' })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
