
import { ConsoleLoggerService } from "./ConsoleLoggerService";
import { ILogger } from "../interfaces/ILogger";

export class LoggerService implements ILogger {
  private static instance: LoggerService;
  private loggers: ILogger[] = [];
  private context: string = '';

  private constructor() {
    this.loggers.push(ConsoleLoggerService);
  }

  static getInstance(context?: string): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    if (context) {
      LoggerService.instance.setContext(context);
    }
    return LoggerService.instance;
  }

  setContext(context: string): void {
    this.context = context;
  }

  private formatMessage(message: string): string {
    return this.context ? `[${this.context}] ${message}` : message;
  }

  info(message: string, ...args: any[]) {
    this.loggers.forEach((logger) => logger.info(this.formatMessage(message), ...args));
  }

  error(message: string, error?: Error | unknown, ...args: any[]) {
    this.loggers.forEach((logger) => logger.error(this.formatMessage(message), error, ...args));
  }

  warn(message: string, ...args: any[]) {
    this.loggers.forEach((logger) => logger.warn(this.formatMessage(message), ...args));
  }

  debug(message: string, ...args: any[]) {
    this.loggers.forEach((logger) => logger.debug(this.formatMessage(message), ...args));
  }

  addLogger(logger: ILogger) {
    this.loggers.push(logger);
  }
}
