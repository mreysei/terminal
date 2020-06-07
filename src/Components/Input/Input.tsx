import React, { useState, useEffect, FC } from 'react';
import { Command } from '../Command/Command';
import './Input.css';
import { useKeyPress, useDeletePress, useEnterPress } from '../../Events/useKeyCodePress';
import { isMobile } from '../../Services/device';

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
    if (!isMobile()) {
      if (keyPressed !== "") {
        setInput(input + keyPressed);
      }

      if (deletePressed && input.length > 0) {
        const inputUpdated = input.substring(0, input.length - 1);
        setInput(inputUpdated);
      }
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


  const onChange = (event: any) => setInput(event.target.value.toLowerCase())

  return (
    <div className="Input" ref={(element) => inputForScroll = element}>
      <Command username={username} command={input} />
      {isMobile() && <input id="input-disable" value={input} onChange={onChange} autoFocus />}
    </div>
  );
}