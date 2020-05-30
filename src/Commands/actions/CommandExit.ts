import ReactGA from 'react-ga';
import { CommandAction } from "..";

export const CommandExit: CommandAction = ({
  name: "exit",
  description: "Cierra el navegador",
  action: (): string[] => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: CommandExit.name,
    })
    window.close();
    return [];
  },
})
