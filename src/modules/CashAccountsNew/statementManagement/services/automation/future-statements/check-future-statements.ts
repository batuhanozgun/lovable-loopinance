
/**
 * Gelecek ekstre durumu kontrol işlemleri
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { 
  AccountStatement, 
  AccountFutureStatementStatus,
  StatementStatus
} from '../../../types';
import { createRemainingFutureStatements } from './create-remaining-statements';
import { isValidFutureStatus } from './validation';
import { FutureStatementResult } from './types';

const logger = new ModuleLogger('CashAccountsNew.CheckFutureStatements');

/**
 * Eksik gelecek ekstreleri kontrol eder ve gerekirse oluşturur
 */
export async function checkAndCreateMissingFutureStatements(
  accountId: string
): Promise<FutureStatementResult> {
  try {
    // Hesabın future statement durumunu kontrol et
    const { data: rawData, error } = await supabase.rpc('check_account_future_statements', {
      p_account_id: accountId
    });
    
    if (error) {
      logger.error('Future statement durumu kontrol edilirken hata', { accountId, error });
      return {
        success: false,
        createdCount: 0,
        error: error.message
      };
    }
    
    // Veri geçerliliğini kontrol et ve doğru tipe dönüştür
    if (!isValidFutureStatus(rawData)) {
      logger.error('Geçersiz future statement durumu alındı', { accountId, data: rawData });
      return {
        success: false,
        createdCount: 0,
        error: 'Geçersiz future statement durumu'
      };
    }
    
    // Tip güvenli dönüşüm
    const futureStatus = rawData as AccountFutureStatementStatus;
    
    // Future statement ihtiyacı yoksa işlem yapma
    if (!futureStatus.needs_future_statements) {
      return {
        success: true,
        createdCount: 0
      };
    }
    
    // Mevcut açık ekstreyi bul
    const { data: statements, error: statementsError } = await supabase
      .from('account_statements')
      .select('*')
      .eq('account_id', accountId)
      .eq('status', StatementStatus.OPEN)
      .order('end_date', { ascending: false })
      .limit(1);
    
    if (statementsError || !statements || statements.length === 0) {
      logger.error('Mevcut açık ekstre bulunamadı', { accountId, error: statementsError });
      return {
        success: false,
        createdCount: 0,
        error: statementsError?.message || 'Mevcut açık ekstre bulunamadı'
      };
    }
    
    // Son oluşturulan gelecek ekstreleri bul
    const { data: futureStatements, error: futureError } = await supabase
      .from('account_statements')
      .select('*')
      .eq('account_id', accountId)
      .eq('status', StatementStatus.FUTURE)
      .order('end_date', { ascending: false })
      .limit(1);
    
    // Ekstre oluşturmaya başlamak için referans ekstreyi belirle
    let referenceStatement: AccountStatement;
    
    if (futureError || !futureStatements || futureStatements.length === 0) {
      // Gelecek ekstre yoksa, açık ekstreden başla
      referenceStatement = statements[0] as AccountStatement;
    } else {
      // Varsa, son gelecek ekstreden devam et
      referenceStatement = futureStatements[0] as AccountStatement;
    }
    
    // Gerekli sayıda gelecek ekstre oluştur
    return await createRemainingFutureStatements(
      accountId, 
      referenceStatement, 
      futureStatus.future_statements_to_create
    );
  } catch (error) {
    logger.error('Eksik gelecek ekstreleri kontrol edilirken beklenmeyen hata', { accountId, error });
    return {
      success: false,
      createdCount: 0,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    };
  }
}
