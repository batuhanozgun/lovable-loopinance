
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { IBillingDetails } from '../../../types/IBilling';

interface BillingDetailsStepProps {
  billingDetails: IBillingDetails;
  setBillingDetails: React.Dispatch<React.SetStateAction<IBillingDetails>>;
  onBack: () => void;
  onNext: () => void;
}

export const BillingDetailsStep: React.FC<BillingDetailsStepProps> = ({
  billingDetails,
  setBillingDetails,
  onBack,
  onNext
}) => {
  const { t } = useTranslation(['Payment', 'common']);
  
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
      billingDetails.address !== '' &&
      billingDetails.city !== ''
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">{t('Payment:billing.fullName')}</Label>
          <Input 
            id="fullName"
            name="fullName"
            value={billingDetails.fullName}
            onChange={handleChange}
            placeholder={t('Payment:billing.fullNamePlaceholder')}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">{t('Payment:billing.email')}</Label>
          <Input 
            id="email"
            name="email"
            type="email"
            value={billingDetails.email}
            onChange={handleChange}
            placeholder={t('Payment:billing.emailPlaceholder')}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="address">{t('Payment:billing.address')}</Label>
          <Input 
            id="address"
            name="address"
            value={billingDetails.address as string}
            onChange={handleChange}
            placeholder={t('Payment:billing.addressPlaceholder')}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">{t('Payment:billing.city')}</Label>
            <Input 
              id="city"
              name="city"
              value={billingDetails.city}
              onChange={handleChange}
              placeholder={t('Payment:billing.cityPlaceholder')}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="zipCode">{t('Payment:billing.zipCode')}</Label>
            <Input 
              id="zipCode"
              name="zipCode"
              value={billingDetails.zipCode}
              onChange={handleChange}
              placeholder={t('Payment:billing.zipCodePlaceholder')}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          {t('common:back')}
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          {t('Payment:actions.continue')}
        </Button>
      </div>
    </div>
  );
};
