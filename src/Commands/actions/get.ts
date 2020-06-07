import ReactGA from 'react-ga';
import { getExperience, getPosts } from "../info";
import { CommandAction } from '../CommandAction';
import { containsAllParams } from '../Events';
import { help } from './help';

export const get: CommandAction = ({
  name: "get",
  params: [
    { name: "experience", description: "Muestra mi experiencia, mis estudios y los trabajos en los que he estado" },
    { name: "posts", description: "Muestra un listado de posts que he escrito" },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      return help.action([get.name]);
    } else if (containsAllParams(params, ["experience"])) {
      analytics("experience")
      return getExperience()
    } else if (containsAllParams(params, ["posts"])) {
      analytics("posts")
      return getPosts()
    } else {
      return help.action([get.name]);
    }
  },
})

const analytics = (value: string) => {
  ReactGA.event({
    category: 'Commands',
    action: 'Conocido',
    label: get.name + " " + value,
  })
}
