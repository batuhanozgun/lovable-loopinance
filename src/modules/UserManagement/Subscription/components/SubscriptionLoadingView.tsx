
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Abonelik yükleme durumunu gösteren bileşen
 */
export const SubscriptionLoadingView: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-muted-foreground">Abonelik bilgileri yükleniyor...</p>
      </div>
    </div>
  );
};
