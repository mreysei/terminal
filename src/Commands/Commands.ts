import { CommandAction } from "./CommandAction";
const Command = require('./actions')

interface Dictionary<Type> {
  [key: string]: Type;
}

export const getAllCommands = (): Dictionary<CommandAction> => {
  const keys = Object.keys(Command)
  const commands: Dictionary<CommandAction> = {}

  keys.forEach((key: string) => {
    const command: CommandAction = Command[key]
    commands[command.name] = command;
  })

  return commands;
}

export const getCommandsList = (): Array<CommandAction> => {
  const keys = Object.keys(Command)
  return keys.map((key: string) => Command[key]);
}