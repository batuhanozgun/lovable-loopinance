
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { viewsLogger } from '../../logging';
import { SubscriptionStatus } from '../../types/ISubscription';
import { useToast } from '@/hooks/use-toast';

export const SubscriptionSettingsView: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading, refreshSubscription } = useSubscription();
  const [autoRenew, setAutoRenew] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
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
    viewsLogger.debug('Abonelik iptal isteği', { reason: cancellationReason });
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
        {/* Otomatik Yenileme */}
        <Card>
          <CardHeader>
            <CardTitle>{i18n.language.startsWith('tr') ? 'Abonelik Tercihleri' : 'Subscription Preferences'}</CardTitle>
            <CardDescription>
              {i18n.language.startsWith('tr') 
                ? 'Aboneliğinizin nasıl yönetileceğini yapılandırın'
                : 'Configure how your subscription is managed'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-renew">{t('Subscription:settings.autoRenew')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {i18n.language.startsWith('tr')
                      ? 'Aboneliğiniz otomatik olarak yenilenecek'
                      : 'Your subscription will automatically renew'}
                  </p>
                </div>
                <Switch
                  id="auto-renew"
                  checked={autoRenew}
                  onCheckedChange={handleAutoRenewChange}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">{t('Subscription:settings.notifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {i18n.language.startsWith('tr')
                      ? 'Abonelik ve fatura ile ilgili e-posta bildirimleri alın'
                      : 'Receive email notifications about your subscription and billing'}
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={handleEmailNotificationsChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Abonelik İptal/Yeniden Etkinleştirme */}
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">
              {i18n.language.startsWith('tr') ? 'Abonelik Yönetimi' : 'Subscription Management'}
            </CardTitle>
            <CardDescription>
              {i18n.language.startsWith('tr')
                ? 'Aboneliğinizi iptal etmek veya yeniden etkinleştirmek için bu bölümü kullanın'
                : 'Use this section to cancel or reactivate your subscription'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              {subscription?.status === SubscriptionStatus.CANCELED
                ? i18n.language.startsWith('tr')
                  ? 'Aboneliğiniz iptal edildi. Mevcut dönem sonuna kadar hizmetlerimize erişebilirsiniz.'
                  : 'Your subscription has been canceled. You can access our services until the end of the current period.'
                : i18n.language.startsWith('tr')
                  ? 'Aboneliğinizi iptal ederseniz, mevcut dönemin sonuna kadar hizmetlerimize erişebilirsiniz. İptal işleminden sonra yeni fatura oluşturulmayacaktır.'
                  : 'If you cancel your subscription, you can access our services until the end of the current period. No new invoice will be created after cancellation.'}
            </p>
          </CardContent>
          <CardFooter>
            {subscription?.status === SubscriptionStatus.CANCELED ? (
              <Button
                variant="default"
                onClick={handleReactivateSubscription}
              >
                {t('Subscription:settings.reactivateSubscription')}
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => setCancelDialogOpen(true)}
              >
                {t('Subscription:settings.cancelSubscription')}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      {/* İptal Onay Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Subscription:settings.confirmCancel')}</AlertDialogTitle>
            <AlertDialogDescription>
              {i18n.language.startsWith('tr')
                ? 'Aboneliğiniz iptal edildiğinde, mevcut dönemin sonuna kadar hizmetlerimize erişebilirsiniz. İptal işleminden sonra yeni fatura oluşturulmayacaktır.'
                : 'When your subscription is canceled, you can access our services until the end of the current period. No new invoice will be created after cancellation.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <Label htmlFor="cancel-reason" className="mb-2 block">
              {t('Subscription:settings.cancellationReason')}
            </Label>
            <Textarea
              id="cancel-reason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder={i18n.language.startsWith('tr') ? 'İptal etme nedeniniz (isteğe bağlı)' : 'Your reason for cancellation (optional)'}
              className="min-h-[100px]"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t('common:cancel')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelSubscription}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('Subscription:settings.cancelSubscription')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
