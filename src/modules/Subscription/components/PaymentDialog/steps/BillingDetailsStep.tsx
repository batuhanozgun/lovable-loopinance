
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

interface BillingDetailsFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface BillingDetailsStepProps {
  billingDetails: BillingDetailsFormData;
  setBillingDetails: React.Dispatch<React.SetStateAction<BillingDetailsFormData>>;
  onBack: () => void;
  onNext: () => void;
}

export const BillingDetailsStep: React.FC<BillingDetailsStepProps> = ({
  billingDetails,
  setBillingDetails,
  onBack,
  onNext
}) => {
  const { t } = useTranslation(['Subscription', 'common']);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const isFormValid = () => {
    return (
      billingDetails.fullName.trim() !== '' &&
      billingDetails.email.trim() !== '' && 
      billingDetails.email.includes('@') &&
      billingDetails.address.trim() !== '' &&
      billingDetails.city.trim() !== ''
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">{t('Subscription:payment.billing.fullName')}</Label>
          <Input 
            id="fullName"
            name="fullName"
            value={billingDetails.fullName}
            onChange={handleChange}
            placeholder={t('Subscription:payment.billing.fullNamePlaceholder')}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">{t('Subscription:payment.billing.email')}</Label>
          <Input 
            id="email"
            name="email"
            type="email"
            value={billingDetails.email}
            onChange={handleChange}
            placeholder={t('Subscription:payment.billing.emailPlaceholder')}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="address">{t('Subscription:payment.billing.address')}</Label>
          <Input 
            id="address"
            name="address"
            value={billingDetails.address}
            onChange={handleChange}
            placeholder={t('Subscription:payment.billing.addressPlaceholder')}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">{t('Subscription:payment.billing.city')}</Label>
            <Input 
              id="city"
              name="city"
              value={billingDetails.city}
              onChange={handleChange}
              placeholder={t('Subscription:payment.billing.cityPlaceholder')}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="zipCode">{t('Subscription:payment.billing.zipCode')}</Label>
            <Input 
              id="zipCode"
              name="zipCode"
              value={billingDetails.zipCode}
              onChange={handleChange}
              placeholder={t('Subscription:payment.billing.zipCodePlaceholder')}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          {t('common:back')}
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          {t('Subscription:payment.actions.continue')}
        </Button>
      </div>
    </div>
  );
};
