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
  const [inputEnable, setInputEnable] = useState(true)
  const [username, setUsername] = useState(getUsername())
  document.getElementsByTagName('body')[0].classList.add(currentTheme)

  Analytics.initialize()

  const onSendCommand = async (commandInput: Command): Promise<void> => {
    HistoricService.add(commandInput.command)
    const input = commandInput.command.split(" ")
    const commandName = input.shift() || "error"
    const commandParams = input || []
    const command: CommandAction | null = getCommandByName(commandName) ?? error
    
    if (command.name === clear.name) {
      setLogoEnable(false)
      setHistoric([])
    } else {
      if (command.name === error.name) 
      Analytics.error(commandInput.command) 
      if (command.delayedPerMessage) {
        setInputEnable(false)
        const timeStart = Date.now()
        const currentMessages = [...command.action(commandParams)]
        const commandOutput: Command = { ...commandInput, onlyOutput: true }
        const delayed = setInterval(() => {
          if (currentMessages.length > 0) {
            const currentTime: number = Date.now()
            const realistTime = Math.floor(Math.random() * (command.delayedPerMessage ?? 0))
            const lastMessage = (commandOutput.output ?? []).join()
            const currentMessage = lastMessage + "<p class='test'>" + (currentMessages.shift() ?? "") + "</p>"
            const messageUpdated = currentMessage.replace("{time}", ((currentTime - timeStart + realistTime) / 1000).toFixed(3))
            commandOutput.output = [messageUpdated]
            setHistoric([...historic, commandOutput])
          } else {
            setInputEnable(true)
            clearInterval(delayed)
          }
        }, command.delayedPerMessage)
        commandInput.output = []
      } else {
        commandInput.output = command.action(commandParams)
      }
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
      <Input enable={inputEnable} username={username} onEnter={onSendCommand} />
    </div>
  )
}
