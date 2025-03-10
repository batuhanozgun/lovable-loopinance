
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCashAccountForm } from '../../hooks/useCashAccountForm';
import { AccountInfoStep } from './AccountInfoStep';
import { ClosingDayStep } from './ClosingDayStep';

/**
 * Nakit hesap oluşturma formu bileşeni
 */
export const CashAccountForm: React.FC = () => {
  const { t } = useTranslation(['CashAccounts']);
  const navigate = useNavigate();
  
  const {
    step,
    isSubmitting,
    handleSubmit,
    register,
    watch,
    setValue,
    errors,
    goToNextStep,
    goToPreviousStep,
    onSubmit,
    closingDayType
  } = useCashAccountForm();
  
  // Form nesnesini birleştir
  const form = {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  };
  
  // Form gönderimi ve yönlendirme
  const handleFormSubmit = async () => {
    const result = await handleSubmit(onSubmit)();
    if (result) {
      navigate('/cash-accounts');
    }
  };
  
  // İptal işlemi
  const handleCancel = () => {
    navigate('/cash-accounts');
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">
        {t('CashAccounts:forms.accountForm.title')}
      </h1>
      
      {step === 1 && (
        <AccountInfoStep
          form={form}
          onNext={goToNextStep}
          onCancel={handleCancel}
        />
      )}
      
      {step === 2 && (
        <ClosingDayStep
          form={form}
          isSubmitting={isSubmitting}
          onBack={goToPreviousStep}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};
