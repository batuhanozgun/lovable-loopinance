
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
import { StatementTransactionType } from '../../../types/transaction';

interface FilterDropdownMenuProps {
  onFilterByType: (type: StatementTransactionType | 'all') => void;
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
        <Button variant="outline" size="sm" className="h-7 text-xs">
          <Filter className="h-3 w-3 mr-1.5" />
          {t('common:filter', { ns: 'common' })}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background">
        <DropdownMenuItem onClick={() => onFilterByType('all')} className="text-xs">
          {t('transactions.filters.showAll')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onFilterByType(StatementTransactionType.INCOME)} className="text-xs">
          {t('transactions.filters.showIncome')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onFilterByType(StatementTransactionType.EXPENSE)} className="text-xs">
          {t('transactions.filters.showExpenses')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={onResetFilters} className="text-xs">
          {t('common:resetFilters', { ns: 'common' })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
