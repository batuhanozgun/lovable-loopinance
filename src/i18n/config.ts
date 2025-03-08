
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common translations
import * as commonEN from './locales/en/common.json';
import * as commonTR from './locales/tr/common.json';

// Import error translations
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';

// Modül çevirilerini içe aktar
import { initSignupTranslations } from '@/modules/UserManagement/Signup/i18n';
import { initLoginTranslations } from '@/modules/UserManagement/Login/i18n';
import { initOAuthTranslations } from '@/modules/UserManagement/OAuth/i18n';
import { initAppLayoutTranslations } from '@/modules/AppLayout/i18n';
import { initDashboardTranslations } from '@/modules/Dashboard/i18n';
import { initProfileTranslations } from '@/modules/UserManagement/Profile/i18n';
import { initSubscriptionTranslations } from '@/modules/Subscription/i18n';

// Profile modülü çevirilerini doğrudan içe aktar
import * as profileContentEN from '@/modules/UserManagement/Profile/i18n/locales/en/content.json';
import * as profileContentTR from '@/modules/UserManagement/Profile/i18n/locales/tr/content.json';
import * as profileErrorsEN from '@/modules/UserManagement/Profile/i18n/locales/en/errors.json';
import * as profileErrorsTR from '@/modules/UserManagement/Profile/i18n/locales/tr/errors.json';
import * as profileMessagesEN from '@/modules/UserManagement/Profile/i18n/locales/en/messages.json';
import * as profileMessagesTR from '@/modules/UserManagement/Profile/i18n/locales/tr/messages.json';

// Kullanıcı dil tercihini kontrol et
const savedLanguage = localStorage.getItem('preferredLanguage');
const defaultLng = savedLanguage || 'tr'; // Varsayılan olarak Türkçe

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    lng: defaultLng, // Kaydedilmiş dili kullan
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'errors', 'Profile'], // Profile namespace'ini ekle
    defaultNS: 'common',
    resources: {
      en: {
        // Common translations
        common: commonEN,
        errors: errorsEN,
        // Profile translations
        Profile: {
          ...profileContentEN,
          errors: profileErrorsEN,
          messages: profileMessagesEN,
        }
      },
      tr: {
        // Common translations
        common: commonTR,
        errors: errorsTR,
        // Profile translations
        Profile: {
          ...profileContentTR,
          errors: profileErrorsTR,
          messages: profileMessagesTR,
        }
      }
    },
  });

// Diğer modül çevirilerini yükle
initSignupTranslations();
initLoginTranslations();
initOAuthTranslations();
initAppLayoutTranslations();
initDashboardTranslations();
initSubscriptionTranslations();
// Profile modülü çevirileri zaten yüklendi, tekrar başlatmaya gerek yok

export default i18n;
