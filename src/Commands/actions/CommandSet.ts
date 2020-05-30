import { CommandAction, getKeyValueFrom, KeyValue, containsAKey, CommandHelp } from "..";

export const CommandSet: CommandAction = ({
  name: "set",
  description: "Actualiza datos",
  params: [
    { name: "--username=MrRobot", description: "Actualiza el nombre de usuario" },
    { name: "--theme=ubuntu", description: "Actualiza el tema, las opciones son: ubuntu, dark y light" },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      return errorParams([CommandSet.name]);
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
        localStorage.setItem(param.key, param.value);
        accumulator.push(`Hola ${param.value}!! Se actualizó tu ${param.key}`);
      } else if (containsAKey(["theme"], param.key)) {
        setTheme(accumulator, param);
      } else {
        accumulator.push(`No se reconoció la variable "${param.key}" :v`)
      }
      return accumulator;
    }, [] as string[])
  } catch (_) {
    return errorParams([CommandSet.name]);
  }
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

const errorParams = (params: string[]) => [
  "Oops parece que algo ha ido mal, este comando funciona así: ",
  ...CommandHelp.action(params),
]
