
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * İşlemler yüklenirken gösterilecek yükleme iskeleti
 */
export const TransactionsLoadingSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between py-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
