
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { paymentLogger } from '../logging';
import { isTestCard } from '../utils/cardUtils';
import { PaymentStatus } from '../types/IPayment';
import { IPaymentResult } from '../types/IPaymentResponse';

/**
 * Test amaçlı ödeme simülasyonu hook'u
 */
export const usePaymentSimulation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation(['Payment', 'common']);

  // Basit bir ödeme simülasyonu
  const simulatePayment = async (cardNumber: string): Promise<IPaymentResult> => {
    try {
      setIsProcessing(true);
      paymentLogger.debug('Ödeme simülasyonu başlatıldı', { cardLastDigits: cardNumber.slice(-4) });
      
      // Gerçek bir ödeme işlemi olacağından, biraz gecikme ekleyelim
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Test kart numaraları için farklı senaryolar simüle edelim
      // 4111 ile başlayan kartlar başarılı, 4242 ile başlayanlar başarısız olsun
      const cardWithoutSpaces = cardNumber.replace(/\s/g, '');
      
      if (cardWithoutSpaces.startsWith('4242')) {
        paymentLogger.debug('Test başarısız kart numarası algılandı');
        toast({
          title: t('common:error'),
          description: t('Payment:errors.card.declined'),
          variant: "destructive",
        });
        
        return { 
          success: false, 
          status: PaymentStatus.FAILED,
          error: {
            code: 'card_declined',
            message: t('Payment:errors.card.declined')
          }
        };
      }
      
      // Başarılı işlem
      const transactionId = `tr_${Math.random().toString(36).substring(2, 15)}`;
      paymentLogger.debug('Ödeme simülasyonu başarılı', { transactionId });
      
      toast({
        title: t('common:success'),
        description: t('Payment:success.processed'),
      });
      
      return { 
        success: true,
        status: PaymentStatus.COMPLETED,
        transactionId,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      paymentLogger.error('Ödeme simülasyonu hatası', error);
      
      toast({
        title: t('common:error'),
        description: t('Payment:errors.general'),
        variant: "destructive",
      });
      
      return { 
        success: false,
        status: PaymentStatus.FAILED,
        error: {
          code: 'unexpected_error',
          message: error instanceof Error ? error.message : 'unexpected_error'
        }
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
