import { CommandAction } from '../CommandAction';
import { help } from './help';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';
import { containsAnyParams } from '../Events';

const translations = Translations().commands.code;

export const code: CommandAction = ({
  name: "code",
  params: [
    { name: ".", description: translations.params.currentDir },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0 || containsAnyParams(params, ["."])) {
      Analytics.command("code")
      openTab(translations.url)
      return [translations.response.replace("{url}", translations.url)];
    }

    Analytics.error(`code ${params.join(" ")}`)
    return help.action([code.name]);
  },
})

const openTab = (link: string) => {
  window.open(link, '_blank');
}