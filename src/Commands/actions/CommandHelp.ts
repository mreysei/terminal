import ReactGA from 'react-ga';
import { getAllCommands, CommandAction, CommandParam } from "..";
import { isMobile } from '../../Events';

export const CommandHelp: CommandAction = ({
  name: "help",
  description: "Lista los comandos que se pueden realizar",
  action: (params: string[] | undefined): string[] => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: CommandHelp.name,
    })

    const commands = getAllCommands()
    let initialMessage = "Estos son los comandos visibles, además de estos hay otros escondidos... jeje"
    let keys = Object.keys(commands)

    if (params !== undefined && params.length > 0) {
      initialMessage = "";
      keys = params;
    }

    const messages = keys.reduce((accumulator, key) => {
      const command = commands[key];
      if (command !== undefined && command.description !== undefined) {
        addCommand(accumulator, command);
      }
      return accumulator;
    }, [] as string[]);

    return [
      initialMessage,
      ...messages.map((message) => "<div class='help'>" + message + "</div>"),
    ]
  },
})

const addCommand = (accumulator: string[], command: CommandAction) => {
  accumulator.push(
    `<span class="command-name">${command.name}</span>` +
    `<span class="command-description">${command.description}</span>`
  )
  if (command.params !== undefined) {
    command.params.forEach((param) => addParam(accumulator, param));
  }
}

const addParam = (accumulator: string[], param: CommandParam) => {
  if (param.description !== undefined) {
    accumulator.push(
      `<span class="param-name">${param.name}</span>` +
      `<span class="param-description">${param.description}</span>`
    )
  }
}

const getSpaces = (text: string, size: number) => {
  const commandSpaces = size - text.length;
  return " ".repeat(commandSpaces);
}