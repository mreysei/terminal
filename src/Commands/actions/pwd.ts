import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';

export const pwd: CommandAction = ({
  name: "pwd",
  action: (): string[] => {
    Analytics.command("pwd");

    return [window.location.href]
  },
})