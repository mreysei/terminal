import React from 'react';
import ReactDOM from 'react-dom';
import { BlueScreen } from '../../Components/BlueScreen/BlueScreen';
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
      return boom();
    } else {
      Analytics.error(`rm ${params.join(" ")}`)
      return error.action();
    }
  },
})

const boom = () => {
  ReactDOM.render(<BlueScreen />, document.getElementById('App'));
  return [];
}