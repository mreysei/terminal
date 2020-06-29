import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';
import { Analytics } from '../../Services/Analytics';

export const kill: CommandAction = ({
  name: "kill",
  action: (params): string[] => {
    if (params === undefined) {
      Analytics.error("kill")
      return error.action();
    } else if (containsAllParams(params, ["-9"])) {
      Analytics.command("kill -9")
      window.open('/boom', '_self');
      return ["¡Boom!"];
    } else {
      Analytics.error(`kill ${params.join(" ")}`)
      return error.action();
    }
  },
})