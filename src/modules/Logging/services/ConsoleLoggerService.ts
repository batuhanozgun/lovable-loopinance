
export class ConsoleLoggerService {
  static info(message: string, ...args: any[]) {
    console.info(`[INFO] ${message}`, ...args);
  }

  static error(message: string, error?: Error | unknown, ...args: any[]) {
    console.error(
      `[ERROR] ${message}`,
      error instanceof Error ? error.message : error,
      ...args
    );
  }

  static warn(message: string, ...args: any[]) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  static debug(message: string, ...args: any[]) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}
