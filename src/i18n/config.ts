
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import * as commonEN from './locales/en/common.json';
import * as commonTR from './locales/tr/common.json';
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';
import * as authEN from './locales/en/modules/UserManagement/auth.json';
import * as authTR from './locales/tr/modules/UserManagement/auth.json';
import * as subscriptionCommonEN from './locales/en/modules/Subscription/common.json';
import * as subscriptionCommonTR from './locales/tr/modules/Subscription/common.json';
import * as subscriptionNotificationsEN from './locales/en/modules/Subscription/notifications.json';
import * as subscriptionNotificationsTR from './locales/tr/modules/Subscription/notifications.json';
import * as subscriptionPlansEN from './locales/en/modules/Subscription/plans.json';
import * as subscriptionPlansTR from './locales/tr/modules/Subscription/plans.json';
import * as landingEN from './locales/en/landing.json';
import * as landingTR from './locales/tr/landing.json';

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
        common: commonEN,
        errors: errorsEN,
        auth: authEN, // Changed from separate signup and login to combined auth
        'subscription.common': subscriptionCommonEN,
        'subscription.notifications': subscriptionNotificationsEN,
        'subscription.plans': subscriptionPlansEN,
        landing: landingEN,
      },
      tr: {
        common: commonTR,
        errors: errorsTR,
        auth: authTR, // Changed from separate signup and login to combined auth
        'subscription.common': subscriptionCommonTR,
        'subscription.notifications': subscriptionNotificationsTR,
        'subscription.plans': subscriptionPlansTR,
        landing: landingTR,
      },
    },
  });

export default i18n;
