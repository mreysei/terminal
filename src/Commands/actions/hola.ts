import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

const texts = Translations.commands.hola

export const hola: CommandAction = ({
  name: "hola",
  action: (): string[] => {
    Analytics.command("hola");

    return [texts.response]
  },
}) 