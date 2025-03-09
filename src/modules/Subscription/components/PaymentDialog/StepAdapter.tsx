
import React from 'react';
import { 
  PaymentDialog, 
  PaymentStep 
} from '@/modules/Payment';
import { SubscriptionPlanType } from '../types/ISubscription';
import { useSubscriptionMutation } from '../hooks/useSubscriptionMutation';
import { subscriptionLogger } from '../logging';

interface SubscriptionPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: SubscriptionPlanType;
}

/**
 * Subscription modülüne özgü ödeme diyaloğu adaptörü
 * Payment modülündeki PaymentDialog'u kullanır ve Subscription modülüne uyarlar
 */
export const SubscriptionPaymentDialog: React.FC<SubscriptionPaymentDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedPlan 
}) => {
  const { updatePlan } = useSubscriptionMutation();
  
  // Ödeme tamamlandığında aboneliği güncelle
  const handlePaymentComplete = async (transactionId?: string) => {
    try {
      subscriptionLogger.debug('Ödeme tamamlandı, abonelik güncelleniyor', { 
        selectedPlan, 
        transactionId 
      });
      
      // Abonelik planını güncelle
      const result = await updatePlan(selectedPlan, transactionId);
      
      if (!result.success) {
        subscriptionLogger.error('Abonelik planı güncellenemedi', { 
          error: result.error, 
          selectedPlan 
        });
      }
    } catch (error) {
      subscriptionLogger.error('Abonelik güncelleme hatası', { error });
    }
  };
  
  // Plan tipini string olarak dönüştür
  const planTypeString = selectedPlan.toLowerCase();
  
  return (
    <PaymentDialog
      open={open}
      onOpenChange={onOpenChange}
      selectedPlan={planTypeString}
      onPaymentComplete={handlePaymentComplete}
    />
  );
};
