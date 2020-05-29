import { CommandClear, CommandError, CommandRemove } from ".";
import { CommandHelp } from "./actions/CommandHelp";

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

export const containsAllParams = (params: string[], compareParams: string[]): boolean => {
  let haveAllParams = true;
  compareParams.forEach(element => {
    if (!params.includes(element)) haveAllParams = false;
  });
  return haveAllParams;
}

export const getAllCommands = () => {
  const commands: Dictionary<CommandAction> = {
    clear: CommandClear,
    error: CommandError,
    help: CommandHelp,
    rm: CommandRemove,
  }
  return commands
}

export const getCommandByName = (name: string): CommandAction => {
  const commands = getAllCommands();
  const command = commands[name]
  return command !== undefined ? command : commands.error
}