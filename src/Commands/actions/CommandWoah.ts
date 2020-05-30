import { CommandAction, } from "../Events";

export const CommandWoah: CommandAction = {
  name: 'woah',
  action: () => {
    const url = "https://www.myinstants.com/media/sounds/woah-green-screen-video-crash-bandicoottm_EdKV0mN.mp3"
    const audio = new Audio(url)
    audio.play()
    return ["Woah.... Woah.... Woah.... Woah! WOAHWOAHWOAHWOAH"]
  }
}