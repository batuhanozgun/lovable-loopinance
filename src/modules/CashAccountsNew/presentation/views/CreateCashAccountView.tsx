
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCashAccountForm } from '../hooks/useCashAccountForm';
import { uiLogger } from '../../logging';
import { CashAccountForm } from '../components/CashAccountForm';
import { CashAccountFormData } from '../../shared/types';

/**
 * Yeni nakit hesap oluşturma görünümü
 */
export const CreateCashAccountView: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { defaultFormData, createCashAccount, isSubmitting, formError } = useCashAccountForm();
  
  const handleCancel = () => {
    navigate('/cash-accounts-new');
  };
  
  const handleSubmit = async (formData: CashAccountFormData) => {
    uiLogger.info('Submitting cash account creation form', { formData });
    
    try {
      const result = await createCashAccount(formData);
      
      if (result) {
        uiLogger.info('Successfully created cash account', { accountId: result.id });
        toast({
          title: t('common:success'),
          description: t('accountCreated'),
        });
        navigate('/cash-accounts-new');
      } else if (formError) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: formError,
        });
      }
    } catch (error) {
      uiLogger.error('Error submitting form', { error });
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: t('errors.account.create.failed'),
      });
    }
  };
  
  return (
    <div className={`container py-6 space-y-6 ${isMobile ? 'px-3' : ''}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('createAccount.title')}</h1>
        <Button 
          variant="ghost" 
          onClick={handleCancel}
        >
          {t('common:cancel')}
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow">
        <CashAccountForm
          defaultValues={defaultFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
