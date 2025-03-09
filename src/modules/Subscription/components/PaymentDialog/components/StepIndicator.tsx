
import React from 'react';
import { PaymentStep } from '../index';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: PaymentStep;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const { t } = useTranslation(['Subscription']);
  
  const steps = [
    { id: 'summary', label: t('Subscription:payment.steps.summary') },
    { id: 'billing', label: t('Subscription:payment.steps.billing') },
    { id: 'payment', label: t('Subscription:payment.steps.payment') },
    { id: 'confirmation', label: t('Subscription:payment.steps.confirmation') },
  ];
  
  const getStepStatus = (stepId: string) => {
    const stepOrder = ['summary', 'billing', 'payment', 'confirmation'];
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
              currentStep === 'summary' ? 0 : 
              currentStep === 'billing' ? 33 : 
              currentStep === 'payment' ? 66 : 100
            }%` 
          }}
        ></div>
      </div>
    </div>
  );
};
