import { CommandAction } from "./CommandAction";
import {
  error,
  clear,
  help,
  set,
  get,
  rm,
  woah,
  pwd,
  open,
  whoami,
  hola,
  holi,
  hi,
  hello,
  sad,
  sudo
} from "./actions";

interface Dictionary<Type> {
  [key: string]: Type;
}

export const getAllCommands = (): Dictionary<CommandAction> => ({
  error,
  clear,
  help,
  set,
  get,
  rm,
  woah,
  pwd,
  open,
  whoami,
  holi,
  hola,
  hi,
  hello,
  ":(": sad,
  sudo,
})