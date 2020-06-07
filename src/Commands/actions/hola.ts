import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';

export const hola: CommandAction = ({
  name: "hola",
  action: (): string[] => {
    Analytics.command("hola");

    return ["Em... HOLII, no esperaba que me saludases, la verdad, pero se agradese, prueba a usar el comando 'help' :)"]
  },
}) 