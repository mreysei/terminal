import { CommandAction } from '../CommandAction';
import { Translations } from '../../Services/Translations';

export const error: CommandAction = ({
  name: "error",
  action: () => Translations().commands.error.responses as string[]
})