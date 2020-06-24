import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';
import { Translations } from '../../Services/translations';

const texts = Translations.commands.clear

export const clear: CommandAction = {
  name: "clear",
  description: texts.description,
  action: () => {
    Analytics.command(clear.name)

    return [];
  }
}