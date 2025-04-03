
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AccountTransaction, StatementTransactionType } from '../../../types/transaction';
import { StatementService } from '../../../services/StatementService';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, parse } from 'date-fns';
import { useCategories } from '@/modules/Categories/hooks/queries/useCategoryQueries';
import { CurrencyType } from '@/modules/CashAccountsNew/cashAccountHomepage/types';

interface EditTransactionDialogProps {
  transaction: AccountTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  currency: CurrencyType;
}

export const EditTransactionDialog: React.FC<EditTransactionDialogProps> = ({
  transaction,
  isOpen,
  onClose,
  onSuccess,
  currency
}) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { categories } = useCategories();
  
  // Form durumu
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [transactionType, setTransactionType] = useState<StatementTransactionType>(StatementTransactionType.INCOME);
  const [transactionDate, setTransactionDate] = useState<string>('');
  const [transactionTime, setTransactionTime] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('no-category');
  const [subcategoryId, setSubcategoryId] = useState<string>('no-subcategory');
  
  // Seçili kategoriye ait alt kategorileri bul
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );
  const subcategories = selectedCategory?.sub_categories || [];
  
  // İşlem verileri değiştiğinde form alanlarını güncelle
  useEffect(() => {
    if (transaction) {
      // Tutarı formatlayarak ayarla (örn: 1234.56 -> 1.234,56)
      const formattedAmount = transaction.amount.toString().replace('.', ',');
      setAmount(formattedAmount);
      
      setDescription(transaction.description || '');
      setTransactionType(transaction.transaction_type);
      
      // Tarih ve saat alanlarını ayarla
      setTransactionDate(transaction.transaction_date);
      setTransactionTime(transaction.transaction_time);
      
      // Kategori bilgilerini ayarla
      setCategoryId(transaction.category_id || 'no-category');
      setSubcategoryId(transaction.subcategory_id || 'no-subcategory');
    }
  }, [transaction]);
  
  // Formu kapat
  const handleCloseDialog = () => {
    if (!isSubmitting) {
      onClose();
    }
  };
  
  // Formu gönder
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!transaction) return;
    
    setIsSubmitting(true);
    
    try {
      // Tutarı işle (virgülleri noktalara çevir)
      const parsedAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
      
      if (isNaN(parsedAmount)) {
        toast({
          title: t('common:error', { ns: 'common' }),
          description: t('errors.transaction.invalidAmount'),
          variant: 'destructive'
        });
        setIsSubmitting(false);
        return;
      }
      
      // Güncelleme verilerini hazırla
      const updateData: Partial<AccountTransaction> = {
        amount: parsedAmount,
        transaction_type: transactionType,
        transaction_date: transactionDate,
        transaction_time: transactionTime,
        description: description.trim() || null
      };
      
      // Kategori bilgilerini ekle
      if (categoryId !== 'no-category') {
        updateData.category_id = categoryId;
        
        if (subcategoryId !== 'no-subcategory') {
          updateData.subcategory_id = subcategoryId;
        } else {
          updateData.subcategory_id = null;
        }
      } else {
        updateData.category_id = null;
        updateData.subcategory_id = null;
      }
      
      // Güncelleme işlemini yap
      const response = await StatementService.updateTransaction(transaction.id, updateData);
      
      if (response.success) {
        // Başarılı güncelleme
        toast({
          title: t('common:success', { ns: 'common' }),
          description: t('transactions.updateSuccess'),
        });
        
        // Veri önbelleğini yenile
        await queryClient.invalidateQueries({ queryKey: ['statementTransactions', transaction.statement_id] });
        await queryClient.invalidateQueries({ queryKey: ['cashAccountStatementNew', transaction.statement_id] });
        await queryClient.invalidateQueries({ queryKey: ['accountStatements', transaction.account_id] });
        await queryClient.invalidateQueries({ queryKey: ['cashAccounts'] });
        
        // Veri yenileme fonksiyonunu çalıştır
        await onSuccess();
        
        // Formu kapat
        onClose();
      } else {
        // Hata durumu
        toast({
          title: t('common:error', { ns: 'common' }),
          description: response.error || t('errors.transaction.update.failed'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast({
        title: t('common:error', { ns: 'common' }),
        description: t('errors.transaction.update.failed'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Kategori değişikliğini işle
  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setSubcategoryId('no-subcategory');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {t('transactions.edit')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* İşlem Tipi */}
          <div className="space-y-2">
            <Label>{t('statements.type')}</Label>
            <RadioGroup
              value={transactionType}
              onValueChange={(value) => setTransactionType(value as StatementTransactionType)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={StatementTransactionType.INCOME} id="income" />
                <Label htmlFor="income" className="cursor-pointer text-green-600 dark:text-green-400">
                  {t('statements.income')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={StatementTransactionType.EXPENSE} id="expense" />
                <Label htmlFor="expense" className="cursor-pointer text-red-600 dark:text-red-400">
                  {t('statements.expenses')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Tarih */}
          <div className="space-y-2">
            <Label htmlFor="transaction-date">{t('transactions.date')}</Label>
            <Input
              id="transaction-date"
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              required
            />
          </div>
          
          {/* Saat */}
          <div className="space-y-2">
            <Label htmlFor="transaction-time">{t('transactions.time')}</Label>
            <Input
              id="transaction-time"
              type="time"
              value={transactionTime}
              onChange={(e) => setTransactionTime(e.target.value)}
              required
            />
          </div>
          
          {/* Kategori */}
          <div className="space-y-2">
            <Label htmlFor="category">{t('transactions.category')}</Label>
            <Select value={categoryId} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('transactions.selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-category">
                  {t('transactions.noCategory')}
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Alt Kategori */}
          <div className="space-y-2">
            <Label htmlFor="subcategory">{t('transactions.subcategory')}</Label>
            <Select 
              value={subcategoryId} 
              onValueChange={setSubcategoryId}
              disabled={categoryId === 'no-category' || subcategories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('transactions.selectSubcategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-subcategory">
                  {t('transactions.noSubcategory')}
                </SelectItem>
                {subcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Tutar */}
          <div className="space-y-2">
            <Label htmlFor="amount">{t('transactions.amount')}</Label>
            <div className="relative">
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                {currency === "TRY" ? "₺" : currency === "USD" ? "$" : "€"}
              </div>
            </div>
          </div>
          
          {/* Açıklama */}
          <div className="space-y-2">
            <Label htmlFor="description">{t('transactions.description')}</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('transactions.descriptionPlaceholder')}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCloseDialog}
              disabled={isSubmitting}
            >
              {t('common:cancel', { ns: 'common' })}
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('common:processing', { ns: 'common' })}
                </>
              ) : (
                t('transactions.save')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
