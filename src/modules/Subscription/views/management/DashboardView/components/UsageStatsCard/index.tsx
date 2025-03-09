
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export const UsageStatsCard: React.FC = () => {
  const { i18n } = useTranslation(['Subscription']);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          {i18n.t('Subscription:dashboard.usage')}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {i18n.language.startsWith('tr') 
              ? "Kullanım istatistikleri yakında eklenecek"
              : "Usage statistics coming soon"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
