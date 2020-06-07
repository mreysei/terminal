import { CommandAction } from '../CommandAction';
import { containsAllParams } from '../Events';
import { help } from './help';
import { Analytics } from '../../Services/analytics';

export const open: CommandAction = ({
  name: "open",
  params: [
    { name: "work", description: "Abre la web de mi empresa" },
    { name: "linkedin", description: "Abre mi LinkedIn" },
    { name: "github", description: "Abre mi GitHub" },
    { name: "twitter", description: "Abre mi Twitter" },
    { name: "instagram", description: "Abre mi Instagram" },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      Analytics.command("open")
      return help.action([open.name]);
    } else if (containsAllParams(params, ["work"])) {
      Analytics.command("open work")
      openTab("https://leanmind.es/")
      return ["Abriendo la web de LeanMind!"];
    } else if (containsAllParams(params, ["linkedin"])) {
      Analytics.command("open linkedin")
      openTab("https://www.linkedin.com/in/mreysei/")
      return ["Abriendo mi LinkedIn!"];
    } else if (containsAllParams(params, ["github"])) {
      Analytics.command("open github")
      openTab("https://github.com/mreysei")
      return ["Abriendo mi GitHub!"];
    } else if (containsAllParams(params, ["instagram"])) {
      Analytics.command("open instagram")
      openTab("https://www.instagram.com/mreysei/")
      return ["Abriendo mi Instagram!"];
    } else if (containsAllParams(params, ["twitter"])) {
      Analytics.command("open twitter")
      openTab("https://twitter.com/mreysei")
      return ["Abriendo mi Twitter!"];
    } else {
      Analytics.error(`open ${params.join(" ")}`)
      return help.action([open.name]);
    }
  },
})

const openTab = (link: string) => {
  window.open(link, '_blank');
}