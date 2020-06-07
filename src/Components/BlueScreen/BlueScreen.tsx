import React, { useState, useEffect } from 'react';
import './BlueScreen.css'
import youtubeQR from '../../static/qr_img.png'
import { isMobile } from '../../Services/device';

export const BlueScreen = () => {
  const [random, setRandom] = useState(0);

  useEffect(() => {
    const url = "https://www.myinstants.com/media/sounds/y2mate-mp3cut_sRzY6rh.mp3"
    const audio = new Audio(url)
    audio.loop = true;
    audio.play()
    setInterval(() => {
      setRandom(Math.floor(Math.random() * 100));
    }, 1000)
  }, []);

  return (
    <div className="BlueScreen">
      <h1>:(</h1>
      <p>Tu {isMobile() ? "móvil" : "ordenador"} parece que no es muy bueno, deberías pensarte en comprarte uno nuevo</p>
      <p>{random.toString()}% Completado</p>
      <img src={youtubeQR} alt="Código QR" draggable="false" />
      <p className="info">
        Para saber a más información escanea este código QR<br />
        <br />
        <br />
        Código de error: WOAH!!
      </p>
    </div>
  )
}