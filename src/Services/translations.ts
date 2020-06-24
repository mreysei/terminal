const locale: String = 'es';

const getJsonFromLocale = (fileName: String) => {
  return require(`../static/i18n/${locale}/${fileName}.json`);
}

const commands = getJsonFromLocale("commands");
const shared = getJsonFromLocale("shared");
const info = getJsonFromLocale("info");

export const Translations = {
  commands,
  shared,
  info,
}