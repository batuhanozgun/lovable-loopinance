
import i18n from 'i18next';

// İngilizce ve Türkçe çeviriler
import transactionManagementEN from './locales/en/transactionManagement.json';
import errorsEN from './locales/en/errors.json';
import transactionManagementTR from './locales/tr/transactionManagement.json';
import errorsTR from './locales/tr/errors.json';

/**
 * TransactionManagement modülü çevirilerini başlat
 */
export const initTransactionManagementTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, TransactionManagement çevirileri daha sonra eklenecek");
    return;
  }
  
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'TransactionManagement', {
      ...transactionManagementEN,
      errors: errorsEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'TransactionManagement', {
      ...transactionManagementTR,
      errors: errorsTR
    }, true, true);
    
    console.log("TransactionManagement çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("TransactionManagement çevirileri eklenirken hata oluştu:", error);
  }
};

export default initTransactionManagementTranslations;
