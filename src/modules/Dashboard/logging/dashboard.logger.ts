
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export const DashboardLogger = {
  getInstance: (context: string) => {
    return LoggerService.getInstance(`Dashboard.${context}`);
  }
};
