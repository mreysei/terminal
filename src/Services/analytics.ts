import ReactGA from 'react-ga'
import { UserData } from './UserData';

const isInDebug = UserData.isInDebug();

const initialize = () => {
  if (!isInDebug) ReactGA.initialize('UA-105839851-1')
}

const toRegister = (category: string, action: string, label: string) => {
  if (!isInDebug) ReactGA.event({ category, action, label })
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