
import { LoggerFactory } from './core/LoggerFactory';
import { ModuleLogger } from './core/ModuleLogger';
import { LogLevel } from './types/LogTypes';
import type { LogMetadata, LogEntry, LogConfig } from './types/LogTypes';
import { DEFAULT_LOG_CONFIG, formatLogMessage } from './config/LogConfig';

// Ana entry point
export const createLogger = (moduleName: string): ModuleLogger => {
  return LoggerFactory.getInstance().getLogger(moduleName);
};

// Tipleri dışa aktarma
export { 
  LogLevel, 
  ModuleLogger,
  LoggerFactory,
  DEFAULT_LOG_CONFIG 
};

// Type exportları
export type { 
  LogMetadata, 
  LogEntry, 
  LogConfig 
};
