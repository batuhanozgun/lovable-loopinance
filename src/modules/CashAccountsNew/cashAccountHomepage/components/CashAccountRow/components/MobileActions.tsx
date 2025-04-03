
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Eye, Edit, Trash2, MoreVertical, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CashAccount } from '../../../types';

interface MobileActionsProps {
  account: CashAccount;
  onEdit?: (account: CashAccount) => void;
  onDelete?: (account: CashAccount) => void;
  onAddTransaction?: (account: CashAccount) => void;
}

/**
 * Mobil görünümde hesap aksiyonlarını gösteren bileşen
 */
export const MobileActions: React.FC<MobileActionsProps> = ({ 
  account, 
  onEdit, 
  onDelete,
  onAddTransaction
}) => {
  const { t } = useTranslation(['CashAccountHomepage', 'common']);
  const { id } = account;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreVertical className="h-3.5 w-3.5" />
          <span className="sr-only">{t('actions')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-xs">
        {onAddTransaction && (
          <DropdownMenuItem onClick={() => onAddTransaction(account)}>
            <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
            {t('CashAccountHomepage:transaction.add')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to={`/nakit-hesaplar/${id}/statements`}>
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            {t('statements')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/nakit-hesaplar/${id}`}>
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            {t('viewDetails')}
          </Link>
        </DropdownMenuItem>
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(account)}>
            <Edit className="mr-1.5 h-3.5 w-3.5" />
            {t('edit')}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={() => onDelete(account)}>
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            {t('delete')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
