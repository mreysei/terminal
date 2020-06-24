import { CommandAction } from '../CommandAction';
import { Translations } from '../../Services/Translations';
import { Analytics } from '../../Services/Analytics';

const texts = Translations.commands.clear

export const clear: CommandAction = {
  name: "clear",
  description: texts.description,
  action: () => {
    Analytics.command(clear.name)

    return [];
  }
}