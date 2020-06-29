import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';
import { Pages } from '../../App';

const texts = Translations.commands.exit

export const exit: CommandAction = ({
  name: "exit",
  description: texts.description,
  action: (): string[] => {
    Analytics.command("exit");
    window.open(Pages.initial, '_self')
    return [texts.response]
  },
})
