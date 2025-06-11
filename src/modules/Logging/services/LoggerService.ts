
import { ConsoleLoggerService } from "./ConsoleLoggerService";
import { ILogger } from "../interfaces/ILogger";

export class LoggerService implements ILogger {
  /**
   * Separate logger instances are kept per context to avoid
   * accidentally overriding the context value when multiple modules
   * request a logger. Each context returns the same instance on
   * subsequent calls.
   */
  private static instances: Map<string, LoggerService> = new Map();
  private loggers: ILogger[] = [];
  private context: string;

  private constructor(context = '') {
    this.context = context;
    this.loggers.push(new ConsoleLoggerService());
  }

  static getInstance(context = ''): LoggerService {
    if (!LoggerService.instances.has(context)) {
      LoggerService.instances.set(context, new LoggerService(context));
    }
    return LoggerService.instances.get(context)!;
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
