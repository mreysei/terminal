import { Translations } from "../../Services/translations"

const experience = Translations.info.experience
const shared = Translations.shared

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

export const getExperience = (): string[] => experience.map(transform)

const transform = (experience: Experience): String => {
  return [
    getName(experience.name),
    getUrl(experience.url),
    "<br />",
    experience.positions.map(getPosition).join(""),
    getDescription(experience.description)
  ].join("")
}

const getName = (name: String) =>
  `<h3 class="inline">${name}</h3>`

const getUrl = (url: String | undefined) => url
  ? ` <small>(<a href='${url}' target='_blank'>${url}</a>)</small>`
  : ``

const getPosition = (position: Position) =>
  `  <small>${position.name ? `${position.name} - ` : ""}${shared.from} ${formatDate(position.from)} ${shared.to} ${formatDate(position.to)}</small><br />`;

const getDescription = (description: String) =>
  `<p>${description}</p>`;

const formatDate = (dateString: String | undefined) => {
  if (!dateString) return shared.currentDate

  const months = shared.months;
  const dateSplitted = dateString.split("/");
  const month = Number(dateSplitted[1]) - 1;
  const year = Number(dateSplitted[2]);

  return `${months[month]} ${year}`
}