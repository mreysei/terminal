import React, { useState, useEffect, FC } from 'react';
import { Command } from '../Command/Command';
import './Input.css';
import { useKeyPress, useDeletePress, useEnterPress, useArrowUpPress, useArrowDownPress } from '../../Events/useKeyCodePress';
import { Historic } from '../../Services/Historic';
import { UserData } from '../../Services/UserData';

interface InputProps {
  username: string,
  onEnter: (command: Command) => void
}

export const Input: FC<InputProps> = ({ onEnter, username }) => {
  const [input, setInput] = useState("")
  const [historyIndex, setHistoryIndex] = useState(0)
  const keyPressed = useKeyPress()
  const deletePressed = useDeletePress()
  const enterPressed = useEnterPress()
  const arrowUpPressed = useArrowUpPress()
  const arrowDownPressed = useArrowDownPress()

  let inputForScroll: HTMLDivElement | null

  const updateHistory = (value: number) => {
    const up = value < 0
    const history = Historic.get()
    let index = 0

    if (up) {
      index = historyIndex || history.length
    } else {
      index = historyIndex === history.length - 1 ? -1 : historyIndex
    }

    const position = index + value
    setInput(history[position]);
    setHistoryIndex(position);
  }

  useEffect(() => {
    if (!UserData.fromMobile()) {
      if (keyPressed !== "") {
        setInput(input + keyPressed);
      }

      if (deletePressed && input.length > 0) {
        const inputUpdated = input.substring(0, input.length - 1);
        setInput(inputUpdated);
      }

      if (arrowUpPressed) {
        updateHistory(-1)
      }

      if (arrowDownPressed) {
        updateHistory(1)
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

      setHistoryIndex(0);
      setInput("");
      document.getElementById('input-disable')?.setAttribute("value", "");
    }
  }, [enterPressed, keyPressed, deletePressed, arrowUpPressed, arrowDownPressed]); // eslint-disable-line react-hooks/exhaustive-deps


  const onChange = (event: any) => setInput(event.target.value.toLowerCase())

  return (
    <div className="Input" ref={(element) => inputForScroll = element}>
      <Command username={username} command={input} />
      {UserData.fromMobile() && <input id="input-disable" value={input} onChange={onChange} autoFocus />}
    </div>
  );
}