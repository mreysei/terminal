import { Translations } from "../../Services/Translations"


interface Experience {
  name: String,
  url?: String,
  positions: Position[],
  description: String
}

interface Position {
  name?: String,
  from: String,
  to?: String,
}

export const getExperience = (): string[] => Translations().info.experience.map(transform)

const transform = (experience: Experience): String => {
  return [
    '<div class="experience">',
    getName(experience.name),
    getUrl(experience.url),
    "<br />",
    experience.positions.map(getPosition).join(""),
    getDescription(experience.description),
    '</div>',
  ].join("")
}

const getName = (name: String) =>
  `<h3>${name}</h3>`

const getUrl = (url: String | undefined) => url
  ? ` <small>(<a href='${url}' target='_blank'>${url}</a>)</small>`
  : ``

const getPosition = (position: Position) =>
  `  <small>${position.name ? `${position.name} - ` : ""}${Translations().shared.from} ${formatDate(position.from)} ${Translations().shared.to} ${formatDate(position.to)}</small><br />`;

const getDescription = (description: String) =>
  `<p>${description}</p>`;

const formatDate = (dateString: String | undefined) => {
  if (!dateString) return Translations().shared.currentDate

  const months = Translations().shared.months;
  const dateSplitted = dateString.split("/");
  const month = Number(dateSplitted[1]) - 1;
  const year = Number(dateSplitted[2]);

  return `${months[month]} ${year}`
}