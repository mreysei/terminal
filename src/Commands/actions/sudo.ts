import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

const texts = Translations.commands.sudo

export const sudo: CommandAction = ({
  name: "sudo",
  action: (): string[] => {
    Analytics.command("sudo");

    const imageUrl = "https://media1.giphy.com/media/njYrp176NQsHS/giphy.webp"
    return [texts.response.replace("{imageUrl}", imageUrl)]
  },
}) 