import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

export const sad: CommandAction = ({
  name: ":(",
  hidden: true,
  action: (): string[] => {
    Analytics.command(":(");

    return Translations().commands.sad.responses as string[]
  },
}) 