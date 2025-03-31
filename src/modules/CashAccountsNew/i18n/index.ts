
import i18n from 'i18next';

// Alt modüllerin çeviri başlatma işlevlerini içe aktar
import { initTransactionManagementTranslations } from '../transactionManagement/i18n';
import { initStatementManagementTranslations } from '../statementManagement/i18n';
import { initAccountManagementTranslations } from '../accountManagement/i18n';
import { initCashAccountHomepageTranslations } from '../cashAccountHomepage/i18n';

// CashAccountsNew modülü çevirilerini başlat
export const initCashAccountsNewTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, CashAccountsNew alt modüllerinin çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      initSubmoduleTranslations();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, alt modüllerin çevirilerini hemen ekle
  initSubmoduleTranslations();
};

// Alt modüllerin çevirilerini başlatan yardımcı fonksiyon
function initSubmoduleTranslations() {
  try {
    // Alt modüllerin çevirilerini başlat
    initTransactionManagementTranslations();
    initStatementManagementTranslations();
    initAccountManagementTranslations();
    initCashAccountHomepageTranslations();
    
    console.log("CashAccountsNew alt modülleri çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("CashAccountsNew alt modüllerinin çevirileri eklenirken hata oluştu:", error);
  }
}

export default initCashAccountsNewTranslations;
