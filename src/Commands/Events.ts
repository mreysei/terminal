import { KeyValue } from './KeyValue';
import { CommandAction } from './CommandAction';
import { getAllCommands } from './Commands';
import { Analytics } from '../Services/analytics';

export const containsAllParams = (params: string[], compareParams: string[]): boolean => {
  let haveAllParams = true;
  compareParams.forEach(element => {
    if (!params.includes(element)) haveAllParams = false;
  });
  return haveAllParams;
}

export const containsAnyParams = (params: string[], compareParams: string[]): boolean => {
  let haveAnyParams = false;
  compareParams.forEach(element => {
    if (params.includes(element)) haveAnyParams = true;
  });
  return haveAnyParams;
}

export const containsAKey = (params: string[], key: string) => {
  let haveAKey = false;
  params.forEach((param: string) => {
    if (param.includes(key)) haveAKey = true;
  });
  return haveAKey;
}

export const containsAValue = (params: string[]): boolean => containsAKey(params, "--");

export const getKeyValueFrom = (params: string[]): KeyValue[] => params.reduce((accumulator, param) => {
  if (containsAValue([param])) {
    const keyValue = param.split("=");
    const key = keyValue[0].substring(2, keyValue[0].length);
    const value = keyValue[1];
    accumulator.push({ key, value });
  }
  return accumulator;
}, [] as KeyValue[]);

export const getCommandByName = (name: string): CommandAction | null => {
  const commands = getAllCommands();
  const command = commands[name]

  if (command !== undefined) {
    return command;
  }
  return null
}