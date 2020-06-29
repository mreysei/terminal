import React, { FC } from 'react';
import './Logo.css'

export enum LogoType {
  image,
  terminal,
}

export interface Logo {
  type?: LogoType
}

type LogoProps = Logo;

export const Logo: FC<LogoProps> = ({
  type = LogoType.image
}) => type === LogoType.terminal ? LogoTerminal() : LogoImage();

const LogoImage = () => (
  <div className="Logo image">
    <img src="" alt="logo" />
  </div>
)

const LogoTerminal = () => (
  <div className="Logo text">
    .                                     _   .<br />
    .   _ __ ___  _ __ ___ _   _ ___  ___(_)  .<br />
    .  | '_ ` _ \| '__/ _ \ | | / __|/ _ \ |  .<br />
    .  | | | | | | | |  __/ |_| \__ \  __/ |  .<br />
    .  |_| |_| |_|_|  \___|\__, |___/\___|_|  .<br />
    .                      |___/              .<br />
  </div>
)