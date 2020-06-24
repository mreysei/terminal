import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

const texts = Translations.commands.sad

export const sad: CommandAction = ({
  name: ":(",
  action: (): string[] => {
    Analytics.command(":(");

    return texts.responses as string[]
  },
}) 