
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useCashAccounts } from '../hooks/useCashAccounts';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { CashAccount } from '../types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableCashAccountRow } from '../components/DraggableCashAccountRow';
import { useCashAccountDnd } from '../hooks/useCashAccountDnd';

/**
 * Nakit Hesaplar ana görünümü
 */
export const CashAccountsHomepageView: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew']);
  const { toast } = useToast();
  const { data: fetchedAccounts, isLoading, isError } = useCashAccounts();
  const [accounts, setAccounts] = useState<CashAccount[]>([]);

  // Hesap verilerini state'e aktar
  useEffect(() => {
    if (fetchedAccounts) {
      setAccounts(fetchedAccounts);
    }
  }, [fetchedAccounts]);

  // Sürükle-bırak işlevselliğini yöneten hook
  const { sensors, handleDragEnd } = useCashAccountDnd({
    accounts,
    setAccounts
  });

  // Düzenleme ve silme işlemleri için geçici işlevler
  const handleEdit = (account: CashAccount) => {
    toast({
      title: t('CashAccountsNew:editNotImplemented'),
      description: `${account.name} hesabını düzenleme işlevi henüz uygulanmadı.`,
    });
  };

  const handleDelete = (account: CashAccount) => {
    toast({
      title: t('CashAccountsNew:deleteNotImplemented'),
      description: `${account.name} hesabını silme işlevi henüz uygulanmadı.`,
    });
  };

  // Yükleme durumu için iskelet
  const renderSkeleton = () => (
    <div className="space-y-1">
      {[1, 2, 3].map((item) => (
        <div key={item} className="border rounded-lg">
          <div className="flex items-center justify-between py-4 px-4">
            <div className="flex-1">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-3 w-60" />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-8 w-24" />
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
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium mb-2">
            {t('CashAccountsNew:noAccounts')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('CashAccountsNew:description')}
          </p>
          <Button asChild>
            <Link to="/nakit-hesaplar/new">
              {t('CashAccountsNew:createAccount')}
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
          <div className="space-y-1 border rounded-lg overflow-hidden">
            {accounts.map((account) => (
              <DraggableCashAccountRow 
                key={account.id} 
                account={account} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {t('CashAccountsNew:title')}
        </h1>
        <Button asChild>
          <Link to="/nakit-hesaplar/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('CashAccountsNew:newAccount')}
          </Link>
        </Button>
      </div>
      
      {isLoading ? renderSkeleton() : renderAccounts()}
      
      {isError && (
        <div className="p-4 border border-destructive text-destructive rounded-md">
          {t('CashAccountsNew:errors.account.list.failed')}
        </div>
      )}
    </div>
  );
};
