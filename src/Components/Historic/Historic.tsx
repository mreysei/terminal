import React, { FC } from 'react';
import { Command } from '../Command/Command';

interface HistoricProps {
  commands: Command[],
}

export const Historic: FC<HistoricProps> = ({ commands = [] }) => (
  <div className="Historic">
    {commands.map((command: Command, i) => (
      <Command
        key={i}
        username={command.username}
        directory={command.directory}
        command={command.command}
        output={command.output} />
    ))}
  </div>
)
