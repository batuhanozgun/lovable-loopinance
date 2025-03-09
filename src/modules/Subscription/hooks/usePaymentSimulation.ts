
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { subscriptionLogger } from '../logging';

interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}

export const usePaymentSimulation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation(['Subscription', 'common']);

  // Basit bir ödeme simülasyonu
  const simulatePayment = async (cardNumber: string): Promise<PaymentResult> => {
    try {
      setIsProcessing(true);
      subscriptionLogger.debug('Ödeme simülasyonu başlatıldı', { cardLastDigits: cardNumber.slice(-4) });
      
      // Gerçek bir ödeme işlemi olacağından, biraz gecikme ekleyelim
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Test kart numaraları için farklı senaryolar simüle edelim
      // 4111 ile başlayan kartlar başarılı, 4242 ile başlayanlar başarısız olsun
      const cardWithoutSpaces = cardNumber.replace(/\s/g, '');
      
      if (cardWithoutSpaces.startsWith('4242')) {
        subscriptionLogger.debug('Test başarısız kart numarası algılandı');
        toast({
          title: t('common:error'),
          description: t('Subscription:payment.errors.declined'),
          variant: "destructive",
        });
        return { success: false, error: 'card_declined' };
      }
      
      // Başarılı işlem
      const transactionId = `tr_${Math.random().toString(36).substring(2, 15)}`;
      subscriptionLogger.debug('Ödeme simülasyonu başarılı', { transactionId });
      
      toast({
        title: t('common:success'),
        description: t('Subscription:payment.success.processed'),
      });
      
      return { 
        success: true,
        transactionId
      };
    } catch (error) {
      subscriptionLogger.error('Ödeme simülasyonu hatası', error);
      
      toast({
        title: t('common:error'),
        description: t('Subscription:payment.errors.general'),
        variant: "destructive",
      });
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'unexpected_error'
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    simulatePayment,
    isProcessing
  };
};
