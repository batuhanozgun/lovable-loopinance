
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircle, RefreshCw, ArrowLeft } from 'lucide-react';
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
  const { t } = useTranslation(['StatementManagement', 'common']);
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
          description: result.message || t('statements.toasts.statementCheckComplete')
        });
        
        // Listeyi yenile
        await refetchStatements();
      } else {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: result.message || t('statements.toasts.statementCheckFailed'),
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
      <div className="container py-4">
        <Skeleton className="h-6 w-56 mb-3" />
        <Skeleton className="h-10 w-full mb-3" />
        <Card className="p-4">
          <Skeleton className="h-28 w-full" />
        </Card>
      </div>
    );
  }
  
  // Hata durumu
  if (accountError || !account) {
    return (
      <div className="container py-4">
        <h1 className="text-xl font-semibold mb-3">{t('statements.title')}</h1>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <p className="text-destructive mb-3 text-sm">
            {t('errors.account.notFound')}
          </p>
          <Button asChild size="sm" className="h-8 text-xs">
            <Link to="/nakit-hesaplar">
              {t('common:buttons.backToAccounts')}
            </Link>
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-3 h-7">
            <Link to="/nakit-hesaplar">
              <ArrowLeft className="mr-1.5 h-3 w-3" />
              {t('common:back')}
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">
            {`${account.name} - ${t('statements.title')}`}
          </h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefreshStatements}
            disabled={isProcessing}
            className="h-7 text-xs"
          >
            <RefreshCw className={`h-3 w-3 mr-1.5 ${isProcessing ? 'animate-spin' : ''}`} />
            {t('statements.buttons.refreshStatements')}
          </Button>
        </div>
      </div>
      
      {statementsError ? (
        <Card className="p-4">
          <div className="text-center">
            <p className="text-destructive mb-3 text-sm">
              {t('errors.statement.list.failed')}
            </p>
            <Button onClick={() => refetchStatements()} size="sm" className="h-8 text-xs">
              {t('common:buttons.tryAgain')}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {isStatementsLoading ? (
            <Card className="p-4">
              <Skeleton className="h-28 w-full" />
            </Card>
          ) : (
            statements && statements.length > 0 ? (
              <StatementsList 
                statements={statements} 
                isLoading={isStatementsLoading} 
                currency={account.currency as CurrencyType} 
              />
            ) : (
              <Card className="p-4">
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4 text-sm">
                    {t('statements.empty.noStatements')}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {t('statements.empty.statementInfo')}
                  </p>
                  <Button 
                    onClick={handleRefreshStatements} 
                    disabled={isProcessing}
                    size="sm"
                    className="h-8 text-xs"
                  >
                    <PlusCircle className="h-3 w-3 mr-1.5" />
                    {t('statements.buttons.createStatement')}
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
