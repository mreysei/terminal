import React from 'react';
import ReactDOM from 'react-dom';
import { Boom } from '../../Components/Boom/Boom';
import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';
import { Analytics } from '../../Services/analytics';

export const kill: CommandAction = ({
  name: "kill",
  action: (params): string[] => {
    if (params === undefined) {
      Analytics.error("kill")
      return error.action();
    } else if (containsAllParams(params, ["-9"])) {
      Analytics.command("kill -9")
      return boom();
    } else {
      Analytics.error(`kill ${params.join(" ")}`)
      return error.action();
    }
  },
})

const boom = () => {
  ReactDOM.render(<Boom />, document.getElementById('App'));
  return [];
}