import React from 'react';
import { Terminal } from './Components';
import './App.css';
import { Analytics } from './Services/analytics';

export const App = () => {
  const currentTheme = localStorage.getItem("theme") || "ubuntu"
  document.getElementsByTagName('body')[0].classList.add(currentTheme)

  Analytics.initialize();

  return (
    <div className="App" id="App">
      <Terminal />
    </div>
  )
}