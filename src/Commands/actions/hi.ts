import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';
import { hola } from './hola';

export const hi: CommandAction = ({
  name: "hi",
  action: (): string[] => {
    Analytics.command("hi");

    return hola.action();
  },
}) 