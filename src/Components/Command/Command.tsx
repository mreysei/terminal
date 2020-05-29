import React, { FC } from 'react';
import './Command.css';

export enum CommandType {
  default = "#",
  superuser = "$",
}

export interface Command {
  username: string,
  directory?: string,
  type?: CommandType,
  command: string,
  output?: string[],
}

type CommandProps = Command;

export const Command: FC<CommandProps> = ({ username, directory, type, command, output = [] }) => (
  <div className="Command">
    <span className="username">{username || "anonymous"}@mreysei</span>
    <span className="root">:</span>
    <span className="directory">{directory || "~"}</span>
    <span className="type">{type || CommandType.default}</span>
    <span className="command-line">{command}</span>
    {output != null && output.map(stringToHtml)}
  </div>
)

const stringToHtml = (line: string, i: number) => (
  <div className="output" key={`line-${i}`} dangerouslySetInnerHTML={{ __html: line }}>{}</div>
)