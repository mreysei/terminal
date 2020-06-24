import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { UserData } from '../../Services/UserData';

export const pwd: CommandAction = ({
  name: "pwd",
  action: (): string[] => {
    Analytics.command("pwd");

    return [UserData.location()]
  },
})