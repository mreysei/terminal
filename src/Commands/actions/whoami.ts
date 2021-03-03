import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { UserData } from '../../Services/UserData';
import { Translations } from '../../Services/Translations';

export const whoami: CommandAction = ({
  name: "whoami",
  description: Translations().commands.whoami.description,
  action: (_): string[] => {
    Analytics.command("whoami");

    return [UserData.username.get()]
  },
}) 