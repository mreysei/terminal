import React, { useEffect, useState } from 'react';
import { Command, Historic, Input, Logo } from './Components';
import './App.css';
import { Analytics } from './Services/Analytics';
import { UserData } from './Services/UserData';
import { Translations } from './Services/Translations';
import { clear, error } from './Commands/actions';
import { CommandAction } from './Commands/CommandAction';
import { Historic as HistoricService } from './Services/Historic';
import { getCommandByName } from './Commands/Events';

export const App = () => {
  const currentTheme = UserData.theme.get()
  const getUsername = () => UserData.username.get()
  const [historic, setHistoric] = useState<Array<Command>>([])
  const [logoEnable, setLogoEnable] = useState(true)
  const [username, setUsername] = useState(getUsername())
  document.getElementsByTagName('body')[0].classList.add(currentTheme)

  Analytics.initialize()

  const onSendCommand = (commandInput: Command) => {
    HistoricService.add(commandInput.command)
    const input = commandInput.command.split(" ")
    const commandName = input.shift() || "error"
    const commandParams = input || []
    let command: CommandAction | null = getCommandByName(commandName) ?? error
    
    if (command.name === clear.name) {
      setLogoEnable(false)
      setHistoric([])
    } else {
      if (command.name === 'error') 
        Analytics.error(commandInput.command) 
      
      commandInput.output = command.action(commandParams)
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
        <Logo />
        <br />
        {Translations().shared.terminal}
      </div>}
      <Historic commands={historic} />
      <Input username={username} onEnter={onSendCommand} />
    </div>
  )
}
