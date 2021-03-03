import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/Analytics';
import { Historic } from '../../Services/Historic';
import { Translations } from '../../Services/Translations';

export const history: CommandAction = ({
  name: "history",
  description: Translations().commands.history.description,
  action: (_): string[] => {
    const commands: string[] = Historic.get();

    Analytics.command("history");

    const result = commands.map((command, index) => {
      return ` ${getPosition(index + 1)}  ${command}<br />`
    });

    return [result.join("")];
  },
})

const getPosition = (index: number) => {
  if (index < 10) {
    return `   ${index}`;
  } else if (index < 100) {
    return `  ${index}`
  } else if (index < 1000) {
    return ` ${index}`
  } else if (index < 10000) {
    return index
  }
}