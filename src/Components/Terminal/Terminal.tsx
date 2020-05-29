import React, { useState } from 'react';
import { Logo, Input, Historic, Command } from '..';
import { CommandAction, getCommandByName } from '../../Commands';
import './Terminal.css';

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


  return (
    <div className="Terminal">
      {logoEnable && <Logo />}
      <Historic commands={historic} />
      <Input username={username} onEnter={onSendCommand} />
    </div>
  )
};