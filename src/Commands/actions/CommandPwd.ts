import ReactGA from 'react-ga';
import { CommandAction } from "..";

export const CommandPwd: CommandAction = ({
  name: "pwd",
  action: (): string[] => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: CommandPwd.name,
    })

    return [window.location.href]
  },
})