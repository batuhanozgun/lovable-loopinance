
import { LoggerService } from '../services/LoggerService';
import { LogLevel, LogMetadata } from '../types/LogTypes';
import { DEFAULT_LOG_CONFIG, formatLogMessage } from '../config/LogConfig';

/**
 * Her modül için standart logger sınıfı
 */
export class ModuleLogger {
  private logger: LoggerService;
  private moduleName: string;
  
  constructor(moduleName: string) {
    this.moduleName = moduleName;
    this.logger = LoggerService.getInstance(moduleName);
  }
  
  /**
   * Debug seviyesinde log kaydı oluşturur
   */
  debug(message: string, metadata?: Record<string, unknown>): void {
    const formattedMessage = formatLogMessage(this.moduleName, message);
    this.logger.debug(formattedMessage, metadata);
  }
  
  /**
   * Info seviyesinde log kaydı oluşturur
   */
  info(message: string, metadata?: Record<string, unknown>): void {
    const formattedMessage = formatLogMessage(this.moduleName, message);
    this.logger.info(formattedMessage, metadata);
  }
  
  /**
   * Warn seviyesinde log kaydı oluşturur
   */
  warn(message: string, metadata?: Record<string, unknown>): void {
    const formattedMessage = formatLogMessage(this.moduleName, message);
    this.logger.warn(formattedMessage, metadata);
  }
  
  /**
   * Error seviyesinde log kaydı oluşturur
   */
  error(message: string, error?: Error | unknown, metadata?: Record<string, unknown>): void {
    const formattedMessage = formatLogMessage(this.moduleName, message);
    this.logger.error(formattedMessage, error, metadata);
  }
  
  /**
   * Dinamik olarak log seviyesine göre kayıt oluşturur
   */
  log(level: LogLevel, message: string, metadata?: Record<string, unknown>, error?: Error | unknown): void {
    const formattedMessage = formatLogMessage(this.moduleName, message);
    
    switch (level) {
      case LogLevel.DEBUG:
        this.logger.debug(formattedMessage, metadata);
        break;
      case LogLevel.INFO:
        this.logger.info(formattedMessage, metadata);
        break;
      case LogLevel.WARN:
        this.logger.warn(formattedMessage, metadata);
        break;
      case LogLevel.ERROR:
        this.logger.error(formattedMessage, error, metadata);
        break;
      default:
        this.logger.info(formattedMessage, metadata);
    }
  }
  
  /**
   * Alt modül için yeni bir logger oluşturur
   */
  createSubLogger(subModule: string): ModuleLogger {
    return new ModuleLogger(`${this.moduleName}.${subModule}`);
  }
}
