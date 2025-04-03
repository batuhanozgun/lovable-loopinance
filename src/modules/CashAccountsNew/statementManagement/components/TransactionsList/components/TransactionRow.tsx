
import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { AccountTransaction, StatementTransactionType } from '../../../types/transaction';
import { Badge } from '@/components/ui/badge';
import { CategoryBadge } from './CategoryBadge';
import { IconButton } from './IconButton';

interface TransactionRowProps {
  transaction: AccountTransaction;
  formatAmount: (amount: number) => string;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  formatAmount,
  onEdit,
  onDelete,
  disabled = false
}) => {
  const { i18n, t } = useTranslation(['StatementManagement', 'common']);
  const locale = i18n.language === 'tr' ? tr : enUS;
  
  // Tarih formatla
  const formattedDate = format(
    new Date(transaction.transaction_date),
    'PP',
    { locale }
  );
  
  // Saat formatla (HH:MM)
  const formattedTime = transaction.transaction_time.substring(0, 5);
  
  // İşlem tipi
  const isIncome = transaction.transaction_type === StatementTransactionType.INCOME;
  
  return (
    <Card className={`overflow-hidden ${isIncome ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}>
      <div className="flex justify-between items-center p-3">
        <div className="flex-1">
          <div className="flex items-center space-x-1.5">
            <h3 className="font-medium text-xs">
              {formattedDate} - {formattedTime}
            </h3>
            
            {transaction.category_id && (
              <CategoryBadge categoryId={transaction.category_id} subcategoryId={transaction.subcategory_id} />
            )}
          </div>
          
          {transaction.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {transaction.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`font-medium text-xs ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {formatAmount(Math.abs(transaction.amount))}
          </div>
          
          <div className="flex">
            <IconButton
              icon={<Pencil className="h-3 w-3" />}
              label={t('transactions.edit')}
              onClick={onEdit}
              disabled={disabled}
            />
            
            <IconButton
              icon={<Trash2 className="h-3 w-3" />}
              label={t('transactions.delete')}
              onClick={onDelete}
              variant="destructive"
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
