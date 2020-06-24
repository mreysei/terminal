import { CommandAction } from '../CommandAction';
import { help } from '.';
import { KeyValue } from '../KeyValue';
import { getKeyValueFrom } from '../Events';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';
import { UserData } from '../../Services/UserData';

const texts = Translations.commands.set

export const set: CommandAction = ({
  name: "set",
  params: [
    { name: "--username=Link", description: texts.params.username },
    { name: "--theme=ubuntu", description: texts.params.theme },
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
      } else if (param.key === "theme") {
        Analytics.command("set theme")
        Analytics.value(`Tema: ${param.value}`);
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

const setTheme = (accumulator: string[], param: KeyValue) => {
  const themes = ["ubuntu", "dark", "light"];
  if (themes.includes(param.value)) {
    const body = document.getElementsByTagName('body')[0]
    const lastTheme = UserData.theme.get()

    UserData.theme.set(param.value)
    body.classList.remove(lastTheme)
    body.classList.add(param.value)

    accumulator.push(texts.response.theme.success.replace("{theme}", param.value))
  } else {
    accumulator.push(texts.response.theme.error)
  }
}
