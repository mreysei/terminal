import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';

export const clear: CommandAction = {
  name: "clear",
  description: "Limpia la terminal",
  action: () => {
    Analytics.command(clear.name)

    return [];
  }
}