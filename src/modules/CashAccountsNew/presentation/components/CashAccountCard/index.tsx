
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Pencil } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CashAccount } from '../../../shared/types';
import { formatCurrency } from '../../../shared/utils/currencyUtils';

interface CashAccountCardProps {
  account: CashAccount;
}

/**
 * Nakit hesap kartı bileşeni
 */
export const CashAccountCard: React.FC<CashAccountCardProps> = ({ account }) => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>{account.name}</CardTitle>
        <CardDescription>
          {account.description || t('noDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-2 flex-grow">
        <div className="mt-2">
          <div className="text-2xl font-bold">
            {formatCurrency(account.initial_balance, account.currency)}
          </div>
          <p className="text-sm text-muted-foreground">
            {t('balance')}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/cash-accounts-new/${account.id}`}>
            <ArrowUpRight className="h-4 w-4 mr-2" />
            {t('details')}
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/cash-accounts-new/${account.id}?edit=true`}>
            <Pencil className="h-4 w-4 mr-2" />
            {t('edit')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
