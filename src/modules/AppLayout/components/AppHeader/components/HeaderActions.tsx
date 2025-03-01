
import React from 'react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderActionsProps {
  className?: string;
  pageActions?: React.ReactNode;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ className, pageActions }) => {
  return (
    <div className={cn('flex items-center flex-shrink-0 gap-2', className)}>
      {pageActions && (
        <div className="mr-2">
          {pageActions}
        </div>
      )}
      
      <div className="flex items-center space-x-1">
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </div>
  );
};
