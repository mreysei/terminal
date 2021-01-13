import { Translations } from "../../Services/Translations"

interface Post {
  title: String,
  url: String,
  origen: String,
  description: String
}

const transform = (post: Post): string => [
  `<h3 class="inline">${post.title}</h3>`,
  `<p>${post.description}</p>`,
  `<small><a href='${post.url}' target='_blank'>${Translations().shared.readPost.replace("{origen}", post.origen)}</a></small>`,
].join("")

export const getPosts = (): string[] => Translations().info.posts.map(transform)