import { CommandAction } from "..";

export const CommandError: CommandAction = ({
  name: "error",
  action: () => {
    return ["Oops! Ha ocurrido un error, resulta que ese comando no existe :("]
  },
})