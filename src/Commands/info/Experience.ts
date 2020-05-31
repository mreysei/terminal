export const getExperience = (): string[] => {
  return [
    getElement(
      "Lean Mind <small>(<a href='https://leanmind.es' target='_blank'>leanmind.es</a>)</small>",
      ["Full Stack Developer - desde julio de 2018 hasta la actualidad"],
      "Múltiples desarrollos con Kotlin, React, Flutter, TypeScript y muchos más, lo que importa es cuidar el código con clean code, testing y buenas prácticas, el lenguaje es lo de menos."
    ),
    getElement(
      "Omnia Infosys <small>(<a href='https://omniainfosys.com' target='_blank'>omniainfosys.com</a>)</small>",
      ["Programador de aplicaciones informáticas - desde diciembre de 2017 hasta marzo de 2018"],
      "Desarrollo para actualizar la web de la Universidad de La Laguna, un contrato por obra y servicio."
    ),
    getElement(
      "Bakata Solutions SL <small>(<a href='https://bakata.es' target='_blank'>bakata.es</a>)</small>",
      [
        "Formación en centros de trabajo - desde marzo de 2017 hasta junio de 2017",
        "Becario - desde julio de 2017 hasta diciembre de 2017",
      ],
      "Desarrollo principalmente en un ERP con tecnologías como C# .NET JavaScript y jQuery, también alguna aplicación móvil con Xamarin y alguna web con Wordpress."
    ),
    getElement(
      "CIFP César Manrique <small>(<a href='https://cifpcesarmanrique.es' target='_blank'>cifpcesarmanrique.es</a>)</small>",
      ["Desde septiembre de 2015 hasta junio de 2017"],
      "Hice el ciclo superior de Desarrollo de Aplicaciones Web donde aprendí tecnologías como JavaScript, C#, Java, PHP y jQuery, también despliegue de sistemas, uso de sistemas operativos, UX y UI. Aprendí a aprender."
    ),
    getElement(
      "Autónomo",
      ["Desde enero de 2014 hasta octubre de 2015"],
      "Diseño web responsive con HTML, CSS, JS, jQuery y Bootstrap."
    ),
  ]
}

const getElement = (title: string, subtitles: string[], description?: string): string => {
  return [
    `<h3 class="inline">${title}</h3><br />`,
    ...subtitles.map((subtitle) => `  <small>${subtitle}</small><br />`),
    description !== undefined ? `<p>${description}</p>` : ``,
  ].join("");
}