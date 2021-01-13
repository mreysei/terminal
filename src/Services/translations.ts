import { UserData } from "./UserData";

const getJsonFromLocale = (fileName: String, locale: String) => {
  return require(`../static/i18n/${locale}/${fileName}.json`);
}

const translationsPerLocale = (locale: String) => ({
  commands: getJsonFromLocale("commands", locale),
  shared: getJsonFromLocale("shared", locale),
  info: getJsonFromLocale("info", locale),
})

export const Translations = () => {
  const locale = UserData.locale.get() as "es" | "en";
  const translations = {
    es: translationsPerLocale("es"),
    en: translationsPerLocale("en"),
  }
  return translations[locale];
}
