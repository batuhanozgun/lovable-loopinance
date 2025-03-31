
import i18n from 'i18next';

// İngilizce kaynaklar
import cashAccountsEN from './locales/en/cashAccounts.json';
import errorsEN from './locales/en/errors.json';

// Türkçe kaynaklar
import cashAccountsTR from './locales/tr/cashAccounts.json';
import errorsTR from './locales/tr/errors.json';

// Alt modüllerin çeviri başlatma işlevlerini içe aktar
import { initTransactionManagementTranslations } from '../transactionManagement/i18n';
import { initStatementManagementTranslations } from '../statementManagement/i18n';
import { initAccountManagementTranslations } from '../accountManagement/i18n';
import { initCashAccountHomepageTranslations } from '../cashAccountHomepage/i18n';

// CashAccountsNew modülü çevirilerini başlat
export const initCashAccountsNewTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, CashAccountsNew çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addCashAccountsNewResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addCashAccountsNewResources();
};

// CashAccountsNew kaynak paketlerini ekleme yardımcı fonksiyonu
function addCashAccountsNewResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'CashAccountsNew', {
      ...cashAccountsEN,
      errors: errorsEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'CashAccountsNew', {
      ...cashAccountsTR,
      errors: errorsTR
    }, true, true);
    
    console.log("CashAccountsNew çevirileri başarıyla eklendi");
    
    // Alt modüllerin çevirilerini de başlat
    initTransactionManagementTranslations();
    initStatementManagementTranslations();
    initAccountManagementTranslations();
    initCashAccountHomepageTranslations();
  } catch (error) {
    console.error("CashAccountsNew çevirileri eklenirken hata oluştu:", error);
  }
}

export default initCashAccountsNewTranslations;
