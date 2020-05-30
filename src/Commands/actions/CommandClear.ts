import ReactGA from 'react-ga';
import { CommandAction } from "..";

export const CommandClear: CommandAction = {
  name: "clear",
  description: "Limpia la terminal",
  action: () => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: CommandClear.name,
    })

    return [];
  }
}