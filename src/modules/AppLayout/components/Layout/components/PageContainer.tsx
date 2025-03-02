
import React, { ReactNode } from "react";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  const logger = LoggerService.getInstance("AppLayout.PageContainer");
  
  logger.debug("PageContainer rendered");
  
  return (
    <div className={cn("h-full", className)}>
      {children}
    </div>
  );
};
