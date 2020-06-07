import ReactGA from 'react-ga';
import { CommandAction } from '../CommandAction';

export const clear: CommandAction = {
  name: "clear",
  description: "Limpia la terminal",
  action: () => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: clear.name,
    })

    return [];
  }
}