import React, { useState, useEffect, FC } from 'react';
import { useKeyPress, useEnterPress, useDeletePress } from '../../Events';
import { Command, CommandType } from '../Command/Command';
import './Input.css';

interface InputProps {
  onEnter: (command: Command) => void
}

export const Input: FC<InputProps> = ({ onEnter }) => {
  const [username, setUsername] = useState("anonymous");
  const [input, setInput] = useState("");
  const keyPressed = useKeyPress();
  const deletePressed = useDeletePress();
  const enterPressed = useEnterPress();

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
  }, [keyPressed, deletePressed, enterPressed]);

  return (
    <div className="Input">
      <Command username={username} command={input} />
    </div>
  );
}