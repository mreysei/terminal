import { CommandAction } from '../CommandAction';
import { help } from '.';
import { KeyValue } from '../KeyValue';
import { getKeyValueFrom } from '../Events';
import { Analytics } from '../../Services/analytics';

export const set: CommandAction = ({
  name: "set",
  params: [
    { name: "--username=Link", description: "Actualiza el nombre de usuario" },
    { name: "--theme=ubuntu", description: "Actualiza el tema, las opciones son: ubuntu, dark y light" },
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
        setUsername(param.value)
        accumulator.push(`Hola ${param.value}!! Se actualizó tu ${param.key}`)
      } else if (param.key === "theme") {
        Analytics.command("set theme")
        Analytics.value(`Tema: ${param.value}`);
        setTheme(accumulator, param)
      } else {
        Analytics.error(`set --${param.key}=${param.value}`)
        accumulator.push(`No se reconoció la variable "${param.key}" :v`)
      }
      return accumulator
    }, [] as string[])
  } catch (_) {
    Analytics.error(`set ${params.join(" ")}`)
    return help.action([set.name])
  }
}

const setUsername = (value: string) => {
  localStorage.setItem("username", value)
}

const setTheme = (accumulator: string[], param: KeyValue) => {
  const themes = ["ubuntu", "dark", "light"];
  if (themes.includes(param.value)) {
    const body = document.getElementsByTagName('body')[0]
    const lastTheme = localStorage.getItem(param.key) || "ubuntu"

    localStorage.setItem(param.key, param.value)
    body.classList.remove(lastTheme)
    body.classList.add(param.value)

    accumulator.push(`El tema se ha actualizado a ${param.value}!!`)
  } else {
    accumulator.push("Vaya... parece que ese tema no existe")
  }
}
