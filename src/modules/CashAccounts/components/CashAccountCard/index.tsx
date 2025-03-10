
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, FileText } from 'lucide-react';
import { CashAccount, CurrencyType } from '../../types';
import { formatCurrency } from '../../utils/currencyUtils';

interface CashAccountCardProps {
  account: CashAccount;
}

/**
 * Nakit hesap bilgilerini gösteren kart bileşeni
 */
export const CashAccountCard: React.FC<CashAccountCardProps> = ({ account }) => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  
  const { id, name, description, initial_balance, currency } = account;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="text-sm text-muted-foreground">{t('CashAccounts:accountBalance')}</div>
          <div className="text-2xl font-semibold">
            {formatCurrency(initial_balance, currency as CurrencyType)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 border-t bg-muted/30">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/cash-accounts/${id}/statements`}>
            <FileText className="mr-2 h-4 w-4" />
            {t('CashAccounts:statements')}
          </Link>
        </Button>
        
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/cash-accounts/${id}`}>
            <Eye className="mr-2 h-4 w-4" />
            {t('CashAccounts:viewDetails')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
