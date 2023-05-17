export interface ILoginPayload {
  user: string;
  password: string;
}

export interface ILoginRes {
  userId: string;
  authToken: string;
}

export interface IGetThreadPayload {
  tmid: string;
}

export interface IGetTeamPayload {
  teamName: string;
}

export interface IGetTeamRes {
  _id: string;
  name: string;
  type: number;
  createdAt: string;
  createdBy: {
    _id: string;
    username: string;
  };
  _updatedAt: string;
  roomId: string;
}
