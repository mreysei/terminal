import { CommandAction } from "./CommandAction";
import { error, clear, help, set, get, rm, woah, pwd, open, whoami, hola, holi } from "./actions";

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
})