
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useCashAccountForm } from '../hooks/useCashAccountForm';
import { uiLogger } from '../../logging';

/**
 * Yeni nakit hesap oluşturma görünümü
 */
export const CreateCashAccountView: React.FC = () => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { defaultFormData, createCashAccount, isSubmitting } = useCashAccountForm();
  
  const handleCancel = () => {
    navigate('/cash-accounts-new');
  };
  
  const handleSubmit = async (formData: typeof defaultFormData) => {
    uiLogger.info('Submitting cash account creation form');
    
    const result = await createCashAccount(formData);
    
    if (result) {
      uiLogger.info('Successfully created cash account', { accountId: result.id });
      navigate('/cash-accounts-new');
    }
  };
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('createAccount.title')}</h1>
        <Button 
          variant="ghost" 
          onClick={handleCancel}
        >
          {t('common:cancel')}
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-lg mb-6">{t('createAccount.description')}</p>
        
        {/* Form burada eklencek */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button 
            variant="outline" 
            onClick={handleCancel}
          >
            {t('common:cancel')}
          </Button>
          <Button 
            disabled={isSubmitting}
            onClick={() => handleSubmit(defaultFormData)}
          >
            {isSubmitting ? t('common:loading') : t('common:save')}
          </Button>
        </div>
      </div>
    </div>
  );
};
