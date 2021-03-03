import { CommandAction } from '../CommandAction';
import { Translations } from '../../Services/Translations';
import { Analytics } from '../../Services/Analytics';

export const echo: CommandAction = {
  name: "echo",
  hidden: true,
  action: (params: string[] | undefined): string[] => {
    Analytics.command(echo.name)
    console.log(params)
    if (params && params.length > 0) {
      const message = params.join(" ");
      const occurrences = (message.match(/"/g) || []).length
      if (occurrences === 2 && message.indexOf('"') === 0 && message.lastIndexOf('"') === message.length - 1){
        const characters = message.split('')
        characters.shift()
        characters.pop()
        return [characters.join('')]
      }
      return [Translations().commands.echo.error.format]
    }

    return [Translations().commands.echo.error.params]
  }
}