import { CommandClear, CommandError, CommandRemove, CommandHelp, CommandSet, CommandGet } from ".";

export interface CommandAction {
  name: string,
  description?: string,
  params?: CommandParam[],
  action: (params?: string[]) => string[],
}

export interface CommandParam {
  name: string,
  description?: string,
}

interface Dictionary<Type> {
  [key: string]: Type;
}

export interface KeyValue {
  key: string,
  value: string,
}

export const containsAllParams = (params: string[], compareParams: string[]): boolean => {
  let haveAllParams = true;
  compareParams.forEach(element => {
    if (!params.includes(element)) haveAllParams = false;
  });
  return haveAllParams;
}

export const containsAKey = (params: string[], key: string) => {
  let haveAKey = false;
  params.forEach((param: string) => {
    if (param.includes(key)) haveAKey = true;
  });
  return haveAKey;
}

export const containsAValue = (params: string[]): boolean => containsAKey(params, "--");

export const getKeyValueFrom = (params: string[]): KeyValue[] => params.reduce((accumulator, param) => {
  if (containsAValue([param])) {
    const keyValue = param.split("=");
    const key = keyValue[0].substring(2, keyValue[0].length);
    const value = keyValue[1];
    accumulator.push({ key, value });
  }
  return accumulator;
}, [] as KeyValue[]);

export const getAllCommands = (): Dictionary<CommandAction> => ({
  error: CommandError,
  clear: CommandClear,
  help: CommandHelp,
  set: CommandSet,
  get: CommandGet,
  rm: CommandRemove,
})

export const getCommandByName = (name: string): CommandAction => {
  const commands = getAllCommands();
  const command = commands[name]
  return command !== undefined ? command : commands.error
}