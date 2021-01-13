import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';
import { Analytics } from '../../Services/Analytics';
import { BlueScreen } from '../../Components';
import ReactDOM from 'react-dom';
import React from 'react';

export const rm: CommandAction = ({
  name: "rm",
  hidden: true,
  action: (params): string[] => {
    if (params === undefined) {
      Analytics.error("rm")
      return error.action();
    } else if (containsAllParams(params, ["-rf", "*"]) || containsAllParams(params, ["-rf"])) {
      Analytics.command("rm -rf")
      ReactDOM.render(<BlueScreen />, document.getElementById('App'))
      return ['¡Booom!'];
    } else {
      Analytics.error(`rm ${params.join(" ")}`)
      return error.action();
    }
  },
})
