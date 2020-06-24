import { getExperience, getPosts } from "../info";
import { CommandAction } from '../CommandAction';
import { containsAllParams } from '../Events';
import { help } from './help';
import { Analytics } from '../../Services/Analytics';
import { Translations } from "../../Services/Translations";

const texts = Translations.commands.get;

export const get: CommandAction = ({
  name: "get",
  params: [
    { name: "experience", description: texts.params.experience },
    { name: "posts", description: texts.params.posts },
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
