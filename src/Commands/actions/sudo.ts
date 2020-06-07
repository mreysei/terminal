import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';

export const sudo: CommandAction = ({
  name: "sudo",
  action: (): string[] => {
    Analytics.command("sudo");

    return [`<img src="https://media1.giphy.com/media/njYrp176NQsHS/giphy.webp" alt="Gandalf diciendo que no pasarás">`]
  },
}) 