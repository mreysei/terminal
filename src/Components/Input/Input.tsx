import React, { useState, useEffect, FC } from 'react';
import { useEnterPress, useKeyPress, useDeletePress, isMobile } from '../../Events';
import { Command, CommandType } from '../Command/Command';
import './Input.css';

interface InputProps {
  username: string,
  onEnter: (command: Command) => void
}

export const Input: FC<InputProps> = ({ onEnter, username }) => {
  const [input, setInput] = useState("")
  const keyPressed = useKeyPress()
  const deletePressed = useDeletePress()
  const enterPressed = useEnterPress()

  let inputForScroll: HTMLDivElement | null

  useEffect(() => {
    if (keyPressed !== "") {
      setInput(input + keyPressed);
    }

    if (deletePressed && input.length > 0) {
      const inputUpdated = input.substring(0, input.length - 1);
      setInput(inputUpdated);
    }

    if (enterPressed) {
      if (inputForScroll !== null) {
        inputForScroll.scrollIntoView({ behavior: "smooth" });
      }

      onEnter({
        username,
        directory: "~",
        command: input,
        output: [],
      });

      setInput("");
      document.getElementById('input-disable')?.setAttribute("value", "");
    }
  }, [enterPressed, keyPressed, deletePressed]);


  const onChange = (event: any) => {
    if (isMobile()) setInput(event.target.value.toLowerCase());
  }

  return (
    <div className="Input" ref={(element) => inputForScroll = element}>
      <Command username={username} command={input} />
      <input id="input-disable" value={input} onChange={onChange} autoFocus />
    </div>
  );
}