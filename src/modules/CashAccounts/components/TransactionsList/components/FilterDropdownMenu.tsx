
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  ChevronDown, 
  Filter 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterDropdownMenuProps {
  onFilterByType: (type: 'income' | 'expense' | 'all') => void;
  onResetFilters: () => void;
}

export const FilterDropdownMenu: React.FC<FilterDropdownMenuProps> = ({ 
  onFilterByType, 
  onResetFilters 
}) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">{t('filter', { ns: 'common' })}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onFilterByType('all')}>
          {t('filters.showAll')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onFilterByType('income')}>
          <ArrowUpCircle className="mr-2 h-4 w-4 text-green-500" />
          {t('filters.showIncome')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterByType('expense')}>
          <ArrowDownCircle className="mr-2 h-4 w-4 text-red-500" />
          {t('filters.showExpenses')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onResetFilters}>
          {t('resetFilters', { ns: 'common' })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
