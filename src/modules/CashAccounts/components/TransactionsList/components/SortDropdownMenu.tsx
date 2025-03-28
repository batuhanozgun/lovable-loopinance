
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CalendarIcon, 
  ChevronDown, 
  SortAsc, 
  SortDesc 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SortDropdownMenuProps {
  onSortByDate: (order: 'asc' | 'desc') => void;
  onSortByAmount: (order: 'asc' | 'desc') => void;
}

export const SortDropdownMenu: React.FC<SortDropdownMenuProps> = ({ 
  onSortByDate, 
  onSortByAmount 
}) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  return (
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
  );
};
