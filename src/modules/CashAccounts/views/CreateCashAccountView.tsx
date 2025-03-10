
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CashAccountForm } from '../components/CashAccountForm';
import initCashAccountsTranslations from '../i18n';

/**
 * Nakit Hesap oluşturma sayfası
 */
export const CreateCashAccountView: React.FC = () => {
  const { t } = useTranslation(['CashAccounts']);
  
  // Çevirileri başlat
  useEffect(() => {
    initCashAccountsTranslations();
  }, []);

  return (
    <div>
      <CashAccountForm />
    </div>
  );
};
