import ReactGA from 'react-ga';
import { CommandAction } from "..";

export const CommandError: CommandAction = ({
  name: "error",
  action: () => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: CommandError.name,
    })

    return [
      "Oops! Ha ocurrido un error, resulta que ese comando no existe :(",
      "Prueba a escribir 'help', quizás te sea de ayuda",
    ]
  },
})