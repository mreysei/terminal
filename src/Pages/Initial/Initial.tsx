import React from "react";
import './Initial.css';
import { Logo, LogoType } from "../../Components";
import { Translations } from "../../Services/Translations";
import { Link } from "react-router-dom";
import { Pages } from "../../App";

const texts = Translations.shared

export const Initial = () => (
  <div className="Initial">
    <Link to={Pages.home} className="normal">
      <h2>{texts.selectMode}</h2>
      <div>
        <Logo type={LogoType.image} />
        <br />
        {texts.personMode}
      </div>
    </Link>
    <Link to={Pages.terminal} className="terminal">
      <h2>{texts.selectMode}</h2>
      <div>
        <Logo type={LogoType.terminal} />
        <br />
        {texts.developerMode}
      </div>
    </Link>
  </div>
)