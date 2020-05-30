import React, { useState, useEffect } from 'react';
import { Logo, Input, Historic, Command } from '..';
import { CommandAction, getCommandByName } from '../../Commands';
import './Terminal.css';
import ReactDOM from 'react-dom';

export const Terminal = () => {
  const getUsername = () => localStorage.getItem("username") || "anonymous";
  const [historic, setHistoric] = useState<Array<Command>>([]);
  const [logoEnable, setLogoEnable] = useState(true);
  const [username, setUsername] = useState(getUsername());

  const onSendCommand = (command: Command) => {
    const input = command.command.split(" ");
    const commandName = input.shift() || "error";
    const commandParams = input || [];
    const commandAction: CommandAction = getCommandByName(commandName);

    if (commandAction.name === 'clear') {
      setLogoEnable(false);
      setHistoric([]);
    } else {
      const output: string[] = commandAction.action(commandParams);
      command.output = output;
      setHistoric([...historic, command]);
    }

    setUsername(getUsername());
  }

  useEffect(() => {
    window.addEventListener('touchend', (e) => {
      e.preventDefault()

      const input = document.getElementById('input-disable')
      if (input !== null) input.focus()
    });
  }, []);

  return (
    <div className="Terminal">
      {logoEnable && <Logo />}
      <Historic commands={historic} />
      <Input username={username} onEnter={onSendCommand} />
    </div>
  )
};