import { CommandAction } from '../CommandAction';
import { Analytics } from '../../Services/analytics';
import { Historic } from '../../Services/historic';

export const history: CommandAction = ({
  name: "history",
  action: (): string[] => {
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