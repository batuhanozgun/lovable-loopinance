
import { ILogger } from "../interfaces/ILogger";

export class ConsoleLoggerService implements ILogger {
  info(message: string, ...args: any[]): void {
    console.info(`[INFO][${new Date().toISOString()}] ${message}`, ...args);
  }

  error(message: string, error?: Error | unknown, ...args: any[]): void {
    const errorMessage = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;
    
    console.error(
      `[ERROR][${new Date().toISOString()}] ${message}`,
      {
        error: errorMessage,
        stack,
        ...args
      }
    );
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN][${new Date().toISOString()}] ${message}`, ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG][${new Date().toISOString()}] ${message}`, ...args);
    }
  }
}
