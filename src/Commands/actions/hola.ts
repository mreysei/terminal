import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';
import { Translations } from '../../Services/translations';

const texts = Translations.commands.hola

export const hola: CommandAction = ({
  name: "hola",
  action: (): string[] => {
    Analytics.command("hola");

    return [texts.response]
  },
}) 