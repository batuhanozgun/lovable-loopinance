
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common translations
import * as commonEN from './locales/en/common.json';
import * as commonTR from './locales/tr/common.json';

// Import error translations
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        // Common translations
        common: commonEN,
        errors: errorsEN,
      },
      tr: {
        // Common translations
        common: commonTR,
        errors: errorsTR,
      }
    },
  });

export default i18n;
