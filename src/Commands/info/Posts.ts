export const getPosts = (): string[] => {
  return [
    getElement(
      "Tips de CSS que podrían ayudarte <small></small>",
      "<a href='https://leanmind.es/es/blog/tips-css-que-podrian-ayudarte/' target='_blank'>Haz click aquí para leer el post en leanmind.es</a>",
      "En este artículo os comparto unos tips que a mi me han ayudado a aprender CSS."
    ),
    getElement(
      "Flutter, ¡una maravilla! ¿o... no? (Con Noemi Delgado)",
      "<a href='https://leanmind.es/es/blog/flutter_una_maravilla_o_no/' target='_blank'>Haz click aquí para leer el post en leanmind.es</a>",
      "En este artículo te contaremos nuestra vida tras varios meses tratando con esta tecnología creada por Google en 2017."
    ),
  ]
}

const getElement = (title: string, readmore: string, description: string): string => {
  return [
    `<h3 class="inline">${title}</h3>`,
    `<p>${description}</p>`,
    `<small>${readmore}</small>`,
  ].join("")
}