import ReactGA from 'react-ga';
import { CommandAction } from '../CommandAction';

export const error: CommandAction = ({
  name: "error",
  action: () => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: error.name,
    })

    return [
      "Oops! Ha ocurrido un error, resulta que ese comando no existe :( <br />" +
      "Prueba a escribir 'help', quizás te sea de ayuda",
    ]
  },
})