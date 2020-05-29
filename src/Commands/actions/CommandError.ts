import { CommandAction } from "..";

export const CommandError: CommandAction = ({
  name: "error",
  action: () => [
    "Oops! Ha ocurrido un error, resulta que ese comando no existe :(",
    "Prueba a escribir 'help', quizás te sea de ayuda",
  ],
})