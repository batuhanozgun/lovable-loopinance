
import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  gradient?: boolean;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  children,
  actions,
  breadcrumbs,
  gradient = false,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "w-full py-6 px-4 md:px-8 border-b",
        gradient && "bg-gradient-to-r from-background via-background/80 to-background",
        "transition-all duration-200",
        className
      )}
    >
      {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center flex-shrink-0 gap-2 mt-2 md:mt-0">
            {actions}
          </div>
        )}
      </div>
      
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
