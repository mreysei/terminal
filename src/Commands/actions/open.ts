import { CommandAction } from '../CommandAction';
import { containsAllParams } from '../Events';
import { help } from './help';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

export const open: CommandAction = ({
  name: "open",
  params: [
    { name: "work", description: Translations().commands.open.params.work },
    { name: "linkedin", description: Translations().commands.open.params.linkedin },
    { name: "github", description: Translations().commands.open.params.github },
    { name: "twitter", description: Translations().commands.open.params.twitter },
    { name: "instagram", description: Translations().commands.open.params.instagram },
  ],
  action: (params): string[] => {
    const texts = Translations().commands.open
    if (params === undefined || params.length === 0) {
      Analytics.command("open")
      return help.action([open.name]);
    } else if (containsAllParams(params, ["work"])) {
      Analytics.command("open work")
      openTab("https://leanmind.es/")
      return [texts.response.work];
    } else if (containsAllParams(params, ["linkedin"])) {
      Analytics.command("open linkedin")
      openTab("https://www.linkedin.com/in/mreysei/")
      return [texts.response.linkedin];
    } else if (containsAllParams(params, ["github"])) {
      Analytics.command("open github")
      openTab("https://github.com/mreysei")
      return [texts.response.github];
    } else if (containsAllParams(params, ["instagram"])) {
      Analytics.command("open instagram")
      openTab("https://www.instagram.com/mreysei/")
      return [texts.response.instagram];
    } else if (containsAllParams(params, ["twitter"])) {
      Analytics.command("open twitter")
      openTab("https://twitter.com/mreysei")
      return [texts.response.twitter];
    } else {
      Analytics.error(`open ${params.join(" ")}`)
      return help.action([open.name]);
    }
  },
})

const openTab = (link: string) => {
  window.open(link, '_blank');
}