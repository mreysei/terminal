import { CommandAction } from '../CommandAction';
import { Translations } from '../../Services/Translations';
import { Analytics } from '../../Services/Analytics';

export const exit: CommandAction = {
  name: "exit",
  hidden: true,
  action: (_): string[] => {
    Analytics.command(exit.name)
    if(window.opener != null){
      window.close();
      return [];
    } else {
      return [Translations().commands.exit.response];
    }
  }
}