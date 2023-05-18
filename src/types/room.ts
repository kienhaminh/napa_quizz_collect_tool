import { IMessage } from './message';

export interface IRoom {
  _id: string;
  name?: string;
  fname?: string;
  t: 'd' | 'p';
  ts: string;
  usernames?: string[];
  usersCount: number;
  lastMessage?: IMessage;
}
