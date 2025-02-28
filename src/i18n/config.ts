
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Common translations
import * as commonEN from './locales/en/common.json';
import * as commonTR from './locales/tr/common.json';

// Shared translations
import * as sharedErrorsEN from './locales/en/shared/errors.json';
import * as sharedErrorsTR from './locales/tr/shared/errors.json';

// UserManagement module translations
import * as loginEN from './locales/en/modules/UserManagement/login.json';
import * as loginTR from './locales/tr/modules/UserManagement/login.json';
import * as signupEN from './locales/en/modules/UserManagement/signup.json';
import * as signupTR from './locales/tr/modules/UserManagement/signup.json';
import * as oauthEN from './locales/en/modules/UserManagement/oauth.json';
import * as oauthTR from './locales/tr/modules/UserManagement/oauth.json';

// Subscription module translations
import * as subscriptionCommonEN from './locales/en/modules/Subscription/common.json';
import * as subscriptionCommonTR from './locales/tr/modules/Subscription/common.json';
import * as subscriptionNotificationsEN from './locales/en/modules/Subscription/notifications.json';
import * as subscriptionNotificationsTR from './locales/tr/modules/Subscription/notifications.json';
import * as subscriptionPlansEN from './locales/en/modules/Subscription/plans.json';
import * as subscriptionPlansTR from './locales/tr/modules/Subscription/plans.json';

// Landing page translations
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
        'shared:errors': sharedErrorsEN,
        'modules:UserManagement.login': loginEN,
        'modules:UserManagement.signup': signupEN,
        'modules:UserManagement.oauth': oauthEN,
        'modules:Subscription.common': subscriptionCommonEN,
        'modules:Subscription.notifications': subscriptionNotificationsEN,
        'modules:Subscription.plans': subscriptionPlansEN,
        landing: landingEN,
      },
      tr: {
        common: commonTR,
        'shared:errors': sharedErrorsTR,
        'modules:UserManagement.login': loginTR,
        'modules:UserManagement.signup': signupTR,
        'modules:UserManagement.oauth': oauthTR,
        'modules:Subscription.common': subscriptionCommonTR,
        'modules:Subscription.notifications': subscriptionNotificationsTR,
        'modules:Subscription.plans': subscriptionPlansTR,
        landing: landingTR,
      },
    },
  });

export default i18n;
