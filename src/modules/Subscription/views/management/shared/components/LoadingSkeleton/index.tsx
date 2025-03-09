
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const DashboardSkeleton: React.FC = () => (
  <div className="container mx-auto p-4 max-w-4xl">
    <div className="mb-6">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-48" />
    </div>
    
    <div className="grid md:grid-cols-2 gap-6">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  </div>
);

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

export const SettingsSkeleton: React.FC = () => (
  <div className="container mx-auto p-4 max-w-4xl">
    <div className="mb-6">
      <Skeleton className="h-8 w-64 mb-2" />
      <Skeleton className="h-4 w-48" />
    </div>
    
    <div className="space-y-6">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  </div>
);
