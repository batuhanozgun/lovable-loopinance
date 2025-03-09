
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';

export const UsageStatsCard: React.FC = () => {
  const { t } = useTranslation(['Subscription']);
  const { isTurkish } = useSubscriptionLocale();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          {t('Subscription:dashboard.usage')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {isTurkish 
              ? "Kullanım istatistikleri yakında eklenecek"
              : "Usage statistics coming soon"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
