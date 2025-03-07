
import { LogConfig, LogLevel } from '../types/LogTypes';

/**
 * Varsayılan log yapılandırması
 */
export const DEFAULT_LOG_CONFIG: LogConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  includeTimestamp: true,
  includeContext: true,
  customMetadata: {}
};

/**
 * Log mesaj formatını standartlaştırma
 */
export const formatLogMessage = (
  context: string, 
  message: string, 
  config: LogConfig = DEFAULT_LOG_CONFIG
): string => {
  let formattedMessage = '';
  
  if (config.includeTimestamp) {
    formattedMessage += `[${new Date().toISOString()}]`;
  }
  
  if (config.includeContext && context) {
    formattedMessage += `[${context}]`;
  }
  
  formattedMessage += ` ${message}`;
  
  return formattedMessage;
};
