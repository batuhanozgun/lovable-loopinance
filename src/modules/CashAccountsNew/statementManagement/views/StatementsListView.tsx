
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCashAccount } from '@/modules/CashAccountsNew/cashAccountHomepage/hooks/useCashAccounts';
import { useStatements } from '../hooks/useStatements';
import { StatementsList } from '../components/StatementsList';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';

/**
 * Ekstreler listesi görünümü
 */
export const StatementsListView: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const { accountId } = useParams<{ accountId: string }>();
  const { toast } = useToast();
  
  // Hesap verilerini çekme
  const { account, isLoading: isAccountLoading } = useCashAccount(accountId!);
  
  // Ekstreleri çekme
  const { 
    data: statements, 
    isLoading: isStatementsLoading, 
    refetch: refetchStatements
  } = useStatements(accountId!);
  
  // Ekstreleri manuel kontrol etme ve dönem işlemlerini yapma
  const handleRefreshStatements = async () => {
    if (!account) return;
    
    try {
      // StatementService veya benzer bir servisi kullanarak ekstreler kontrol edilebilir
      // Şimdilik sadece mevcut ekstreleri yeniden yüklüyoruz
      await refetchStatements();
      
      toast({
        title: t('common:success'),
        description: t('statements.toasts.statementCheckComplete'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: error instanceof Error 
          ? error.message 
          : t('statements.toasts.statementCheckError'),
      });
    }
  };
  
  // Yükleme durumu
  if (isAccountLoading) {
    return (
      <div className="container py-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
        <Card className="p-6">
          <Skeleton className="h-32 w-full" />
        </Card>
      </div>
    );
  }
  
  // Hata durumu
  if (!account) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">{t('statements.title')}</h1>
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <p className="text-destructive mb-4">
            {t('errors.account.notFound')}
          </p>
          <Button asChild>
            <Link to="/nakit-hesaplar">
              {t('common:buttons.backToAccounts')}
            </Link>
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to={`/nakit-hesaplar`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:back')}
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">
          {`${account.name} - ${t('statements.title')}`}
        </h1>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefreshStatements}
          className="mr-2"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {t('statements.buttons.refreshStatements')}
        </Button>
      </div>
      
      {isStatementsLoading ? (
        <Card className="p-6">
          <Skeleton className="h-32 w-full" />
        </Card>
      ) : (
        statements && statements.length > 0 ? (
          <StatementsList 
            statements={statements} 
            isLoading={isStatementsLoading} 
            currency={account.currency as CurrencyType} 
          />
        ) : (
          <Card className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-6">
                {t('statements.empty.noStatements')}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {t('statements.empty.statementInfo')}
              </p>
              <Button onClick={handleRefreshStatements}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('statements.buttons.refreshStatements')}
              </Button>
            </div>
          </Card>
        )
      )}
    </div>
  );
};
