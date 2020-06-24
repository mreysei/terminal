import { getAllCommands } from '../Commands';
import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';
import { error } from '.';
import { Translations } from '../../Services/translations';

const texts = Translations.commands.help

export const help: CommandAction = ({
  name: "help",
  description: texts.description,
  action: (params: string[] | undefined): string[] => {
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
        Analytics.command("help");
        messages.push(texts.response.final)
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