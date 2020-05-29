import { CommandAction, containsAllParams } from "..";
import { CommandError } from "./CommandError";

export const CommandRemove: CommandAction = ({
  name: "rm",
  action: (params): string[] => {
    if (params === undefined) {
      return CommandError.action();
    } else if (containsAllParams(params, ["-rf", "*"])) {
      return boom();
    } else {
      return CommandError.action();
    }
  },
})

const boom = () => {



  return [];
}