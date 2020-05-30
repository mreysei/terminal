import { CommandAction } from "..";

export const CommandPwd: CommandAction = ({
  name: "pwd",
  action: (): string[] => [window.location.href],
})