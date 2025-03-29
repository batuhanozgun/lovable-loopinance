
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Wallet, ArrowUpRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '../../../shared/utils/currencyUtils';
import { CashAccount, CurrencyType } from '../../../shared/types';

interface CashAccountCardProps {
  account: CashAccount;
}

export const CashAccountCard: React.FC<CashAccountCardProps> = ({ account }) => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold truncate">{account.name}</CardTitle>
            <CardDescription className="line-clamp-2 h-10">
              {account.description || t('noDescription')}
            </CardDescription>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {t('overview.balanceLabel')}
          </p>
          <h3 className="text-2xl font-bold">
            {formatCurrency(account.initial_balance, account.currency as CurrencyType)}
          </h3>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full" variant="outline">
          <Link to={`/cash-accounts/${account.id}`}>
            {t('viewDetails')}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
