
import React from 'react';
import { CashAccountForm } from '../components/CashAccountForm';

/**
 * Nakit hesap oluşturma sayfası
 */
export const CreateCashAccountView: React.FC = () => {
  return (
    <div className="py-2">
      <CashAccountForm />
    </div>
  );
};
