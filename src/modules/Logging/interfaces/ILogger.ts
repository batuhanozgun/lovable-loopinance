
export interface ILogger {
  info(message: string, ...args: any[]): void;
  error(message: string, error?: Error | unknown, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}
