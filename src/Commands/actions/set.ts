import { CommandAction } from '../CommandAction';
import { help } from '.';
import { KeyValue } from '../KeyValue';
import { getKeyValueFrom } from '../Events';
import { Analytics } from '../../Services/Analytics';
import { LocaleList, Translations } from '../../Services/Translations';
import { UserData } from '../../Services/UserData';


export const set: CommandAction = ({
  name: "set",
  params: [
    { name: "--username=Link", description: Translations().commands.set.params.username },
    // { name: "--locale=es", description: Translations().commands.set.params.locale },
    { name: "--theme=ubuntu", description: Translations().commands.set.params.theme },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      Analytics.command("set")
      return help.action([set.name])
    } else {
      return getValues(params)
    }
  },
})

const getValues = (params: string[]): string[] => {
  const texts = Translations().commands.set
  try {
    const keyValues: KeyValue[] = getKeyValueFrom(params);
    if (keyValues.length === 0) {
      Analytics.error(`set ${params.join(" ")}`)
      return help.action([set.name])
    }
    return keyValues.reduce((accumulator, param) => {
      if (param.key === "username") {
        Analytics.command("set username")
        Analytics.value(`Nombre de usuario: ${param.value}`)
        UserData.username.set(param.value)
        accumulator.push(texts.response.username.replace("{name}", param.value))
      } else if (param.key === "locale") {
        Analytics.command("set locale")
        Analytics.value(`Idioma: ${param.value}`)
        setLocale(accumulator, param)
      } else if (param.key === "theme") {
        Analytics.command("set theme")
        Analytics.value(`Tema: ${param.value}`)
        setTheme(accumulator, param)
      } else {
        Analytics.error(`set --${param.key}=${param.value}`)
        accumulator.push(texts.response.unknown.replace("{key}", param.key))
      }
      return accumulator
    }, [] as string[])
  } catch (_) {
    Analytics.error(`set ${params.join(" ")}`)
    return help.action([set.name])
  }
}

const setLocale = (accumulator: string[], param: KeyValue) => {
  const translation = Translations().commands.set.response.locale;

  UserData.locale.set(param.value)
  accumulator.push(LocaleList.includes(param.value) ? translation.success : translation.error)
}

const setTheme = (accumulator: string[], param: KeyValue) => {
  const themes = ["ubuntu", "dark", "light"];
  const translation = Translations().commands.set.response.theme;

  if (themes.includes(param.value)) {
    const body = document.getElementsByTagName('body')[0]
    const lastTheme = UserData.theme.get()

    UserData.theme.set(param.value)
    body.classList.remove(lastTheme)
    body.classList.add(param.value)

    accumulator.push(translation.success.replace("{theme}", param.value))
  } else {
    accumulator.push(translation.error)
  }
}
