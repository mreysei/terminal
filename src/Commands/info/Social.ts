import linkedinIcon from '../../static/icons/linkedin.png';
import githubIcon from '../../static/icons/github.png';
import twitterIcon from '../../static/icons/twitter.png';
import instagramIcon from '../../static/icons/instagram.png';

export const getSocial = (): string[] => {
  return [
    "Me podrás encontrar en todos lados como @mreysei ;)",
    getElement("LinkedIn", "https://www.linkedin.com/in/mreysei/", linkedinIcon),
    getElement("Github", "https://github.com/mreysei", githubIcon),
    getElement("Twitter", "https://www.twitter.com/mreysei", twitterIcon),
    getElement("Instagram", "https://www.instagram.com/mreysei/", instagramIcon),
  ]
}

const getElement = (name: string, link: string, iconSrc: string): string => {
  return `- <a href="${link}" target="_blank" class="social"><img src="${iconSrc}"> ${name}</a>`
}