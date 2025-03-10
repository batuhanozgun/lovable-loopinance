
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CashAccountForm } from '../components/CashAccountForm';

/**
 * Nakit Hesap oluşturma sayfası
 */
export const CreateCashAccountView: React.FC = () => {
  const { t } = useTranslation(['CashAccounts']);
  
  return (
    <div>
      <CashAccountForm />
    </div>
  );
};
