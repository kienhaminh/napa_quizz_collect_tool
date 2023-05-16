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
