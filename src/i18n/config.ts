import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import common translations
import * as commonEN from './locales/en/common.json';
import * as commonTR from './locales/tr/common.json';

// Import error translations
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';

// Import UserManagement module translations
// Login
import * as loginUIEN from './locales/en/UserManagement/login/ui.json';
import * as loginMessagesEN from './locales/en/UserManagement/login/messages.json';
import * as loginContentEN from './locales/en/UserManagement/login/content.json';
import * as loginNotificationsEN from './locales/en/UserManagement/login/notifications.json';
import * as loginUITR from './locales/tr/UserManagement/login/ui.json';
import * as loginMessagesTR from './locales/tr/UserManagement/login/messages.json';
import * as loginContentTR from './locales/tr/UserManagement/login/content.json';
import * as loginNotificationsTR from './locales/tr/UserManagement/login/notifications.json';

// Signup
import * as signupUIEN from './locales/en/UserManagement/signup/ui.json';
import * as signupMessagesEN from './locales/en/UserManagement/signup/messages.json';
import * as signupValidationEN from './locales/en/UserManagement/signup/validation.json';
import * as signupContentEN from './locales/en/UserManagement/signup/content.json';
import * as signupNotificationsEN from './locales/en/UserManagement/signup/notifications.json';
import * as signupUITR from './locales/tr/UserManagement/signup/ui.json';
import * as signupMessagesTR from './locales/tr/UserManagement/signup/messages.json';
import * as signupValidationTR from './locales/tr/UserManagement/signup/validation.json';
import * as signupContentTR from './locales/tr/UserManagement/signup/content.json';
import * as signupNotificationsTR from './locales/tr/UserManagement/signup/notifications.json';

// OAuth
import * as oauthUIEN from './locales/en/UserManagement/oauth/ui.json';
import * as oauthMessagesEN from './locales/en/UserManagement/oauth/messages.json';
import * as oauthNotificationsEN from './locales/en/UserManagement/oauth/notifications.json';
import * as oauthUITR from './locales/tr/UserManagement/oauth/ui.json';
import * as oauthMessagesTR from './locales/tr/UserManagement/oauth/messages.json';
import * as oauthNotificationsTR from './locales/tr/UserManagement/oauth/notifications.json';

// Import Landing page translations
import * as landingEN from './locales/en/landing.json';
import * as landingTR from './locales/tr/landing.json';

// Import the landing page translations initializer
import { initLandingPageTranslations } from '@/modules/LandingPage/i18n';

// Initialize landing page translations
initLandingPageTranslations();

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
        
        // UserManagement module translations
        'UserManagement.login.ui': loginUIEN,
        'UserManagement.login.messages': loginMessagesEN,
        'UserManagement.login.content': loginContentEN,
        'UserManagement.login.notifications': loginNotificationsEN,
        
        'UserManagement.signup.ui': signupUIEN,
        'UserManagement.signup.messages': signupMessagesEN,
        'UserManagement.signup.validation': signupValidationEN,
        'UserManagement.signup.content': signupContentEN,
        'UserManagement.signup.notifications': signupNotificationsEN,
        
        'UserManagement.oauth.ui': oauthUIEN,
        'UserManagement.oauth.messages': oauthMessagesEN,
        'UserManagement.oauth.notifications': oauthNotificationsEN,
        
        // Landing page translations
        landing: landingEN
      },
      tr: {
        // Common translations
        common: commonTR,
        errors: errorsTR,
        
        // UserManagement module translations
        'UserManagement.login.ui': loginUITR,
        'UserManagement.login.messages': loginMessagesTR,
        'UserManagement.login.content': loginContentTR,
        'UserManagement.login.notifications': loginNotificationsTR,
        
        'UserManagement.signup.ui': signupUITR,
        'UserManagement.signup.messages': signupMessagesTR,
        'UserManagement.signup.validation': signupValidationTR,
        'UserManagement.signup.content': signupContentTR,
        'UserManagement.signup.notifications': signupNotificationsTR,
        
        'UserManagement.oauth.ui': oauthUITR,
        'UserManagement.oauth.messages': oauthMessagesTR,
        'UserManagement.oauth.notifications': oauthNotificationsTR,
        
        // Landing page translations
        landing: landingTR
      }
    },
  });

export default i18n;
