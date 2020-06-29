import React, { useState, useEffect } from 'react';
import { Logo, Input, Historic, Command, LogoType } from '../../Components';
import './Terminal.css';
import { CommandAction } from '../../Commands/CommandAction';
import { getCommandByName } from '../../Commands/Events';
import { error } from '../../Commands/actions';
import { Historic as HistoricService } from '../../Services/Historic';
import { Analytics } from '../../Services/Analytics';
import { UserData } from '../../Services/UserData';
import { Translations } from '../../Services/Translations';

const texts = Translations.shared

export const Terminal = () => {
  const getUsername = () => UserData.username.get()
  const [historic, setHistoric] = useState<Array<Command>>([])
  const [logoEnable, setLogoEnable] = useState(true)
  const [username, setUsername] = useState(getUsername())

  const onSendCommand = (commandInput: Command) => {
    HistoricService.add(commandInput.command)
    const input = commandInput.command.split(" ")
    const commandName = input.shift() || "error"
    const commandParams = input || []
    let command: CommandAction | null = getCommandByName(commandName)

    if (command?.name === 'clear') {
      setLogoEnable(false)
      setHistoric([])
    } else {
      if (command === null) {
        Analytics.error(commandInput.command)
        command = error
      }

      const output: string[] = command.action(commandParams)
      commandInput.output = output
      setHistoric([...historic, commandInput])
    }

    setUsername(getUsername())
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
      {logoEnable && <div>
        <Logo type={LogoType.terminal} />
        <br />
        {texts.terminal}
      </div>}
      <Historic commands={historic} />
      <Input username={username} onEnter={onSendCommand} />
    </div>
  )
};