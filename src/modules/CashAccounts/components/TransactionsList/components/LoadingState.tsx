
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
};
