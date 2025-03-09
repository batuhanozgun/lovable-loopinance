
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { CheckCircle2 } from 'lucide-react';
import { useSubscriptionMutation } from '../../../hooks/useSubscriptionMutation';
import { useToast } from '@/hooks/use-toast';
import { subscriptionLogger } from '../../../logging';

interface SuccessStepProps {
  selectedPlan: SubscriptionPlanType;
  onClose: () => void;
  transactionId?: string;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  selectedPlan,
  onClose,
  transactionId
}) => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { updatePlan, isUpdating } = useSubscriptionMutation();
  const { toast } = useToast();
  const [updateAttempted, setUpdateAttempted] = useState(false);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  
  // Ödeme başarılı olduğunda, abonelik planını güncelle
  useEffect(() => {
    // Güncelleme işleminin yalnızca bir kez denenmesini sağla
    if (!updateAttempted) {
      const updateSubscription = async () => {
        try {
          setUpdateAttempted(true);
          subscriptionLogger.debug('Başarılı ödeme sonrası abonelik güncellemesi başlatılıyor', { 
            plan: selectedPlan, 
            transactionId 
          });
          
          const result = await updatePlan(selectedPlan, transactionId);
          
          if (!result) {
            subscriptionLogger.error('Abonelik güncellemesi başarısız oldu', { plan: selectedPlan });
            toast({
              title: t('common:error'),
              description: t('Subscription:errors.update.general'),
              variant: "destructive",
            });
          } else {
            subscriptionLogger.info('Abonelik başarıyla güncellendi', { plan: selectedPlan });
            setUpdateSuccessful(true);
          }
        } catch (error) {
          subscriptionLogger.error('Abonelik güncellenirken beklenmeyen hata', error);
          toast({
            title: t('common:error'),
            description: t('Subscription:errors.update.general'),
            variant: "destructive",
          });
        }
      };
      
      updateSubscription();
    }
  }, [selectedPlan, updatePlan, toast, t, transactionId, updateAttempted]);
  
  // Kullanıcıya gösterilecek buton metnini belirle
  const getButtonText = () => {
    if (isUpdating) {
      return t('Subscription:payment.actions.processing');
    }
    return t('Subscription:payment.actions.done');
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-6">
      <div className="rounded-full bg-primary/10 p-3">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">
          {t('Subscription:payment.success.congratulations')}
        </h3>
        <p className="text-muted-foreground">
          {updateSuccessful 
            ? t('Subscription:payment.success.planActivated', { 
                plan: t(`Subscription:plan.${selectedPlan}`) 
              })
            : t('Subscription:payment.success.processed')}
        </p>
      </div>
      
      <div className="w-full max-w-xs">
        <Button 
          className="w-full" 
          onClick={onClose}
          disabled={isUpdating}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};
