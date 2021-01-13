import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { hola } from './hola';

export const hula: CommandAction = ({
  name: "hula",
  action: (): string[] => {
    Analytics.command("hula");

    return hola.action();
  },
}) 