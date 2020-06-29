import React, { useState, useEffect } from 'react';
import './BlueScreen.css'
import youtubeQR from '../../static/qr_img.png'
import { UserData } from '../../Services/UserData';
import { Translations } from '../../Services/Translations';

const texts = Translations.shared.boom

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
      <p>{texts.bad.replace("{device}", UserData.fromMobile() ? "móvil" : "ordenador")}</p>
      <p>{random.toString()}% {texts.complete}</p>
      <img src={youtubeQR} alt="Código QR" draggable="false" />
      <p className="info">
        {texts.qr}<br />
        <br />
        <br />
        {texts.error}
      </p>
    </div>
  )
}