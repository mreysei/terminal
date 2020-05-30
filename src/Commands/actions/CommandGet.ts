import ReactGA from 'react-ga';
import { CommandAction, containsAllParams } from "..";
import { CommandHelp } from "./CommandHelp";
import { getExperience, getPosts, getSocial } from "../info";

export const CommandGet: CommandAction = ({
  name: "get",
  description: "Muestra datos",
  params: [
    { name: "experience", description: "Muestra mi experiencia, mis estudios y los trabajos en los que he estado" },
    { name: "posts", description: "Muestra un listado de posts que he escrito" },
    { name: "social", description: "Muestran todas mis redes sociales donde podrás comunicarte conmigo o stalkearme" },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      return errorParams([CommandGet.name]);
    } else if (containsAllParams(params, ["experience"])) {
      analytics("experience")
      return getExperience()
    } else if (containsAllParams(params, ["posts"])) {
      analytics("posts")
      return getPosts()
    } else if (containsAllParams(params, ["social"])) {
      analytics("social")
      return getSocial()
    } else {
      return errorParams([CommandGet.name]);
    }
  },
})

const errorParams = (params: string[]) => [
  "Oops parece que algo ha ido mal, este comando funciona así: ",
  ...CommandHelp.action(params),
]

const analytics = (value: string) => {
  ReactGA.event({
    category: 'Commands',
    action: 'Conocido',
    label: CommandGet.name + " " + value,
  })
}
