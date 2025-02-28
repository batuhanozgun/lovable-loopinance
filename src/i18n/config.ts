
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// İngilizce çeviriler
import enCommon from "./locales/en/common.json";
import enErrors from "./locales/en/errors.json";
import enAuth from "./locales/en/auth.json";
import enLanding from "./locales/en/landing.json";

// Türkçe çeviriler
import trCommon from "./locales/tr/common.json";
import trErrors from "./locales/tr/errors.json";
import trAuth from "./locales/tr/auth.json";
import trLanding from "./locales/tr/landing.json";

// UserManagement modülü çevirileri
import enUserManagementAuth from "./locales/en/modules/UserManagement/auth.json";
import enUserManagementErrors from "./locales/en/modules/UserManagement/errors.json";
import trUserManagementAuth from "./locales/tr/modules/UserManagement/auth.json";
import trUserManagementErrors from "./locales/tr/modules/UserManagement/errors.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        common: trCommon,
        errors: trErrors,
        auth: trAuth,
        landing: trLanding,
        userManagement: {
          auth: trUserManagementAuth,
          errors: trUserManagementErrors
        }
      },
      en: {
        common: enCommon,
        errors: enErrors,
        auth: enAuth,
        landing: enLanding,
        userManagement: {
          auth: enUserManagementAuth,
          errors: enUserManagementErrors
        }
      },
    },
    fallbackLng: "tr",
    ns: ["common", "errors", "auth", "landing", "userManagement"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
