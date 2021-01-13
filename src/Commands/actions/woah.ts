import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Translations } from '../../Services/Translations';

export const woah: CommandAction = {
  name: 'woah',
  hidden: true,
  action: () => {
    Analytics.command("woah");

    const url = "https://www.myinstants.com/media/sounds/woah-green-screen-video-crash-bandicoottm_EdKV0mN.mp3"
    const audio = new Audio(url)
    audio.play()
    return [Translations().commands.woah.response]
  }
}