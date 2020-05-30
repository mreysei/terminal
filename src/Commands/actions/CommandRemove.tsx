import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import { CommandAction, containsAllParams, CommandError } from "..";
import { Boom } from '../../Components/Boom/Boom';

export const CommandRemove: CommandAction = ({
  name: "rm",
  action: (params): string[] => {
    if (params === undefined) {
      return CommandError.action();
    } else if (containsAllParams(params, ["-rf", "*"]) || containsAllParams(params, ["-rf"])) {
      ReactGA.event({
        category: 'Commands',
        action: 'Conocido',
        label: CommandRemove.name,
      })
      return boom();
    } else {
      return CommandError.action();
    }
  },
})

const boom = () => {
  ReactDOM.render(<Boom />, document.getElementById('App'));
  return [];
}