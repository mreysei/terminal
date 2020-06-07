import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';

export const triste: CommandAction = ({
  name: ":(",
  action: (): string[] => {
    Analytics.command(":(");

    return [
      "Ohh, no estés triste... :(",
      "¿Estás bien? ¿quiéres hablar?"
    ]
  },
}) 