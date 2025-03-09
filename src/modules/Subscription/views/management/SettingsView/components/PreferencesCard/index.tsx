
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface PreferencesCardProps {
  autoRenew: boolean;
  emailNotifications: boolean;
  onAutoRenewChange: (checked: boolean) => void;
  onEmailNotificationsChange: (checked: boolean) => void;
}

export const PreferencesCard: React.FC<PreferencesCardProps> = ({
  autoRenew,
  emailNotifications,
  onAutoRenewChange,
  onEmailNotificationsChange
}) => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const isturkish = i18n.language.startsWith('tr');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isturkish ? 'Abonelik Tercihleri' : 'Subscription Preferences'}</CardTitle>
        <CardDescription>
          {isturkish 
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
                {isturkish
                  ? 'Aboneliğiniz otomatik olarak yenilenecek'
                  : 'Your subscription will automatically renew'}
              </p>
            </div>
            <Switch
              id="auto-renew"
              checked={autoRenew}
              onCheckedChange={onAutoRenewChange}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">{t('Subscription:settings.notifications')}</Label>
              <p className="text-sm text-muted-foreground">
                {isturkish
                  ? 'Abonelik ve fatura ile ilgili e-posta bildirimleri alın'
                  : 'Receive email notifications about your subscription and billing'}
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={onEmailNotificationsChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
