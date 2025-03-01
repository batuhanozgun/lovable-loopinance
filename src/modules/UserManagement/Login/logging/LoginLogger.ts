
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class LoginLogger {
  private static instance = LoggerService.getInstance("LoginModule");
  
  static debug(message: string, ...args: any[]) {
    this.instance.debug(message, ...args);
  }
  
  static info(message: string, ...args: any[]) {
    this.instance.info(message, ...args);
  }
  
  static error(message: string, error?: Error | unknown, ...args: any[]) {
    this.instance.error(message, error, ...args);
  }
  
  static warn(message: string, ...args: any[]) {
    this.instance.warn(message, ...args);
  }
}
