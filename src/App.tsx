import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Terminal } from './Components';
import './App.css';
import { Analytics } from './Services/Analytics';
import { UserData } from './Services/UserData';
import { BlueScreen } from './Pages/BlueScreen/BlueScreen';
import { Initial } from './Pages/Initial/Initial';

export enum Pages {
  initial = "/",
  terminal = "/terminal",
  home = "/home",
  boom = "/boom"
}

export const App = () => {
  const currentTheme = UserData.theme.get()
  document.getElementsByTagName('body')[0].classList.add(currentTheme)

  Analytics.initialize();

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={Pages.boom}><BlueScreen /></Route>
          <Route path={Pages.terminal}><Terminal /></Route>
          <Route path={Pages.initial}><Initial /></Route>
        </Switch>
      </div>
    </Router>
  )
}
