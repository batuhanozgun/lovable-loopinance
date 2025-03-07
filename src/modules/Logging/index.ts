
import { LoggerFactory } from './core/LoggerFactory';
import { ModuleLogger } from './core/ModuleLogger';
import { LogLevel, LogMetadata, LogEntry, LogConfig } from './types/LogTypes';
import { DEFAULT_LOG_CONFIG, formatLogMessage } from './config/LogConfig';

// Ana entry point
export const createLogger = (moduleName: string): ModuleLogger => {
  return LoggerFactory.getInstance().getLogger(moduleName);
};

// Tipleri dışa aktarma
export { 
  LogLevel, 
  LogMetadata, 
  LogEntry, 
  LogConfig, 
  DEFAULT_LOG_CONFIG,
  ModuleLogger,
  LoggerFactory
};
