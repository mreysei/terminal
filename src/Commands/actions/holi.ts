import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { hola } from './hola';

export const holi: CommandAction = ({
  name: "holi",
  action: (): string[] => {
    Analytics.command("holi");

    return hola.action();
  },
}) 