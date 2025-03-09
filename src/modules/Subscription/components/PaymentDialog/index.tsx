
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { SubscriptionPlanType } from '../../types/ISubscription';
import { PlanSummaryStep } from './steps/PlanSummaryStep';
import { BillingDetailsStep } from './steps/BillingDetailsStep';
import { PaymentDetailsStep } from './steps/PaymentDetailsStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { SuccessStep } from './steps/SuccessStep';
import { StepIndicator } from './components/StepIndicator';
import { useSubscription } from '../../hooks/useSubscription';
import { usePaymentSimulation } from '../../hooks/usePaymentSimulation';
import { subscriptionLogger } from '../../logging';

export interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: SubscriptionPlanType;
}

export type PaymentStep = 'summary' | 'billing' | 'payment' | 'confirmation' | 'success';

export const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedPlan 
}) => {
  const { t } = useTranslation(['Subscription', 'common']);
  const [currentStep, setCurrentStep] = useState<PaymentStep>('summary');
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Türkiye'
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  
  const { updatePlan } = useSubscription();
  const { simulatePayment, isProcessing } = usePaymentSimulation();
  
  // Adımları yönet
  const handleNext = () => {
    const steps: PaymentStep[] = ['summary', 'billing', 'payment', 'confirmation', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      subscriptionLogger.debug('Ödeme adımı değiştirildi', { from: currentStep, to: steps[currentIndex + 1] });
    }
  };
  
  const handleBack = () => {
    const steps: PaymentStep[] = ['summary', 'billing', 'payment', 'confirmation', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      subscriptionLogger.debug('Ödeme adımı değiştirildi', { from: currentStep, to: steps[currentIndex - 1] });
    }
  };
  
  // Ödeme işlemi
  const handleProcessPayment = async () => {
    subscriptionLogger.debug('Ödeme başlatıldı', { plan: selectedPlan });
    
    const result = await simulatePayment(paymentDetails.cardNumber);
    
    if (result.success) {
      subscriptionLogger.debug('Ödeme simülasyonu başarılı, plan güncelleme başlatılıyor');
      await updatePlan(selectedPlan);
      setCurrentStep('success');
    } else {
      subscriptionLogger.error('Ödeme simülasyonu başarısız', { error: result.error });
      // Hata durumunda işleme devam etmiyoruz, kullanıcıya hata gösteriyoruz
    }
  };
  
  // Diyalog kapatıldığında adımları sıfırla
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setCurrentStep('summary');
      }, 300);
    }
    onOpenChange(open);
  };
  
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {currentStep === 'success' 
              ? t('Subscription:payment.success.title') 
              : t('Subscription:payment.title')}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 'success'
              ? t('Subscription:payment.success.description')
              : t('Subscription:payment.description', { plan: t(`Subscription:plan.${selectedPlan}`) })}
          </DialogDescription>
        </DialogHeader>
        
        {currentStep !== 'success' && (
          <StepIndicator currentStep={currentStep} />
        )}
        
        <div className="py-4">
          {currentStep === 'summary' && (
            <PlanSummaryStep 
              selectedPlan={selectedPlan} 
              onNext={handleNext} 
            />
          )}
          
          {currentStep === 'billing' && (
            <BillingDetailsStep 
              billingDetails={billingDetails}
              setBillingDetails={setBillingDetails}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 'payment' && (
            <PaymentDetailsStep 
              paymentDetails={paymentDetails}
              setPaymentDetails={setPaymentDetails}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 'confirmation' && (
            <ConfirmationStep 
              selectedPlan={selectedPlan}
              billingDetails={billingDetails}
              paymentDetails={paymentDetails}
              onBack={handleBack}
              onConfirm={handleProcessPayment}
              isProcessing={isProcessing}
            />
          )}
          
          {currentStep === 'success' && (
            <SuccessStep 
              selectedPlan={selectedPlan}
              onClose={() => handleDialogClose(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
