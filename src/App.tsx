import React, { useEffect } from 'react';
import { Terminal } from './Components';
import './App.css';

export const App = () => {
  const currentTheme = localStorage.getItem("theme") || "ubuntu"
  document.getElementsByTagName('body')[0].classList.add(currentTheme)

  return (
    <div className="App" id="App">
      <Terminal />
    </div>
  )
}