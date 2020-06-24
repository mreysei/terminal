import React from 'react';
import { Terminal } from './Components';
import './App.css';
import { Analytics } from './Services/Analytics';
import { UserData } from './Services/UserData';

export const App = () => {
  const currentTheme = UserData.theme.get()
  document.getElementsByTagName('body')[0].classList.add(currentTheme)

  Analytics.initialize();

  return (
    <div className="App" id="App">
      <Terminal />
    </div>
  )
}