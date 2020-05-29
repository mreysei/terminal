import { getAllCommands, CommandAction, CommandParam } from "..";

export const CommandHelp: CommandAction = ({
  name: "help",
  description: "Lista los comandos que se pueden realizar",
  action: (params): string[] => {
    const commands = getAllCommands();
    const keys = Object.keys(commands).sort();
    return keys.reduce((accumulator, value) => {
      const command = commands[value];
      if (command.description !== undefined) {
        addCommand(accumulator, command);
      }
      return accumulator;
    }, <string[]>[]);
  },
})

const addCommand = (accumulator: string[], command: CommandAction) => {
  const spaces = getSpaces(command.name, 22);
  accumulator.push(`  ${command.name} ${spaces} - ${command.description}`)
  if (command.params !== undefined) {
    command.params.forEach((param) => addParam(accumulator, param));
  }
}

const addParam = (accumulator: string[], param: CommandParam) => {
  if (param.description !== undefined) {
    const name = `[${param.name}]`
    const spaces = getSpaces(name, 16);
    accumulator.push(`        ${name} ${spaces} - ${param.description}`)
  }
}

const getSpaces = (text: string, size: number) => {
  const commandSpaces = size - text.length;
  return " ".repeat(commandSpaces);
}