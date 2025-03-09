
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SuccessStepProps {
  planType: string;
  transactionId?: string;
  onClose: () => void;
  isError?: boolean;
  errorMessage?: string;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  planType,
  transactionId,
  onClose,
  isError = false,
  errorMessage
}) => {
  const { t } = useTranslation(['Payment', 'common', 'Subscription']);
  
  return (
    <div className="space-y-6 text-center">
      {!isError ? (
        <>
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {t('Payment:success.congratulations')}
            </h2>
            <p className="text-muted-foreground">
              {t('Payment:success.paymentComplete')}
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <p className="mb-2 font-medium">
                {t('Payment:success.planActivated', { 
                  plan: t(`Subscription:plan.${planType}`) 
                })}
              </p>
              
              {transactionId && (
                <p className="text-sm text-muted-foreground">
                  {t('Payment:transaction.id')}: {transactionId}
                </p>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {t('Payment:success.partialSuccess')}
            </h2>
            <p className="text-muted-foreground">
              {t('Payment:success.errorActivating')}
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {t('Payment:success.tryAgainLater')}
              </p>
              
              {errorMessage && (
                <p className="text-xs text-destructive mt-2">
                  {t('Payment:success.errorDetails')}: {errorMessage}
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
      
      <div className="pt-4">
        <Button onClick={onClose} className="min-w-[120px]">
          {t('Payment:actions.done')}
        </Button>
      </div>
    </div>
  );
};
