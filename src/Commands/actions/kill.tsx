import React from 'react';
import ReactDOM from 'react-dom';
import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';
import { Analytics } from '../../Services/Analytics';
import { BlueScreen } from '../../Components';

export const kill: CommandAction = ({
  name: "kill",
  hidden: true,
  action: (params): string[] => {
    if (params === undefined) {
      Analytics.error("kill")
      return error.action();
    } else if (containsAllParams(params, ["-9"])) {
      Analytics.error("kill -9")
      ReactDOM.render(<BlueScreen />, document.getElementById('root'));
      return ['¡Booom!'];
    } else {
      Analytics.error(`kill ${params.join(" ")}`)
      return error.action();
    }
  },
})