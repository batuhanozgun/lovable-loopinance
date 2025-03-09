
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const BillingSkeleton: React.FC = () => (
  <div className="container mx-auto p-4 max-w-4xl">
    <div className="mb-6">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-48" />
    </div>
    
    <Skeleton className="h-10 w-full mb-4" />
    <Skeleton className="h-64 w-full" />
  </div>
);
