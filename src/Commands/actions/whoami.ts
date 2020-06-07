import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';

export const whoami: CommandAction = ({
  name: "whoami",
  action: (): string[] => {
    Analytics.command("whoami");

    const username = localStorage.getItem("username") || "anonymous";
    return [username]
  },
}) 