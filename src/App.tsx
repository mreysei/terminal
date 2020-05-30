import React from 'react';
import ReactGA from 'react-ga';
import { Terminal } from './Components';
import './App.css';

export const App = () => {
  const currentTheme = localStorage.getItem("theme") || "ubuntu"
  document.getElementsByTagName('body')[0].classList.add(currentTheme)

  ReactGA.initialize('UA-105839851-1');

  return (
    <div className="App" id="App">
      <Terminal />
    </div>
  )
}