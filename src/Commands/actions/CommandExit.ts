import { CommandAction } from "..";

export const CommandExit: CommandAction = ({
  name: "exit",
  description: "Cierra el navegador",
  action: (): string[] => {
    window.close();
    return [];
  },
})
