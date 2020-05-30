import ReactGA from 'react-ga';
import { CommandAction, } from "../Events";

export const CommandWoah: CommandAction = {
  name: 'woah',
  action: () => {
    ReactGA.event({
      category: 'Commands',
      action: 'Conocido',
      label: CommandWoah.name,
    })

    const url = "https://www.myinstants.com/media/sounds/woah-green-screen-video-crash-bandicoottm_EdKV0mN.mp3"
    const audio = new Audio(url)
    audio.play()
    return ["Woah.... Woah.... Woah.... Woah! WOAHWOAHWOAHWOAH"]
  }
}