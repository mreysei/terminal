import React from 'react';
import ReactDOM from 'react-dom';
import { Boom } from '../../Components/Boom/Boom';
import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';
import { Analytics } from '../../Services/analytics';

export const rm: CommandAction = ({
  name: "rm",
  action: (params): string[] => {
    if (params === undefined) {
      Analytics.error("rm")
      return error.action();
    } else if (containsAllParams(params, ["-rf", "*"]) || containsAllParams(params, ["-rf"])) {
      Analytics.command("rm -rf")
      return boom();
    } else {
      Analytics.error(`rm ${params.join(" ")}`)
      return error.action();
    }
  },
})

const boom = () => {
  ReactDOM.render(<Boom />, document.getElementById('App'));
  return [];
}