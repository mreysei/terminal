import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { UserData } from '../../Services/UserData';

export const whoami: CommandAction = ({
  name: "whoami",
  action: (): string[] => {
    Analytics.command("whoami");

    return [UserData.username.get()]
  },
}) 