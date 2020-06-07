import React, { useState, useEffect } from 'react';
import { Logo, Input, Historic, Command } from '..';
import './Terminal.css';
import { CommandAction } from '../../Commands/CommandAction';
import { getCommandByName } from '../../Commands/Events';
import { Analytics } from '../../Services/analytics';
import { error } from '../../Commands/actions';

export const Terminal = () => {
  const getUsername = () => localStorage.getItem("username") || "anonymous";
  const [historic, setHistoric] = useState<Array<Command>>([]);
  const [logoEnable, setLogoEnable] = useState(true);
  const [username, setUsername] = useState(getUsername());

  const onSendCommand = (commandInput: Command) => {
    const input = commandInput.command.split(" ");
    const commandName = input.shift() || "error";
    const commandParams = input || [];
    let command: CommandAction | null = getCommandByName(commandName);

    if (command?.name === 'clear') {
      setLogoEnable(false);
      setHistoric([]);
    } else {
      if (command === null) {
        Analytics.error(commandInput.command);
        command = error;
      }

      const output: string[] = command.action(commandParams);
      commandInput.output = output;
      setHistoric([...historic, commandInput]);
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