import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { pt } from "@/src/locales/pt";
import { en } from "@/src/locales/en";

export const useTranslations = () => {
  const i18n = new I18n({ pt, en });
  i18n.locale = getLocales()[0].languageCode ?? "en";
  i18n.enableFallback = true;

  return {
    i18n,
  };
};
