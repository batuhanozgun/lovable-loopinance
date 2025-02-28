import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import * as commonEN from './locales/en/common.json';
import * as commonTR from './locales/tr/common.json';
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';
import * as signupEN from './locales/en/modules/UserManagement/Signup/signup.json';
import * as signupTR from './locales/tr/modules/UserManagement/Signup/signup.json';
import * as loginEN from './locales/en/modules/UserManagement/Login/login.json';
import * as loginTR from './locales/tr/modules/UserManagement/Login/login.json';
import * as subscriptionCommonEN from './locales/en/modules/Subscription/common.json';
import * as subscriptionCommonTR from './locales/tr/modules/Subscription/common.json';
import * as subscriptionNotificationsEN from './locales/en/modules/Subscription/notifications.json';
import * as subscriptionNotificationsTR from './locales/tr/modules/Subscription/notifications.json';
import * as subscriptionPlansEN from './locales/en/modules/Subscription/plans.json';
import * as subscriptionPlansTR from './locales/tr/modules/Subscription/plans.json';

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
        signup: signupEN,
        login: loginEN,
        'subscription.common': subscriptionCommonEN,
        'subscription.notifications': subscriptionNotificationsEN,
        'subscription.plans': subscriptionPlansEN,
      },
      tr: {
        common: commonTR,
        errors: errorsTR,
        signup: signupTR,
        login: loginTR,
        'subscription.common': subscriptionCommonTR,
        'subscription.notifications': subscriptionNotificationsTR,
        'subscription.plans': subscriptionPlansTR,
      },
    },
  });

export default i18n;
