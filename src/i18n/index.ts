import i18next from "i18next";
import { getLocales } from "expo-localization";
import { initReactI18next } from "react-i18next";

import pt from "./locales/pt/common.json";
import en from "./locales/en/common.json";

const resources = {
  pt: { translation: pt },
  en: { translation: en },
};

const deviceLanguage = getLocales()[0].languageCode ?? "en";

i18next.use(initReactI18next).init({
  lng: deviceLanguage,
  debug: true,
  resources,
});

export default i18next;
