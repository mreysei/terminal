import { CommandParam } from "./CommandParam";

export interface CommandAction {
  name: string,
  alias?: string[],
  description?: string,
  params?: CommandParam[],
  action: (params?: string[]) => string[],
}