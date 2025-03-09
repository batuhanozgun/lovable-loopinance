
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ConfirmationStepProps {
  selectedPlan: SubscriptionPlanType;
  billingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentDetails: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  onBack: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  selectedPlan,
  billingDetails,
  paymentDetails,
  onBack,
  onConfirm,
  isProcessing
}) => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  
  // Format currency
  const formatCurrency = (price: number, currency: string = '₺') => {
    return new Intl.NumberFormat(i18n.language === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: currency === '₺' ? 'TRY' : currency,
      minimumFractionDigits: 0,
    }).format(price).replace('TRY', '₺');
  };
  
  // Plan fiyatı
  const getPlanPrice = () => {
    if (selectedPlan === SubscriptionPlanType.MONTHLY) {
      return 49;
    } else if (selectedPlan === SubscriptionPlanType.YEARLY) {
      return 39 * 12; // Aylık 39, yıllık toplam
    }
    return 0;
  };
  
  // Masked card number
  const getMaskedCardNumber = () => {
    const cardNum = paymentDetails.cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cardNum.slice(-4)}`;
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-base font-medium mb-2">{t('Subscription:payment.confirmation.summary')}</h3>
          <div className="flex justify-between items-center py-2">
            <span>{t('Subscription:payment.confirmation.plan')}</span>
            <span className="font-medium">{t(`Subscription:plan.${selectedPlan}`)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>{t('Subscription:payment.confirmation.amount')}</span>
            <span className="font-bold text-lg">{formatCurrency(getPlanPrice())}</span>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="text-base font-medium mb-2">{t('Subscription:payment.confirmation.billingTitle')}</h3>
          <div className="text-sm space-y-1">
            <p className="font-medium">{billingDetails.fullName}</p>
            <p>{billingDetails.email}</p>
            <p>{billingDetails.address}</p>
            <p>
              {billingDetails.zipCode && `${billingDetails.zipCode}, `}
              {billingDetails.city}
              {billingDetails.country && `, ${billingDetails.country}`}
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="text-base font-medium mb-2">{t('Subscription:payment.confirmation.paymentTitle')}</h3>
          <div className="text-sm space-y-1">
            <p>{t('Subscription:payment.confirmation.paymentMethod')}</p>
            <p className="font-medium">{getMaskedCardNumber()}</p>
          </div>
          
          <div className="mt-6 p-3 bg-muted/30 rounded text-sm">
            <p>{t('Subscription:payment.confirmation.disclaimer')}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} disabled={isProcessing}>
          {t('common:back')}
        </Button>
        <Button onClick={onConfirm} disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('Subscription:payment.actions.processing')}
            </>
          ) : (
            t('Subscription:payment.actions.confirm')
          )}
        </Button>
      </div>
    </div>
  );
};
