
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// İngilizce çeviriler
import enCommon from "./locales/en/common.json";
import enErrors from "./locales/en/errors.json";
import enAuth from "./locales/en/auth.json";

// Türkçe çeviriler
import trCommon from "./locales/tr/common.json";
import trErrors from "./locales/tr/errors.json";
import trAuth from "./locales/tr/auth.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        common: trCommon,
        errors: trErrors,
        auth: trAuth
      },
      en: {
        common: enCommon,
        errors: enErrors,
        auth: enAuth
      },
    },
    fallbackLng: "tr",
    ns: ["common", "errors", "auth"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
