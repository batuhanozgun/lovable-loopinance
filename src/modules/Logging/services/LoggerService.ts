
import { ConsoleLoggerService } from "./ConsoleLoggerService";
import { ILogger } from "../interfaces/ILogger";

export class LoggerService implements ILogger {
  private static instance: LoggerService;
  private loggers: ILogger[] = [];

  private constructor() {
    // ConsoleLogger'ı varsayılan olarak ekle
    this.loggers.push(ConsoleLoggerService);
  }

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  info(message: string, ...args: any[]) {
    this.loggers.forEach((logger) => logger.info(message, ...args));
  }

  error(message: string, error?: Error | unknown, ...args: any[]) {
    this.loggers.forEach((logger) => logger.error(message, error, ...args));
  }

  warn(message: string, ...args: any[]) {
    this.loggers.forEach((logger) => logger.warn(message, ...args));
  }

  debug(message: string, ...args: any[]) {
    this.loggers.forEach((logger) => logger.debug(message, ...args));
  }

  addLogger(logger: ILogger) {
    this.loggers.push(logger);
  }
}
