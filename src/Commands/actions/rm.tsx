import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';
import { Analytics } from '../../Services/Analytics';

export const rm: CommandAction = ({
  name: "rm",
  action: (params): string[] => {
    if (params === undefined) {
      Analytics.error("rm")
      return error.action();
    } else if (containsAllParams(params, ["-rf", "*"]) || containsAllParams(params, ["-rf"])) {
      Analytics.command("rm -rf")
      window.open('/boom', '_self');
      return ["¡Boom!"];
    } else {
      Analytics.error(`rm ${params.join(" ")}`)
      return error.action();
    }
  },
})