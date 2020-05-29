import { getAllCommands, CommandAction, CommandParam } from "..";

export const CommandHelp: CommandAction = ({
  name: "help",
  description: "Lista los comandos que se pueden realizar",
  action: (params: string[] | undefined): string[] => {
    const commands = getAllCommands();
    const keys = (params !== undefined && params.length > 0) ? params : Object.keys(commands);
    return keys.reduce((accumulator, key) => {
      const command = commands[key];
      if (command !== undefined && command.description !== undefined) {
        addCommand(accumulator, command);
      }
      return accumulator;
    }, [] as string[]);
  },
})

const addCommand = (accumulator: string[], command: CommandAction) => {
  const spaces = getSpaces(command.name, 36);
  accumulator.push(`  ${command.name} ${spaces} - ${command.description}`)
  if (command.params !== undefined) {
    command.params.forEach((param) => addParam(accumulator, param));
  }
}

const addParam = (accumulator: string[], param: CommandParam) => {
  if (param.description !== undefined) {
    const spaces = getSpaces(param.name, 32);
    accumulator.push(`      ${param.name} ${spaces} - ${param.description}`)
  }
}

const getSpaces = (text: string, size: number) => {
  const commandSpaces = size - text.length;
  return " ".repeat(commandSpaces);
}