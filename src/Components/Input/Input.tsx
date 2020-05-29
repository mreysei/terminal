import React, { useState, useEffect, FC } from 'react';
import { useKeyPress, useEnterPress, useDeletePress } from '../../Events';
import { Command, CommandType } from '../Command/Command';
import './Input.css';

interface InputProps {
  username: string,
  onEnter: (command: Command) => void
}

export const Input: FC<InputProps> = ({ onEnter, username }) => {
  const [input, setInput] = useState("");
  const keyPressed = useKeyPress();
  const deletePressed = useDeletePress();
  const enterPressed = useEnterPress();

  let inputForScroll: HTMLDivElement | null;

  useEffect(() => {
    if (keyPressed !== "") {
      setInput(input + keyPressed);
    }

    if (deletePressed && input.length > 0) {
      const inputUpdated = input.substring(0, input.length - 1);
      setInput(inputUpdated);
    }

    if (enterPressed) {
      onEnter({
        username,
        directory: "~",
        type: CommandType.default,
        command: input,
        output: [],
      });
      setInput("");
    }

    if (inputForScroll !== null) {
      inputForScroll.scrollIntoView({ behavior: "smooth" });
    }
  }, [keyPressed, deletePressed, enterPressed]);

  return (
    <div className="Input" ref={(element) => inputForScroll = element}>
      <Command username={username} command={input} />
    </div>
  );
}