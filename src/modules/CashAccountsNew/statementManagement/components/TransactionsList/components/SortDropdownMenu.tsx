
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
  const { t } = useTranslation(['StatementManagement', 'common']);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 text-xs">
          <ArrowUpDown className="h-3 w-3 mr-1.5" />
          {t('sort', { ns: 'common' })}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background">
        <DropdownMenuItem onClick={() => onSortByDate('desc')} className="text-xs">
          {t('transactions.filters.sortByDateDesc')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSortByDate('asc')} className="text-xs">
          {t('transactions.filters.sortByDateAsc')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSortByAmount('desc')} className="text-xs">
          {t('transactions.filters.sortByAmountDesc')}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onSortByAmount('asc')} className="text-xs">
          {t('transactions.filters.sortByAmountAsc')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
