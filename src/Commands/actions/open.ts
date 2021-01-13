import { CommandAction } from '../CommandAction';
import { containsAnyParams } from '../Events';
import { help } from './help';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';
import { Social, SocialList } from '../../Services/Social';

const translations = () => Translations().commands.open.params;

export const open: CommandAction = ({
  name: "open",
  params: [
    { name: "email", description: translations().email },
    { name: "repository", description: translations().repository },
    { name: "work", description: translations().work },
    { name: "github", description: translations().generic.replace("{name}", "Github") },
    { name: "linkedin", description: translations().generic.replace("{name}", "Linkedin") },
    { name: "twitter", description: translations().generic.replace("{name}", "Twitter") },
    { name: "instagram", description: translations().generic.replace("{name}", "Instagram") },
    { name: "whakoom", description: translations().generic.replace("{name}", "Whakoom") },
    { name: "twitch", description: translations().generic.replace("{name}", "Twitch") },
    { name: "spotify", description: translations().generic.replace("{name}", "Spotify") },
  ],
  action: (params): string[] => {
    const texts = Translations().commands.open
    const keys = SocialList.map((social: Social) => social.key);
    if (params === undefined || params.length === 0) {
      Analytics.command("open")
      return help.action([open.name]);
    } else if (containsAnyParams(params, keys)) {
      const social = SocialList.find((social: Social) => social.key === params[0]);
      if (social) {
        Analytics.command(`open ${social.key}`)
        openTab(social.url)
        return [texts.response.replace("{page}", social.url)];
      }
    }

    Analytics.error(`open ${params.join(" ")}`)
    return help.action([open.name]);
  },
})

const openTab = (link: string) => {
  window.open(link, '_blank');
}