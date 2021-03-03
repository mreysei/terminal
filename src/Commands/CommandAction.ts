import { CommandParam } from "./CommandParam";

export interface CommandAction {
  name: string,
  alias?: string[],
  description?: string,
  params?: CommandParam[],
  hidden?: boolean,
  delayedPerMessage?: number,
  action: (params?: string[]) => string[],
}