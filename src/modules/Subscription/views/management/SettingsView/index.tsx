
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../../hooks/useSubscription';
import { SubscriptionStatus } from '../../../types/ISubscription';
import { viewsLogger } from '../../../logging';
import { useToast } from '@/hooks/use-toast';
import { PreferencesCard } from './components/PreferencesCard';
import { SubscriptionManagementCard } from './components/SubscriptionManagementCard';
import { CancellationDialog } from './components/CancellationDialog';

export const SubscriptionSettingsView: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading, refreshSubscription } = useSubscription();
  const [autoRenew, setAutoRenew] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik ayarları sayfası görüntülendi');
  }, []);
  
  // Switch'lerin değişimini işle
  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
    toast({
      title: checked 
        ? i18n.language.startsWith('tr') ? 'Otomatik yenileme açık' : 'Auto-renew enabled'
        : i18n.language.startsWith('tr') ? 'Otomatik yenileme kapalı' : 'Auto-renew disabled',
      description: checked
        ? i18n.language.startsWith('tr') ? 'Aboneliğiniz otomatik olarak yenilenecek' : 'Your subscription will renew automatically'
        : i18n.language.startsWith('tr') ? 'Aboneliğiniz otomatik olarak yenilenmeyecek' : 'Your subscription will not renew automatically',
    });
  };
  
  const handleEmailNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked);
    toast({
      title: checked 
        ? i18n.language.startsWith('tr') ? 'E-posta bildirimleri açık' : 'Email notifications enabled'
        : i18n.language.startsWith('tr') ? 'E-posta bildirimleri kapalı' : 'Email notifications disabled',
    });
  };
  
  // Abonelik iptal
  const handleCancelSubscription = () => {
    setCancelDialogOpen(true);
  };
  
  const handleConfirmCancel = (reason: string) => {
    viewsLogger.debug('Abonelik iptal isteği', { reason });
    toast({
      title: i18n.language.startsWith('tr') ? 'Aboneliğiniz iptal edildi' : 'Your subscription has been canceled',
      description: i18n.language.startsWith('tr') 
        ? 'Mevcut dönem sonuna kadar hizmetlerimize erişebilirsiniz' 
        : 'You can access our services until the end of the current period',
    });
    setCancelDialogOpen(false);
    
    // Normalde API çağrısı yapılır
    setTimeout(() => {
      refreshSubscription();
    }, 1000);
  };
  
  // Abonelik yeniden etkinleştirme
  const handleReactivateSubscription = () => {
    viewsLogger.debug('Abonelik yeniden etkinleştirme isteği');
    toast({
      title: i18n.language.startsWith('tr') ? 'Aboneliğiniz yeniden etkinleştirildi' : 'Your subscription has been reactivated',
      description: i18n.language.startsWith('tr')
        ? 'Aboneliğiniz yeniden etkinleştirildi ve tüm özelliklere erişebilirsiniz'
        : 'Your subscription has been reactivated and you can access all features',
    });
    
    // Normalde API çağrısı yapılır
    setTimeout(() => {
      refreshSubscription();
    }, 1000);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('Subscription:settings.title')}</h1>
        <p className="text-muted-foreground">{t('Subscription:description')}</p>
      </div>
      
      <div className="space-y-6">
        <PreferencesCard 
          autoRenew={autoRenew}
          emailNotifications={emailNotifications}
          onAutoRenewChange={handleAutoRenewChange}
          onEmailNotificationsChange={handleEmailNotificationsChange}
        />
        
        <SubscriptionManagementCard 
          status={subscription?.status || null}
          onCancel={handleCancelSubscription}
          onReactivate={handleReactivateSubscription}
        />
      </div>
      
      <CancellationDialog 
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};
