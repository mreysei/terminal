import { getExperience, getPosts } from "../info";
import { CommandAction } from '../CommandAction';
import { containsAllParams } from '../Events';
import { help } from './help';
import { Analytics } from '../../Services/analytics';

export const get: CommandAction = ({
  name: "get",
  params: [
    { name: "experience", description: "Muestra mi experiencia, mis estudios y los trabajos en los que he estado" },
    { name: "posts", description: "Muestra un listado de posts que he escrito" },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      Analytics.command("get")
      return help.action([get.name]);
    } else if (containsAllParams(params, ["experience"])) {
      Analytics.command("get experience")
      return getExperience()
    } else if (containsAllParams(params, ["posts"])) {
      Analytics.command("get posts")
      return getPosts()
    } else {
      Analytics.error(`get ${params.join(" ")}`)
      return help.action([get.name]);
    }
  },
})
