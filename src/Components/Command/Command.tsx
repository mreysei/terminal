import React, { FC } from 'react';
import './Command.css';

export enum CommandType {
  default = "#",
  superuser = "$",
}

export interface Command {
  username: string,
  directory?: string,
  command: string,
  output?: string[],
}

const typeForUser = (username: string): CommandType => {
  if (username === "admin" || username === "superuser" || username === "su") {
    return CommandType.superuser;
  }
  return CommandType.default;
}

type CommandProps = Command;

export const Command: FC<CommandProps> = ({ username, directory, command, output = [] }) => (
  <div className="Command">
    <span className="username">{username || "anonymous"}@mreysei</span>
    <span className="root">:</span>
    <span className="directory">{directory || "~"}</span>
    <span className="type">{typeForUser(username)}</span>
    <span className="command-line">{command}</span>
    {output != null && output.map(stringToHtml)}
  </div>
)

const stringToHtml = (line: string, i: number) => (
  <div className="output" key={`line-${i}`} dangerouslySetInnerHTML={{ __html: line }}>{}</div> // eslint-disable-line react/no-danger-with-children
)