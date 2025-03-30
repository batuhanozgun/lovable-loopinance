
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCashAccount } from '../../cashAccountHomepage/hooks/useCashAccount';
import { useStatements } from '../hooks/useStatements';
import { StatementsList } from '../components/StatementsList';
import { StatementAutomationService } from '../services/automation/StatementAutomationService';
import { CurrencyType } from '../../cashAccountHomepage/types';

export const StatementsListView: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const { accountId } = useParams<{ accountId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Hesap verilerini çekme
  const { 
    data: account, 
    isLoading: isAccountLoading, 
    error: accountError 
  } = useCashAccount(accountId!);
  
  // Ekstreleri çekme
  const { 
    data: statements, 
    isLoading: isStatementsLoading, 
    error: statementsError,
    refetch: refetchStatements
  } = useStatements(accountId!);
  
  // Ekstreleri manuel kontrol etme ve dönem işlemlerini yapma
  const handleRefreshStatements = async () => {
    if (!account) return;
    
    try {
      setIsProcessing(true);
      
      // Otomasyon servisi ile hesap ekstrelerini kontrol et
      const result = await StatementAutomationService.processAccountStatements(account);
      
      // Sonuçlara göre mesaj göster
      if (result.success) {
        toast({
          title: t('common:success'),
          description: result.message
        });
        
        // Listeyi yenile
        await refetchStatements();
      } else {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: result.message || t('statements.toasts.statementCheckError'),
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: error instanceof Error 
          ? error.message 
          : t('statements.toasts.statementCheckError'),
      });
    } finally {
      setIsProcessing(false);
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
  if (accountError || !account) {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {`${account.name} - ${t('statements.title')}`}
        </h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefreshStatements}
            disabled={isProcessing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
            {t('statements.buttons.refreshStatements')}
          </Button>
        </div>
      </div>
      
      {statementsError ? (
        <Card className="p-6">
          <div className="text-center">
            <p className="text-destructive mb-4">
              {t('errors.account.detail.failed')}
            </p>
            <Button onClick={() => refetchStatements()}>
              {t('common:buttons.tryAgain')}
            </Button>
          </div>
        </Card>
      ) : (
        <>
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
                  <Button onClick={handleRefreshStatements} disabled={isProcessing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
                    {t('statements.buttons.refreshStatements')}
                  </Button>
                </div>
              </Card>
            )
          )}
        </>
      )}
    </div>
  );
};
