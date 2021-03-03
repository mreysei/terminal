import React, { useState, useEffect, FC } from 'react';
import { Command } from '../Command/Command';
import './Input.css';
import { useKeyPress, useDeletePress, useEnterPress, useArrowUpPress, useArrowDownPress } from '../../Events/useKeyCodePress';
import { Historic } from '../../Services/Historic';
import { UserData } from '../../Services/UserData';

interface InputProps {
  enable: boolean,
  username: string,
  onEnter: (command: Command) => Promise<void>
}

export const Input: FC<InputProps> = ({ enable, onEnter, username }) => {
  const [input, setInput] = useState("")
  const [historyIndex, setHistoryIndex] = useState(0)
  const [editingEnable, setEditingEnable] = useState(true)
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
    if (!editingEnable || !enable) return;

    if (enterPressed) {
      if (inputForScroll !== null) {
        inputForScroll.scrollIntoView({ behavior: "smooth" });
      }

      setEditingEnable(false)
      onEnter({
        username,
        directory: "~",
        command: input,
        output: [],
      }).then(() => {
        setHistoryIndex(0);
        setInput("");
        setEditingEnable(true);
      })
      document.getElementById('input-disable')?.setAttribute("value", "");
    }
    
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
  }, [enterPressed, keyPressed, deletePressed, arrowUpPressed, arrowDownPressed]); // eslint-disable-line react-hooks/exhaustive-deps


  const onChange = (event: any) => setInput(event.target.value.toLowerCase())

  return enable ? (
    <div className={`Input ${editingEnable ? "active" : ""}`} ref={(element) => inputForScroll = element}>
      <Command username={username} command={input} />
      {UserData.fromMobile() && <input id="input-disable" value={input} onChange={onChange} autoFocus />}
    </div>
  ) : (
    <div></div>
  )
}