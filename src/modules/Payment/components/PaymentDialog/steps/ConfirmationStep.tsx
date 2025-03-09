
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { IBillingDetails } from '../../../types/IBilling';
import { ICardDetails } from '../../../types/IPayment';
import { maskCardNumber } from '../../../utils/cardUtils';
import { formatCurrency } from '../../../utils/currencyUtils';

interface ConfirmationStepProps {
  planType: string;
  planPrice: number;
  billingDetails: IBillingDetails;
  paymentDetails: ICardDetails;
  onBack: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  planType,
  planPrice,
  billingDetails,
  paymentDetails,
  onBack,
  onConfirm,
  isProcessing
}) => {
  const { t, i18n } = useTranslation(['Payment', 'common', 'Subscription']);
  
  // Masked card number
  const getMaskedCardNumber = () => {
    return maskCardNumber(paymentDetails.cardNumber);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-base font-medium mb-2">{t('Payment:confirmation.summary')}</h3>
          <div className="flex justify-between items-center py-2">
            <span>{t('Payment:confirmation.plan')}</span>
            <span className="font-medium">{t(`Subscription:plan.${planType}`)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>{t('Payment:confirmation.amount')}</span>
            <span className="font-bold text-lg">{formatCurrency(planPrice, i18n.language === 'tr' ? 'tr-TR' : 'en-US')}</span>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="text-base font-medium mb-2">{t('Payment:confirmation.billingTitle')}</h3>
          <div className="text-sm space-y-1">
            <p className="font-medium">{billingDetails.fullName}</p>
            <p>{billingDetails.email}</p>
            <p>{billingDetails.address as string}</p>
            <p>
              {billingDetails.zipCode && `${billingDetails.zipCode}, `}
              {billingDetails.city}
              {billingDetails.country && `, ${billingDetails.country}`}
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="text-base font-medium mb-2">{t('Payment:confirmation.paymentTitle')}</h3>
          <div className="text-sm space-y-1">
            <p>{t('Payment:confirmation.paymentMethod')}</p>
            <p className="font-medium">{getMaskedCardNumber()}</p>
          </div>
          
          <div className="mt-6 p-3 bg-muted/30 rounded text-sm">
            <p>{t('Payment:confirmation.disclaimer')}</p>
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
              {t('Payment:actions.processing')}
            </>
          ) : (
            t('Payment:actions.confirm')
          )}
        </Button>
      </div>
    </div>
  );
};
