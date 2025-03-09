
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Çeviriler
import commonEn from './locales/en/common.json';
import errorsEn from './locales/en/errors.json';
import commonTr from './locales/tr/common.json';
import errorsTr from './locales/tr/errors.json';

// Modüllerin çevirilerini başlatan işlevler
import { initAppLayoutTranslations } from '@/modules/AppLayout/i18n';
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';
import { initDashboardTranslations } from '@/modules/Dashboard/i18n';
import { initLoginTranslations } from '@/modules/UserManagement/Login/i18n';
import { initSignupTranslations } from '@/modules/UserManagement/Signup/i18n';
import { initOAuthTranslations } from '@/modules/UserManagement/OAuth/i18n';
import { initProfileTranslations } from '@/modules/UserManagement/Profile/i18n';
import { initSubscriptionTranslations } from '@/modules/Subscription/i18n';
import { initPaymentTranslations } from '@/modules/Payment/i18n';
import { loadTranslations as loadCategoriesTranslations } from '@/modules/Categories/i18n';

// i18n nesnesini yapılandır
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn,
        errors: errorsEn
      },
      tr: {
        common: commonTr,
        errors: errorsTr
      }
    },
    fallbackLng: 'tr',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React zaten XSS koruma yapıyor
    },
    load: 'languageOnly', // Dil kodlarını yalnızca dil kodunu kullanarak yükle (tr-TR yerine sadece tr)
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Tüm modüllerin çevirilerini başlat
initAppLayoutTranslations();
initLandingPageTranslations();
initDashboardTranslations();
initLoginTranslations();
initSignupTranslations();
initOAuthTranslations();
initProfileTranslations();
initSubscriptionTranslations();
initPaymentTranslations();
loadCategoriesTranslations();

export default i18n;
