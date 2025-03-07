
/**
 * Log seviyeleri
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Log meta verileri
 */
export interface LogMetadata {
  moduleName?: string;
  userId?: string;
  action?: string;
  timestamp?: string;
  [key: string]: unknown;
}

/**
 * Log kaydı yapısı
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  metadata?: LogMetadata;
  error?: Error | unknown;
  timestamp: string;
}

/**
 * Log yapılandırma seçenekleri
 */
export interface LogConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  includeTimestamp: boolean;
  includeContext: boolean;
  customMetadata?: Record<string, unknown>;
}
