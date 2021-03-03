import { CommandAction } from '../CommandAction';
import { Translations } from '../../Services/Translations';
import { Analytics } from '../../Services/Analytics';

export const clear: CommandAction = {
  name: "clear",
  alias: ["cls"],
  description: Translations().commands.clear.description,
  action: (_): string[] => {
    Analytics.command(clear.name)

    return [];
  }
}