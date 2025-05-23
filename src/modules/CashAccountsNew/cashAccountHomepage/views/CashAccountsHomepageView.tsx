
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useCashAccounts } from '../hooks/useCashAccounts';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { CashAccount, CurrencyType } from '../types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableCashAccountRow } from '../components/DraggableCashAccountRow';
import { useCashAccountDnd } from '../hooks/useCashAccountDnd';
import { TransactionForm } from '../../transactionManagement';
import { StatementFinderService } from '../../transactionManagement/services/StatementFinderService';

/**
 * Nakit Hesaplar ana görünümü
 */
export const CashAccountsHomepageView: React.FC = () => {
  const { t } = useTranslation(['CashAccountHomepage']);
  const { toast } = useToast();
  const { data: accounts, isLoading, isError, refetch } = useCashAccounts();

  // İşlem formu modalı için state
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<CashAccount | null>(null);
  const [activeStatementId, setActiveStatementId] = useState<string | undefined>(undefined);

  // Sürükle-bırak işlevselliğini yöneten hook
  const { sensors, handleDragEnd } = useCashAccountDnd({
    accounts: accounts || [],
    setAccounts: () => refetch() // Sıralama değişince doğrudan verileri yeniden çek
  });

  // İşlem ekleme modalını aç
  const handleAddTransaction = async (account: CashAccount) => {
    setSelectedAccount(account);
    
    // Hesabın en son aktif ekstresini bul
    try {
      const statements = await StatementFinderService.findOpenStatements(account.id);
      if (statements && statements.length > 0) {
        setActiveStatementId(statements[0].id);
        setIsTransactionFormOpen(true);
      } else {
        toast({
          title: t('CashAccountsNew:errors.statement.notFound'),
          description: t('CashAccountsNew:errors.statement.createFirst'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Failed to find active statements:', error);
      toast({
        title: t('CashAccountsNew:errors.statement.loadFailed'),
        variant: 'destructive'
      });
    }
  };

  // Diğer işlevler (düzenleme ve silme için geçici işlevler)
  const handleEdit = (account: CashAccount) => {
    toast({
      title: t('editNotImplemented'),
      description: `${account.name} hesabını düzenleme işlevi henüz uygulanmadı.`,
    });
  };

  const handleDelete = (account: CashAccount) => {
    toast({
      title: t('deleteNotImplemented'),
      description: `${account.name} hesabını silme işlevi henüz uygulanmadı.`,
    });
  };

  // İşlem formunu kapat ve verileri yenile
  const handleCloseTransactionForm = () => {
    setIsTransactionFormOpen(false);
    setSelectedAccount(null);
    setActiveStatementId(undefined);
    
    // Form kapatıldığında verileri yenile
    refetch();
  };

  // Yükleme durumu için iskelet
  const renderSkeleton = () => (
    <div className="space-y-0.5">
      {[1, 2, 3].map((item) => (
        <div key={item} className="border rounded-lg">
          <div className="flex items-center justify-between py-3 px-3">
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-1.5" />
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-2.5 w-14" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Hesap satırlarını render et
  const renderAccounts = () => {
    // Hesap yoksa boş durum göster
    if (!accounts || accounts.length === 0) {
      return (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-base font-medium mb-2">
            {t('noAccounts')}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {t('description')}
          </p>
          <Button asChild size="sm">
            <Link to="/nakit-hesaplar/new">
              {t('createAccount')}
            </Link>
          </Button>
        </div>
      );
    }

    // Hesapları göster
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={accounts.map(account => account.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-0.5 border rounded-lg overflow-hidden">
            {accounts.map((account) => (
              <DraggableCashAccountRow 
                key={account.id} 
                account={account} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddTransaction={handleAddTransaction}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <div className="container py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">
          {t('title')}
        </h1>
        <Button asChild size="sm" className="h-8 text-xs px-3">
          <Link to="/nakit-hesaplar/new">
            <PlusCircle className="mr-1 h-3.5 w-3.5" />
            {t('newAccount')}
          </Link>
        </Button>
      </div>
      
      {isLoading ? renderSkeleton() : renderAccounts()}
      
      {isError && (
        <div className="p-3 border border-destructive text-destructive rounded-md text-sm">
          {t('errors.account.list.failed')}
        </div>
      )}
      
      {/* İşlem formu modalı */}
      {selectedAccount && (
        <TransactionForm
          isOpen={isTransactionFormOpen}
          onClose={handleCloseTransactionForm}
          accountId={selectedAccount.id}
          statementId={activeStatementId}
          currency={selectedAccount.currency as CurrencyType}
        />
      )}
    </div>
  );
};
