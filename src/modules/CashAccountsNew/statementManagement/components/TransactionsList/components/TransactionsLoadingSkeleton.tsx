
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * İşlemler yüklenirken gösterilecek yükleme iskeleti
 */
export const TransactionsLoadingSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center px-4 py-3">
        <CardTitle className="text-base"><Skeleton className="h-5 w-28" /></CardTitle>
        <div className="flex space-x-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-20" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex justify-between py-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
