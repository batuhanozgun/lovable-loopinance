
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useSubscription } from '../hooks/useSubscription';

export const ExpiredSubscriptionView: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <Card className="border-destructive">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-destructive">Abonelik Süresi Doldu</CardTitle>
          <CardDescription>
            {subscription?.status === 'trial' 
              ? 'Deneme süreniz sona ermiştir.' 
              : 'Aboneliğinizin süresi sona ermiştir.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>
            Uygulamaya erişim için lütfen aboneliğinizi yenileyin veya yeni bir abonelik planı seçin.
          </p>

          <div className="my-8 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Neden Abonelik Gerekiyor?</h3>
            <p className="text-muted-foreground">
              Uygulamamızı sürekli geliştirmek, yeni özellikler eklemek ve size en iyi hizmeti sunmak için kullanıcılarımızın desteğine ihtiyacımız var.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link to="/pricing">Abonelik Planlarını Görüntüle</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mt-2">
            Sorularınız için <Link to="/contact" className="underline text-primary">bizimle iletişime geçin</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
