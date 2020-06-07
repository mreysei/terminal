import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import { Boom } from '../../Components/Boom/Boom';
import { CommandAction } from '../CommandAction';
import { error } from './error';
import { containsAllParams } from '../Events';

export const rm: CommandAction = ({
  name: "rm",
  action: (params): string[] => {
    if (params === undefined) {
      return error.action();
    } else if (containsAllParams(params, ["-rf", "*"]) || containsAllParams(params, ["-rf"])) {
      ReactGA.event({
        category: 'Commands',
        action: 'Conocido',
        label: rm.name,
      })
      return boom();
    } else {
      return error.action();
    }
  },
})

const boom = () => {
  ReactDOM.render(<Boom />, document.getElementById('App'));
  return [];
}