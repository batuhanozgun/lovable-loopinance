
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
    <div className={cn('flex items-center flex-shrink-0 gap-2 w-full justify-end', className)}>
      {pageActions && (
        <div className="mr-auto">
          {pageActions}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </div>
  );
};
