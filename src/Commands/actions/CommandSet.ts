import { CommandAction, getKeyValueFrom, KeyValue, containsAKey, CommandHelp } from "..";

export const CommandSet: CommandAction = ({
  name: "set",
  description: "Actualiza datos",
  params: [
    { name: "--username=MrRobot", description: "Actualiza el nombre de usuario" },
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
        accumulator.push(`Se ha actualizado la variable "${param.key}" con el valor "${param.value}"`);
      } else {
        accumulator.push(`No se reconoció la variable "${param.key}" :v`)
      }
      return accumulator;
    }, [] as string[])
  } catch (_) {
    return errorParams([CommandSet.name]);
  }
}

const errorParams = (params: string[]) => [
  "Oops parece que algo ha ido mal, este comando funciona así: ",
  ...CommandHelp.action(params),
]
