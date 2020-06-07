import ReactGA from 'react-ga';
import { CommandAction } from '../CommandAction';
import { help } from '.';
import { KeyValue } from '../KeyValue';
import { getKeyValueFrom, containsAKey } from '../Events';

export const set: CommandAction = ({
  name: "set",
  params: [
    { name: "--username=Link", description: "Actualiza el nombre de usuario" },
    { name: "--theme=ubuntu", description: "Actualiza el tema, las opciones son: ubuntu, dark y light" },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      return help.action([set.name]);
    } else {
      return getValues(params);
    }
  },
})

const getValues = (params: string[]): string[] => {
  try {
    const keyValues: KeyValue[] = getKeyValueFrom(params);
    return keyValues.reduce((accumulator, param) => {
      if (containsAKey(["username"], param.key)) {
        analytics("username = " + param.value);
        localStorage.setItem(param.key, param.value);
        accumulator.push(`Hola ${param.value}!! Se actualizó tu ${param.key}`);
      } else if (containsAKey(["theme"], param.key)) {
        analytics("theme = " + param.value);
        setTheme(accumulator, param);
      } else {
        analytics("key desconocida = " + param.key);
        accumulator.push(`No se reconoció la variable "${param.key}" :v`)
      }
      return accumulator;
    }, [] as string[])
  } catch (_) {
    return help.action([set.name]);
  }
}

const analytics = (value: string) => {
  ReactGA.event({
    category: 'Commands',
    action: 'Conocido',
    label: set.name + " " + value,
  })
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
