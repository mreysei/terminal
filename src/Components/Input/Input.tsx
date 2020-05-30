import React, { useState, useEffect, FC } from 'react';
import { useEnterPress } from '../../Events';
import { Command, CommandType } from '../Command/Command';
import './Input.css';

interface InputProps {
  username: string,
  onEnter: (command: Command) => void
}

export const Input: FC<InputProps> = ({ onEnter, username }) => {
  const [input, setInput] = useState("");
  const enterPressed = useEnterPress();

  let inputForScroll: HTMLDivElement | null;

  useEffect(() => {
    if (enterPressed) {
      onEnter({
        username,
        directory: "~",
        type: CommandType.default,
        command: input,
        output: [],
      });

      setInput("");
      document.getElementById('input-disable')?.setAttribute("value", "");

      if (inputForScroll !== null) {
        inputForScroll.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [enterPressed]);

  return (
    <div className="Input" ref={(element) => inputForScroll = element}>
      <Command username={username} command={input} />
      <input id="input-disable" value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
  );
}