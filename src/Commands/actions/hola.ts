import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

export const hola: CommandAction = ({
  name: "hola",
  alias: ["hula", "holi", "hi", "hello"],
  action: (): string[] => {
    Analytics.command("hola");

    return [Translations().commands.hola.response]
  },
}) 