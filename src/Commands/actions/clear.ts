import { CommandAction } from '../CommandAction';
import { Translations } from '../../Services/Translations';
import { Analytics } from '../../Services/Analytics';

export const clear: CommandAction = {
  name: "clear",
  description: Translations().commands.clear.description,
  action: () => {
    Analytics.command(clear.name)

    return [];
  }
}