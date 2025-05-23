import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { SubscriptionPlanType } from '../../../types/ISubscription';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { useSubscriptionMutation } from '../../../hooks/useSubscriptionMutation';
import { useToast } from '@/hooks/use-toast';
import { subscriptionLogger } from '../../../logging';
import { useSessionUser } from '../../../hooks/useSessionUser';

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
  const { userId, refreshUserSession, isSessionLoading } = useSessionUser();
  const { toast } = useToast();
  const [updateAttempted, setUpdateAttempted] = useState(false);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [sessionRetryAttempted, setSessionRetryAttempted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    if (!updateAttempted) {
      const updateSubscription = async () => {
        try {
          if (!userId && !sessionRetryAttempted) {
            subscriptionLogger.debug('Oturum bilgisi eksik, yenileniyor');
            setSessionRetryAttempted(true);
            await refreshUserSession(true);
            return;
          }
          
          if (!userId && sessionRetryAttempted) {
            const errorMsg = t('Subscription:errors.session.missing');
            subscriptionLogger.error('Oturum bilgisi yenileme sonrası da bulunamadı');
            toast({
              title: t('common:error'),
              description: errorMsg,
              variant: "destructive",
            });
            setUpdateAttempted(true);
            setUpdateError(errorMsg);
            return;
          }
          
          setUpdateAttempted(true);
          subscriptionLogger.debug('Başarılı ödeme sonrası abonelik güncellemesi başlatılıyor', { 
            plan: selectedPlan, 
            transactionId,
            userId: userId || 'bilinmiyor',
            retryCount
          });
          
          const result = await updatePlan(selectedPlan, transactionId);
          
          if (!result.success) {
            let errorMsg = result.error || t('Subscription:errors.update.general');
            let shouldRetry = false;
            
            if (errorMsg.includes('errors.update.rlsViolation') || 
                errorMsg.includes('errors.repository.permissionDenied') ||
                errorMsg.includes('42501')) {
              errorMsg = t('Subscription:errors.update.permissionDenied');
              subscriptionLogger.warn('RLS ihlali tespit edildi, kullanıcı dostu mesaj gösteriliyor', {
                originalError: result.error
              });
            }
            
            if (errorMsg.includes('406') && retryCount < 2) {
              shouldRetry = true;
              setRetryCount(prev => prev + 1);
              setUpdateAttempted(false);
              
              subscriptionLogger.warn('406 hatası alındı, abonelik güncellemesi tekrar denenecek', {
                plan: selectedPlan,
                userId: userId || 'bilinmiyor',
                nextRetryCount: retryCount + 1
              });
              
              setTimeout(() => {
                setUpdateAttempted(false);
              }, 800);
              
              return;
            }
            
            subscriptionLogger.error('Abonelik güncellemesi başarısız oldu', { 
              plan: selectedPlan,
              userId: userId || 'bilinmiyor',
              error: result.error,
              retryCount
            });
            
            if (!shouldRetry) {
              toast({
                title: t('common:error'),
                description: errorMsg,
                variant: "destructive",
              });
              setUpdateError(errorMsg);
            }
          } else {
            subscriptionLogger.info('Abonelik başarıyla güncellendi', { 
              plan: selectedPlan,
              userId: userId || 'bilinmiyor',
              retryCount
            });
            setUpdateSuccessful(true);
            setRetryCount(0);
            toast({
              title: t('common:success'),
              description: t('Subscription:subscription.plan.updated', { 
                plan: t(`Subscription:plan.${selectedPlan}`) 
              }),
            });
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : t('Subscription:errors.update.general');
          subscriptionLogger.error('Abonelik güncellenirken beklenmeyen hata', {
            error,
            retryCount
          });
          toast({
            title: t('common:error'),
            description: errorMsg,
            variant: "destructive",
          });
          setUpdateError(errorMsg);
        }
      };
      
      if (!isSessionLoading) {
        updateSubscription();
      }
    }
  }, [selectedPlan, updatePlan, toast, t, transactionId, updateAttempted, 
      userId, refreshUserSession, sessionRetryAttempted, isSessionLoading, retryCount]);
  
  const getButtonText = () => {
    if (isUpdating || isSessionLoading) {
      return t('Subscription:payment.actions.processing');
    }
    return t('Subscription:payment.actions.done');
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-6">
      <div className="rounded-full bg-primary/10 p-3">
        {updateError ? (
          <AlertTriangle className="h-12 w-12 text-amber-500" />
        ) : (
          <CheckCircle2 className="h-12 w-12 text-primary" />
        )}
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">
          {updateError 
            ? t('Subscription:payment.success.partialSuccess')
            : t('Subscription:payment.success.congratulations')}
        </h3>
        <p className="text-muted-foreground">
          {updateSuccessful 
            ? t('Subscription:payment.success.planActivated', { 
                plan: t(`Subscription:plan.${selectedPlan}`) 
              })
            : updateError
              ? t('Subscription:payment.success.paymentComplete')
              : t('Subscription:payment.success.processed')}
        </p>
        
        {updateError && (
          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
            <p className="font-medium mb-1">{t('Subscription:payment.success.errorActivating')}</p>
            <p>{t('Subscription:payment.success.tryAgainLater')}</p>
            <p className="text-xs mt-2">{t('Subscription:payment.success.errorDetails')}: {updateError}</p>
          </div>
        )}
      </div>
      
      <div className="w-full max-w-xs">
        <Button 
          className="w-full" 
          onClick={onClose}
          disabled={isUpdating || isSessionLoading}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};
