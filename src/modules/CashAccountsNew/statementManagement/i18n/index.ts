
import i18n from 'i18next';

// Çeviri dosyalarını içe aktar
import statementManagementEN from './locales/en/statementManagement.json';
import errorsEN from './locales/en/errors.json';

import statementManagementTR from './locales/tr/statementManagement.json';
import errorsTR from './locales/tr/errors.json';

/**
 * StatementManagement modülü çevirilerini başlat
 */
export const initStatementManagementTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, StatementManagement çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addStatementManagementResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addStatementManagementResources();
};

/**
 * StatementManagement kaynak paketlerini ekleme yardımcı fonksiyonu
 */
function addStatementManagementResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'StatementManagement', {
      ...statementManagementEN,
      errors: errorsEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'StatementManagement', {
      ...statementManagementTR,
      errors: errorsTR
    }, true, true);
    
    console.log("StatementManagement çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("StatementManagement çevirileri eklenirken hata oluştu:", error);
  }
}

export default initStatementManagementTranslations;
