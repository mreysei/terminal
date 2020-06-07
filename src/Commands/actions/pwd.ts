import ReactGA from 'react-ga';
import { CommandAction } from '../CommandAction';

export const pwd: CommandAction = ({
  name: "pwd",
  action: (): string[] => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: pwd.name,
    })

    return [window.location.href]
  },
})