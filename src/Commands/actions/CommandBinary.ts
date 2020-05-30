import ReactGA from 'react-ga';
import { CommandAction, containsAnyParams } from "../Events";

export const CommandBinary: CommandAction = {
  name: 'binary',
  action: (params = []) => {
    if (params.length === 0) {
      analytics("")
      return [
        "  01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01100010 01101001 01110100 00101110 01101100 01111001 00101111 00110010 01011010 01010000 01111001 00110101 01001010 01111010",
        "  +",
        "  01110110 01100101 01110010 01100100 01100101",
        "  +",
        "  01110000 01100001 01101010 01100001 01110010 01101001 01110100 01100001",
        "  = ?",
      ];
    } else if (containsAnyParams(params, ["gokk", "Gokk", "GOKK"])) {
      analytics("gokk")
      return [
        "Guauuu, te lo has debido de currar, efectivamente es una referencia al minuto 1:19 del vídeo ;o",
        "  ",
        "<img src='https://i.imgur.com/IE0Aoi3.png' draggable='false' />"
      ]
    } else {
      analytics(params.join(", "))
      return errorParams();
    }
  }
}

const errorParams = () => [
  "Oops parece que no es la respuesta correcta...",
]

const analytics = (value: string) => {
  ReactGA.event({
    category: 'Commands',
    action: 'Conocido',
    label: CommandBinary.name + " " + value,
  })
}
