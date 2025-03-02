
import React, { ReactNode } from "react";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { useSidebarContext } from "../../Sidebar/context/SidebarContext";
import { useSidebarResize } from "../../Sidebar/hooks/useSidebarResize";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  const logger = LoggerService.getInstance("AppLayout.PageContainer");
  const { isExpanded, isMobile } = useSidebarContext();
  const { effectiveWidth } = useSidebarResize();
  
  logger.debug("PageContainer rendered", { isExpanded, isMobile });
  
  return (
    <div 
      className={cn(className)}
      style={{
        // Desktop modda sidebar genişliği kadar padding ekle
        // Mobilden düşük genişliklerde padding kaldır
        paddingLeft: !isMobile ? effectiveWidth : undefined,
      }}
    >
      {children}
    </div>
  );
};
