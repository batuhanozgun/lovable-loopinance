
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SortDropdownMenuProps {
  onSortByDate: (direction: 'asc' | 'desc') => void;
  onSortByAmount: (direction: 'asc' | 'desc') => void;
}

export const SortDropdownMenu: React.FC<SortDropdownMenuProps> = ({
  onSortByDate,
  onSortByAmount
}) => {
  const { t } = useTranslation('StatementManagement');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {t('common:sort', { ns: 'common' })}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background">
        <DropdownMenuItem onClick={() => onSortByDate('desc')}>
          {t('transactions.filters.sortByDateDesc')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSortByDate('asc')}>
          {t('transactions.filters.sortByDateAsc')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSortByAmount('desc')}>
          {t('transactions.filters.sortByAmountDesc')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSortByAmount('asc')}>
          {t('transactions.filters.sortByAmountAsc')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
