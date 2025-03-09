
import { useState } from 'react';
import { IBillingDetails } from '../types/IBilling';

const DEFAULT_BILLING_DETAILS: IBillingDetails = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  country: 'Turkey'
};

/**
 * Fatura bilgilerini yönetmek için hook
 */
export const useBillingDetails = (initialDetails?: Partial<IBillingDetails>) => {
  const [billingDetails, setBillingDetails] = useState<IBillingDetails>({
    ...DEFAULT_BILLING_DETAILS,
    ...initialDetails
  });
  
  // Fatura bilgisinin güncellenmesi
  const updateBillingDetails = (updates: Partial<IBillingDetails>) => {
    setBillingDetails(prev => ({
      ...prev,
      ...updates
    }));
  };
  
  // Fatura bilgisinin sıfırlanması
  const resetBillingDetails = () => {
    setBillingDetails(DEFAULT_BILLING_DETAILS);
  };
  
  // Fatura bilgisinin geçerliliğini kontrol etme
  const isValid = (): boolean => {
    return (
      billingDetails.fullName.trim() !== '' &&
      billingDetails.email.trim() !== '' && 
      billingDetails.email.includes('@') &&
      billingDetails.address !== ''
    );
  };
  
  return {
    billingDetails,
    setBillingDetails,
    updateBillingDetails,
    resetBillingDetails,
    isValid
  };
};
