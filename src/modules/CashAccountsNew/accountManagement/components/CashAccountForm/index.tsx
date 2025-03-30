
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
  const { t } = useTranslation(['CashAccountsNew']);
  const navigate = useNavigate();
  
  const {
    form,
    step,
    isSubmitting,
    onSubmit,
    goToNextStep,
    goToPreviousStep,
  } = useCashAccountForm();
  
  // Form gönderimi ve yönlendirme
  const handleFormSubmit = async () => {
    const account = await onSubmit(form.getValues());
    if (account) {
      navigate('/nakit-hesaplar');
    }
  };
  
  // İptal işlemi
  const handleCancel = () => {
    navigate('/nakit-hesaplar');
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">
        {t('form.title')}
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
