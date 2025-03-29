
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface LoadingSkeletonProps {
  count?: number;
}

/**
 * Nakit hesaplar yüklenirken gösterilecek iskelet bileşeni
 */
export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </CardHeader>
          
          <CardContent className="pb-2 flex-grow">
            <div className="space-y-1">
              <Skeleton className="h-4 w-1/3 mb-1" />
              <Skeleton className="h-8 w-2/3" />
            </div>
          </CardContent>
          
          <CardFooter className="pt-2">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
