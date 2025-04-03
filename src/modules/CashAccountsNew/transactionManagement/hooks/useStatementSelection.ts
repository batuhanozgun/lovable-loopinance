
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StatementFinderService } from "../services/StatementFinderService";
import { AccountStatement } from "../../statementManagement/types";
import { toast } from "sonner";

/**
 * Statement seçimi ve yükleme işlemlerini yöneten hook
 */
export const useStatementSelection = (
  accountId: string,
  initialStatementId?: string,
  initialDate?: Date
) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  
  const [currentStatementId, setCurrentStatementId] = useState<string | null>(initialStatementId || null);
  const [currentStatement, setCurrentStatement] = useState<AccountStatement | null>(null);
  const [statementError, setStatementError] = useState<string | null>(null);
  const [isLoadingStatement, setIsLoadingStatement] = useState<boolean>(false);
  const [lockStatement, setLockStatement] = useState<boolean>(!!initialStatementId);
  
  // Tarih değişikliğinde uygun ekstreyi bulma
  const findStatementForDate = async (dateToFind: Date): Promise<boolean> => {
    // Eğer statement kilitli ise işlem yapma
    if (lockStatement && currentStatementId) {
      return true;
    }
    
    console.log('Finding statement for date:', dateToFind);
    
    try {
      setStatementError(null);
      setIsLoadingStatement(true);
      
      const foundStatement = await StatementFinderService.findStatementForDate(accountId, dateToFind);
      
      if (foundStatement) {
        console.log('Statement found:', foundStatement.id);
        setCurrentStatementId(foundStatement.id);
        setCurrentStatement(foundStatement);
        return true;
      } else {
        console.warn('No statement found for date:', dateToFind);
        setCurrentStatementId(null);
        setCurrentStatement(null);
        setStatementError(t("TransactionManagement:errors.transaction.noValidStatement"));
        toast.error(t("TransactionManagement:errors.transaction.noValidStatement"));
        return false;
      }
    } catch (error) {
      console.error('Error finding statement:', error);
      setStatementError(t("TransactionManagement:errors.statement.loadFailed"));
      return false;
    } finally {
      setIsLoadingStatement(false);
    }
  };
  
  // Statement ID'ye göre statement yükleme
  const loadStatementById = async (statementId: string): Promise<boolean> => {
    try {
      setIsLoadingStatement(true);
      
      const foundStatement = await StatementFinderService.getStatementById(statementId);
      
      if (foundStatement) {
        console.log('Statement loaded by ID:', foundStatement.id);
        setCurrentStatement(foundStatement);
        setCurrentStatementId(statementId);
        return true;
      } else {
        console.warn('Statement not found by ID:', statementId);
        setStatementError(t("TransactionManagement:errors.statement.notFound"));
        toast.error(t("TransactionManagement:errors.statement.notFound"));
        return false;
      }
    } catch (error) {
      console.error('Error loading statement by ID:', error);
      setStatementError(t("TransactionManagement:errors.statement.loadFailed"));
      return false;
    } finally {
      setIsLoadingStatement(false);
    }
  };
  
  // StatementId kilidini açma/kapama fonksiyonu
  const toggleStatementLock = () => {
    setLockStatement(!lockStatement);
  };
  
  // Form ilk yüklendiğinde ekstre kontrolü
  useEffect(() => {
    if (!accountId) return;
    
    const initializeStatement = async () => {
      // Eğer belirli bir statement ID verilmişse onu yükle
      if (initialStatementId) {
        await loadStatementById(initialStatementId);
      } 
      // Statement ID verilmemişse ve tarih varsa tarihe göre bul
      else if (initialDate) {
        await findStatementForDate(initialDate);
      }
    };
    
    initializeStatement();
  }, [accountId, initialStatementId, initialDate]);
  
  return {
    currentStatementId,
    currentStatement,
    isLoadingStatement,
    statementError,
    lockStatement,
    toggleStatementLock,
    findStatementForDate,
    loadStatementById
  };
};
