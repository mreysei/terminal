import { CommandAction } from '../CommandAction';
import { Translations } from '../../Services/translations';

const texts = Translations.commands.error;

export const error: CommandAction = ({
  name: "error",
  action: () => texts.responses as string[]
})