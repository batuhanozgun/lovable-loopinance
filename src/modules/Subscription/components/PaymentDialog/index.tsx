
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StepIndicator } from './components/StepIndicator';
import { PlanSummaryStep } from './steps/PlanSummaryStep';
import { BillingDetailsStep } from './steps/BillingDetailsStep';
import { PaymentDetailsStep } from './steps/PaymentDetailsStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { SuccessStep } from './steps/SuccessStep';
import { usePaymentSimulation } from '../../hooks/usePaymentSimulation';
import { SubscriptionPlanType } from '../../types/ISubscription';
import { subscriptionLogger } from '../../logging';
import { PaymentStep } from './types';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: SubscriptionPlanType;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  selectedPlan
}) => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>(PaymentStep.SUMMARY);
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Turkey'
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [transactionId, setTransactionId] = useState<string | undefined>(undefined);
  const { simulatePayment, isProcessing } = usePaymentSimulation();
  
  const handleClose = () => {
    if (currentStep === PaymentStep.SUCCESS) {
      onOpenChange(false);
      return;
    }
    
    if (confirm('Ödeme işleminden çıkmak istediğinize emin misiniz?')) {
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
      onOpenChange(false);
    }
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
      subscriptionLogger.debug('Ödeme işlemi başlatıldı', { 
        selectedPlan,
        cardLastDigits: paymentDetails.cardNumber.slice(-4)
      });
      
      const paymentResult = await simulatePayment(paymentDetails.cardNumber);
      
      if (paymentResult.success) {
        setTransactionId(paymentResult.transactionId);
        nextStep();
      }
    } catch (error) {
      subscriptionLogger.error('Ödeme işleminde beklenmeyen hata', error);
    }
  };
  
  const dialogTitle = () => {
    switch (currentStep) {
      case PaymentStep.SUMMARY:
        return 'Plan Özeti';
      case PaymentStep.BILLING:
        return 'Fatura Bilgileri';
      case PaymentStep.PAYMENT:
        return 'Ödeme Bilgileri';
      case PaymentStep.CONFIRMATION:
        return 'Onay';
      case PaymentStep.SUCCESS:
        return 'Ödeme Başarılı';
      default:
        return 'Ödeme';
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {currentStep !== PaymentStep.SUCCESS && (
          <StepIndicator currentStep={currentStep} />
        )}
        
        {currentStep === PaymentStep.SUMMARY && (
          <PlanSummaryStep 
            selectedPlan={selectedPlan} 
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
            billingDetails={billingDetails} 
            paymentDetails={paymentDetails} 
            selectedPlan={selectedPlan} 
            onConfirm={handlePayment}
            onBack={prevStep}
            isProcessing={isProcessing}
          />
        )}
        
        {currentStep === PaymentStep.SUCCESS && (
          <SuccessStep 
            selectedPlan={selectedPlan} 
            onClose={handleClose}
            transactionId={transactionId}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
