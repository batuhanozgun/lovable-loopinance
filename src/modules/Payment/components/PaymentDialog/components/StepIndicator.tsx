
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { PaymentStep } from '../types';

interface StepIndicatorProps {
  currentStep: PaymentStep;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const { t } = useTranslation(['Payment']);
  
  const steps = [
    { id: PaymentStep.SUMMARY, label: t('Payment:steps.summary') },
    { id: PaymentStep.BILLING, label: t('Payment:steps.billing') },
    { id: PaymentStep.PAYMENT, label: t('Payment:steps.payment') },
    { id: PaymentStep.CONFIRMATION, label: t('Payment:steps.confirmation') },
  ];
  
  const getStepStatus = (stepId: PaymentStep) => {
    const stepOrder = [PaymentStep.SUMMARY, PaymentStep.BILLING, PaymentStep.PAYMENT, PaymentStep.CONFIRMATION];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };
  
  return (
    <div className="w-full py-2">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  status === 'completed' && "bg-primary text-primary-foreground",
                  status === 'current' && "border-2 border-primary bg-background text-primary",
                  status === 'upcoming' && "border border-muted bg-muted/20 text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
              <div className="text-xs mt-1 text-center hidden sm:block">
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 relative hidden sm:block">
        <div className="absolute top-0 h-1 bg-muted w-full"></div>
        <div 
          className="absolute top-0 h-1 bg-primary transition-all duration-300"
          style={{ 
            width: `${
              currentStep === PaymentStep.SUMMARY ? 0 : 
              currentStep === PaymentStep.BILLING ? 33 : 
              currentStep === PaymentStep.PAYMENT ? 66 : 100
            }%` 
          }}
        ></div>
      </div>
    </div>
  );
};
