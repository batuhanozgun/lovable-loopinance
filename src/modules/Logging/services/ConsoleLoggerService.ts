
export class ConsoleLoggerService {
  static info(message: string, ...args: any[]) {
    console.info(`[INFO][${new Date().toISOString()}] ${message}`, ...args);
  }

  static error(message: string, error?: Error | unknown, ...args: any[]) {
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

  static warn(message: string, ...args: any[]) {
    console.warn(`[WARN][${new Date().toISOString()}] ${message}`, ...args);
  }

  static debug(message: string, ...args: any[]) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG][${new Date().toISOString()}] ${message}`, ...args);
    }
  }
}
