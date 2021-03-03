import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

const translations = Translations().commands.test;

export const test: CommandAction = ({
  name: "test",
  alias: ["tests", "jest"],
  delayedPerMessage: 500,
  hidden: true,
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      Analytics.command("test")
      return translations.response.tests
    } else {
      Analytics.error(`test ${params.join(" ")}`)
      return [translations.response.error.replace("{param}", params.join(" "))];
    }
  },
})
