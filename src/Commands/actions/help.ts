import { getAllCommands } from '../Commands';
import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { error } from '.';
import { Translations } from '../../Services/Translations';

export const help: CommandAction = ({
  name: "help",
  description: Translations().commands.help.description,
  action: (params: string[] | undefined): string[] => {
    const texts = Translations().commands.help
    const commands = getAllCommands()
    let initialMessage = texts.response.initial
    let keys = Object.keys(commands)

    if (params !== undefined && params.length > 0) {
      initialMessage = texts.response.specificCommand
      keys = params
    }

    const messages = keys.reduce((accumulator, key) => {
      const command = commands[key];
      if (command !== undefined) {
        addCommand(accumulator, command);
      }
      return accumulator;
    }, [initialMessage] as string[])

    if (messages.length > 1) {
      if (keys.length === 1) {
        Analytics.command(`help ${keys.join(" ")}`)
      } else {
        const response = texts.response.final;
        Analytics.command("help");
        messages.push(response)
      }
      return messages;
    } else {
      Analytics.error(`help ${keys.join(" ")}`)
      return error.action();
    }
  },
})

const addCommand = (accumulator: string[], command: CommandAction) => {
  if (command.params !== undefined) {
    command.params.forEach((param) => {
      if (!command.hidden) {
        accumulator.push(transform(`${command.name} ${param.name}`, param.description ?? ""))
      }
    });
  } else if (!command.hidden) {
    accumulator.push(transform(command.name, command.description ?? ""));
  }
}

const transform = (command: string, description: string) => {
  return `<div class="command">` +
    `<span class="name">${command}</span>` +
    `<span class="description">${description}</span>` +
    `</div>`
}