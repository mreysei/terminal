import { UserData } from "./UserData";

export const LocaleList = ["es", "en"];

interface Dictionary<Type> {
  [key: string]: Type;
}

const getJsonFromLocale = (fileName: String, locale: String) => {
  return require(`../static/i18n/${locale}/${fileName}.json`);
}

const translationsPerLocale = (locale: String) => ({
  commands: getJsonFromLocale("commands", locale),
  shared: getJsonFromLocale("shared", locale),
  info: getJsonFromLocale("info", locale),
})

export const Translations = () => {
  const locale = UserData.locale.get() as "es" | "en"
  const translations: Dictionary<any> = {}
  LocaleList.forEach((locale: string) => translations[locale] = translationsPerLocale(locale))
  return translations[locale];
}
