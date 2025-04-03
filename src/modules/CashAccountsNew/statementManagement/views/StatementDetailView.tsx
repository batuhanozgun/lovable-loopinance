
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransactionForm } from '../../transactionManagement/components/TransactionForm';
import { useStatement } from '../hooks/useStatement';
import { StatementDetails } from '../components/StatementDetails';
import { TransactionsList } from '../components/TransactionsList';

export const StatementDetailView: React.FC = () => {
  const { t } = useTranslation('StatementManagement');
  const navigate = useNavigate();
  const { accountId, statementId } = useParams<{ accountId: string; statementId: string }>();
  
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [refetchTransactions, setRefetchTransactions] = useState<(() => Promise<void>) | null>(null);
  
  // Statement detaylarını getirme
  const { data: statement, isLoading, refetch } = useStatement(statementId);
  
  // Statement'da yapılan değişiklikler sonrası işlemleri de yenile
  useEffect(() => {
    if (refetchTransactions) {
      refetchTransactions();
    }
  }, [statement, refetchTransactions]);
  
  const handleBack = () => {
    navigate(`/nakit-hesaplar/${accountId}/statements`);
  };
  
  const handleCloseTransactionForm = () => {
    setIsNewTransactionOpen(false);
    
    // Form kapandıktan sonra verileri yenile
    setTimeout(() => {
      refetch();
      if (refetchTransactions) {
        refetchTransactions();
      }
    }, 500);
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleBack}
            aria-label={t('common:back')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{t('statements.detailsTitle')}</h1>
        </div>
        
        <Button onClick={() => setIsNewTransactionOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('transactions.new')}
        </Button>
      </div>
      
      {/* Statement Detayları */}
      <StatementDetails 
        statement={statement} 
        isLoading={isLoading}
        currency={statement?.account?.currency || 'TRY'}
      />
      
      {/* İşlem Listesi */}
      <TransactionsList 
        statementId={statementId as string} 
        accountId={accountId as string}
        currency={statement?.account?.currency || 'TRY'}
        setRefetchCallback={setRefetchTransactions}
      />
      
      {/* Yeni İşlem Formu */}
      <TransactionForm
        accountId={accountId as string}
        statementId={statementId as string}
        currency={statement?.account?.currency || 'TRY'}
        isOpen={isNewTransactionOpen}
        onClose={handleCloseTransactionForm}
      />
    </div>
  );
};
