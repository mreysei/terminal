import ReactGA from 'react-ga';
import { getAllCommands } from '../Commands';
import { CommandAction } from '../CommandAction';

export const help: CommandAction = ({
  name: "help",
  description: "Lista los comandos que se pueden realizar",
  action: (params: string[] | undefined): string[] => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: help.name,
    })

    const commands = getAllCommands()
    let initialMessage = "Estos son los comandos visibles, además de estos hay otros escondidos... jeje"
    let keys = Object.keys(commands)

    if (params !== undefined && params.length > 0) {
      initialMessage = "Oops parece que algo ha ido mal, este comando funciona así: "
      keys = params
    }

    return keys.reduce((accumulator, key) => {
      const command = commands[key];
      if (command !== undefined) {
        addCommand(accumulator, command);
      }
      return accumulator;
    }, [initialMessage] as string[])
  },
})

const addCommand = (accumulator: string[], command: CommandAction) => {
  if (command.params !== undefined) {
    command.params.forEach((param) => {
      if (param.description !== undefined) {
        accumulator.push(transform(`${command.name} ${param.name}`, param.description))
      }
    });
  } else if (command.description !== undefined) {
    accumulator.push(transform(command.name, command.description));
  }
}

const transform = (command: string, description: string) => {
  return `<div class="command">` +
    `<span class="name">${command}</span>` +
    `<span class="description">${description}</span>` +
    `</div>`
}