
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/modules/UserManagement/Subscription/hooks/useSubscription';

export const SubscriptionInfo: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { subscription, isLoading, daysRemaining, isTrial, isActive, isExpired } = useSubscription();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Abonelik Bilgisi</CardTitle>
          <CardDescription>Abonelik durumunuz yükleniyor...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-20 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Abonelik Bilgisi</CardTitle>
          <CardDescription>Abonelik bilgisi bulunamadı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Abonelik bilgileriniz şu anda görüntülenemiyor. Lütfen daha sonra tekrar deneyin.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = () => {
    if (isTrial) return <Badge className="bg-blue-500">Deneme</Badge>;
    if (isActive && subscription.plan_type === 'monthly') return <Badge className="bg-green-500">Aylık Abonelik</Badge>;
    if (isActive && subscription.plan_type === 'yearly') return <Badge className="bg-green-700">Yıllık Abonelik</Badge>;
    if (isExpired) return <Badge variant="destructive">Süresi Dolmuş</Badge>;
    return <Badge variant="outline">Bilinmiyor</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Abonelik Bilgisi</CardTitle>
            <CardDescription>Mevcut abonelik durumunuz</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isTrial && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Deneme süresi bitiş tarihi:</span>
                <span className="font-medium">{formatDate(subscription.trial_ends_at)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Kalan gün:</span>
                <span className="font-medium">
                  {daysRemaining} gün
                </span>
              </div>
              <div className="mt-6">
                <Button className="w-full" variant="default" asChild>
                  <Link to="/pricing">Aboneliğe Geç</Link>
                </Button>
              </div>
            </>
          )}

          {isActive && !isTrial && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Abonelik tipi:</span>
                <span className="font-medium">
                  {subscription.plan_type === 'monthly' ? 'Aylık' : 'Yıllık'}
                </span>
              </div>
              {subscription.current_period_ends_at && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Yenileme tarihi:</span>
                    <span className="font-medium">{formatDate(subscription.current_period_ends_at)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Kalan gün:</span>
                    <span className="font-medium">
                      {daysRemaining} gün
                    </span>
                  </div>
                </>
              )}
              <div className="mt-6">
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/subscription/manage">Aboneliği Yönet</Link>
                </Button>
              </div>
            </>
          )}

          {isExpired && (
            <>
              <p className="text-destructive font-medium">
                Aboneliğinizin süresi dolmuştur. Uygulamaya erişim için lütfen aboneliğinizi yenileyin.
              </p>
              <div className="mt-6">
                <Button className="w-full" variant="default" asChild>
                  <Link to="/pricing">Aboneliği Yenile</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
