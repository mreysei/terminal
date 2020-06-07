import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';

export const woah: CommandAction = {
  name: 'woah',
  action: () => {
    Analytics.command("woah");

    const url = "https://www.myinstants.com/media/sounds/woah-green-screen-video-crash-bandicoottm_EdKV0mN.mp3"
    const audio = new Audio(url)
    audio.play()
    return ["Woah.... Woah.... Woah.... Woah! WOAHWOAHWOAHWOAH"]
  }
}