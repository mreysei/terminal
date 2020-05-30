import { CommandAction, CommandHelp, containsAllParams } from "..";

export const CommandOpen: CommandAction = ({
  name: "open",
  description: "Abre una web en una nueva pestaña",
  params: [
    { name: "linkedin", description: "Abre mi perfil de LinkedIn" },
    { name: "github", description: "Abre mi perfil de GitHub" },
    { name: "twitter", description: "Abre mi perfil de Twitter" },
    { name: "instagram", description: "Abre mi perfil de Instagram" },
  ],
  action: (params): string[] => {
    if (params === undefined || params.length === 0) {
      return errorParams([CommandOpen.name]);
    } else if (containsAllParams(params, ["linkedin"])) {
      open("https://www.linkedin.com/in/mreysei/")
      return ["Abriendo mi LinkedIn!"];
    } else if (containsAllParams(params, ["github"])) {
      open("https://github.com/mreysei")
      return ["Abriendo mi GitHub!"];
    } else if (containsAllParams(params, ["instagram"])) {
      open("https://www.instagram.com/mreysei/")
      return ["Abriendo mi Instagram!"];
    } else if (containsAllParams(params, ["twitter"])) {
      open("https://twitter.com/mreysei")
      return ["Abriendo mi Twitter!"];
    } else {
      return errorParams([CommandOpen.name]);
    }
  },
})

const open = (link: string) => {
  window.open(link, '_blank');
}

const errorParams = (params: string[]) => [
  "Oops parece que algo ha ido mal, este comando funciona así: ",
  ...CommandHelp.action(params),
]