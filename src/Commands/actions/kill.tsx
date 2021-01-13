import React from 'react';
import ReactDOM from 'react-dom';
import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';
import { Analytics } from '../../Services/Analytics';
import { BlueScreen } from '../../Components';

export const kill: CommandAction = ({
  name: "kill",
  action: (params): string[] => {
    if (params === undefined) {
      Analytics.error("kill")
      return error.action();
    } else if (containsAllParams(params, ["-9"])) {
      ReactDOM.render(<BlueScreen />, document.getElementById('App'));
      return ['¡Booom!'];
    } else {
      Analytics.error(`kill ${params.join(" ")}`)
      return error.action();
    }
  },
})