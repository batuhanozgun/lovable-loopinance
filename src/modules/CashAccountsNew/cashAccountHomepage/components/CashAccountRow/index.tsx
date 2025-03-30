
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  FileText, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical 
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CashAccount, CurrencyType } from '../../types';
import { formatCurrency } from '../../utils/currencyUtils';

interface CashAccountRowProps {
  account: CashAccount;
  onEdit?: (account: CashAccount) => void;
  onDelete?: (account: CashAccount) => void;
}

/**
 * Nakit hesap bilgilerini satır olarak gösteren bileşen
 */
export const CashAccountRow: React.FC<CashAccountRowProps> = ({ 
  account, 
  onEdit, 
  onDelete 
}) => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const isMobile = useIsMobile();
  
  const { id, name, description, initial_balance, currency } = account;

  // Mobil cihazlar için dropdown menu, masaüstü için ayrı butonlar
  const renderActions = () => {
    if (isMobile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">{t('CashAccountsNew:actions')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/nakit-hesaplar/${id}/statements`}>
                <FileText className="mr-2 h-4 w-4" />
                {t('CashAccountsNew:statements')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/nakit-hesaplar/${id}`}>
                <Eye className="mr-2 h-4 w-4" />
                {t('CashAccountsNew:viewDetails')}
              </Link>
            </DropdownMenuItem>
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(account)}>
                <Edit className="mr-2 h-4 w-4" />
                {t('CashAccountsNew:edit')}
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={() => onDelete(account)}>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('CashAccountsNew:delete')}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                asChild
              >
                <Link to={`/nakit-hesaplar/${id}/statements`}>
                  <FileText className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('CashAccountsNew:statements')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                asChild
              >
                <Link to={`/nakit-hesaplar/${id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('CashAccountsNew:viewDetails')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {onEdit && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(account)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('CashAccountsNew:edit')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {onDelete && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onDelete(account)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('CashAccountsNew:delete')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b hover:bg-muted/20 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center gap-1">
          <h3 className="text-base font-medium truncate">{name}</h3>
          {description && !isMobile && (
            <p className="text-sm text-muted-foreground hidden md:block md:ml-2">
              {description}
            </p>
          )}
        </div>
        {description && isMobile && (
          <p className="text-xs text-muted-foreground truncate">
            {description}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-medium">
            {formatCurrency(initial_balance, currency as CurrencyType)}
          </div>
          <div className="text-xs text-muted-foreground">
            {t('CashAccountsNew:accountBalance')}
          </div>
        </div>
        
        {renderActions()}
      </div>
    </div>
  );
};
