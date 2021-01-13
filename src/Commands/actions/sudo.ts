import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

export const sudo: CommandAction = ({
  name: "sudo",
  hidden: true,
  action: (): string[] => {
    Analytics.command("sudo");

    const imageUrl = "https://media1.giphy.com/media/njYrp176NQsHS/giphy.webp"
    return [Translations().commands.sudo.response.replace("{imageUrl}", imageUrl)]
  },
}) 