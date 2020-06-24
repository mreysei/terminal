import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { hola } from './hola';

export const hello: CommandAction = ({
  name: "hello",
  action: (): string[] => {
    Analytics.command("hello");

    return hola.action();
  },
}) 