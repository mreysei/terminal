import { Translations } from "../../Services/Translations"

interface Post {
  title: String,
  url: String,
  origen: String,
  description: String
}

const transform = (post: Post): string => [
  '<div class="post">',
  `<h3>${post.title}</h3>`,
  `<p>${post.description}</p>`,
  `<small><a href='${post.url}' target='_blank'>${Translations().shared.readPost.replace("{origen}", post.origen)}</a></small>`,
  '</div>',
].join("")

export const getPosts = (): string[] => Translations().info.posts.map(transform)