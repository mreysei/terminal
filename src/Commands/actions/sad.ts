import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';
import { Translations } from '../../Services/translations';

const texts = Translations.commands.sad

export const sad: CommandAction = ({
  name: ":(",
  action: (): string[] => {
    Analytics.command(":(");

    return texts.responses as string[]
  },
}) 