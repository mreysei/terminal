import React, { useState, useEffect } from 'react';
import './Boom.css'
import youtubeQR from '../../static/qr_img.png'

export const Boom = () => {
  const [random, setRandom] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setRandom(Math.floor(Math.random() * 100));
    }, 1000)
  }, []);

  return (
    <div className="Boom">
      <h1>:(</h1>
      <p>Tu ordenador parece que no es muy bueno, deberías pensarte en comprarte uno nuevo</p>
      <p>{random.toString()}% Completado</p>
      <img src={youtubeQR} draggable="false" />
      <p className="info">
        Para saber a más información escanea este código QR<br />
        <br />
        <br />
        Código de error: LMCobol1234
      </p>
    </div>
  )
}