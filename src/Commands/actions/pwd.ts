import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { UserData } from '../../Services/UserData';
import { Translations } from '../../Services/Translations';

export const pwd: CommandAction = ({
  name: "pwd",
  description: Translations().commands.pwd.description,
  action: (): string[] => {
    Analytics.command("pwd");

    return [UserData.location()]
  },
})