import ReactGA from 'react-ga'

const initialize = () => {
  ReactGA.initialize('UA-105839851-1');
}

const toRegister = (category: string, action: string, label: string) => {
  ReactGA.event({ category, action, label })
}

const command = (name: string) => {
  toRegister('Comando', 'Acciones', name);
}

const value = (value: string) => {
  toRegister('Comando', 'Valores', value);
}

const error = (input: string) => {
  toRegister('Comando', 'Error', input)
}

export const Analytics = {
  initialize,
  command,
  value,
  error,
}