
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslation } from 'react-i18next';
import { paymentLogger } from '../../logging';
import { StepIndicator } from './components/StepIndicator';
import { PlanSummaryStep } from './steps/PlanSummaryStep';
import { BillingDetailsStep } from './steps/BillingDetailsStep';
import { PaymentDetailsStep } from './steps/PaymentDetailsStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { SuccessStep } from './steps/SuccessStep';
import { usePaymentSimulation } from '../../hooks/usePaymentSimulation';
import { PaymentStep } from './types';
import { IBillingDetails } from '../../types/IBilling';
import { ICardDetails } from '../../types/IPayment';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: string; // Planın tipi (SubscriptionPlanType'dan gelecek)
  onPaymentComplete?: (transactionId?: string) => void; // Ödeme tamamlandığında çağrılacak
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  selectedPlan,
  onPaymentComplete
}) => {
  const { t } = useTranslation(['Payment', 'Subscription']);
  const [currentStep, setCurrentStep] = useState<PaymentStep>(PaymentStep.SUMMARY);
  const [billingDetails, setBillingDetails] = useState<IBillingDetails>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Turkey'
  });
  
  const [paymentDetails, setPaymentDetails] = useState<ICardDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [transactionId, setTransactionId] = useState<string | undefined>(undefined);
  const { simulatePayment, isProcessing } = usePaymentSimulation();
  
  const handleClose = () => {
    if (currentStep === PaymentStep.SUCCESS) {
      resetForm();
      onOpenChange(false);
      return;
    }
    
    if (confirm(t('Payment:confirmExit'))) {
      resetForm();
      onOpenChange(false);
    }
  };
  
  const resetForm = () => {
    setCurrentStep(PaymentStep.SUMMARY);
    setBillingDetails({
      fullName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      country: 'Turkey'
    });
    setPaymentDetails({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
    setTransactionId(undefined);
  };
  
  const nextStep = () => {
    const steps = [
      PaymentStep.SUMMARY,
      PaymentStep.BILLING,
      PaymentStep.PAYMENT,
      PaymentStep.CONFIRMATION,
      PaymentStep.SUCCESS
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  
  const prevStep = () => {
    const steps = [
      PaymentStep.SUMMARY,
      PaymentStep.BILLING,
      PaymentStep.PAYMENT,
      PaymentStep.CONFIRMATION,
      PaymentStep.SUCCESS
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };
  
  const handlePayment = async () => {
    try {
      paymentLogger.debug('Ödeme işlemi başlatıldı', { 
        selectedPlan,
        cardLastDigits: paymentDetails.cardNumber.slice(-4)
      });
      
      const paymentResult = await simulatePayment(paymentDetails.cardNumber);
      
      if (paymentResult.success) {
        setTransactionId(paymentResult.transactionId);
        
        if (onPaymentComplete) {
          onPaymentComplete(paymentResult.transactionId);
        }
        
        nextStep();
      }
    } catch (error) {
      paymentLogger.error('Ödeme işleminde beklenmeyen hata', error);
    }
  };
  
  // Plan fiyatını hesapla
  const getPlanPrice = () => {
    if (selectedPlan === 'monthly') {
      return 49;
    } else if (selectedPlan === 'yearly') {
      return 39 * 12; // Aylık 39, yıllık toplam
    }
    return 0;
  };
  
  // Plan özelliklerini al
  const getPlanFeatures = () => {
    const baseFeatures = [
      t('Subscription:plans.features.allAccess'),
      t('Subscription:plans.features.unlimitedAccounts'),
      t('Subscription:plans.features.advancedAnalytics'),
    ];
    
    if (selectedPlan === 'yearly') {
      baseFeatures.push(t('Subscription:plans.features.prioritySupport'));
    }
    
    return baseFeatures;
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {currentStep !== PaymentStep.SUCCESS && (
          <StepIndicator currentStep={currentStep} />
        )}
        
        {currentStep === PaymentStep.SUMMARY && (
          <PlanSummaryStep 
            planType={selectedPlan}
            planPrice={getPlanPrice()}
            planFeatures={getPlanFeatures()}
            onNext={nextStep} 
          />
        )}
        
        {currentStep === PaymentStep.BILLING && (
          <BillingDetailsStep 
            billingDetails={billingDetails} 
            setBillingDetails={setBillingDetails} 
            onNext={nextStep} 
            onBack={prevStep} 
          />
        )}
        
        {currentStep === PaymentStep.PAYMENT && (
          <PaymentDetailsStep 
            paymentDetails={paymentDetails} 
            setPaymentDetails={setPaymentDetails} 
            onNext={nextStep} 
            onBack={prevStep} 
          />
        )}
        
        {currentStep === PaymentStep.CONFIRMATION && (
          <ConfirmationStep 
            planType={selectedPlan}
            planPrice={getPlanPrice()}
            billingDetails={billingDetails} 
            paymentDetails={paymentDetails}
            onConfirm={handlePayment}
            onBack={prevStep}
            isProcessing={isProcessing}
          />
        )}
        
        {currentStep === PaymentStep.SUCCESS && (
          <SuccessStep 
            planType={selectedPlan}
            onClose={handleClose}
            transactionId={transactionId}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
