
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const PlansSkeleton: React.FC = () => (
  <div className="container mx-auto p-4 max-w-4xl">
    <div className="mb-6">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-48" />
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  </div>
);
