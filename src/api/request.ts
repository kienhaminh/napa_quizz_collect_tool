import axios from 'axios';
import {
  IGetTeamPayload,
  IGetTeamRes,
  IGetThreadPayload,
  ILoginPayload,
  ILoginRes,
} from './type';
import { store } from 'src/store';
import { IRoom } from 'src/types/room';

export const loginReq = async (payload: ILoginPayload): Promise<ILoginRes> => {
  const { data } = await axios.post('/api/login', payload);
  return data.data;
};

export const getThread = async (payload: IGetThreadPayload) => {
  const { authToken, userId } = store.getState().auth;
  const { data } = await axios.get(
    `/api/get-thread?tmid=${payload.tmid}&userId=${userId}&authToken=${authToken}`
  );
  return data.data;
};

export const getTeam = async (
  payload: IGetTeamPayload
): Promise<IGetTeamRes> => {
  const { authToken, userId } = store.getState().auth;
  const { data } = await axios.get(
    `/api/get-team?teamName=${payload.teamName}&userId=${userId}&authToken=${authToken}`
  );
  return data.teamInfo;
};

export const getRooms = async (): Promise<IRoom[]> => {
  const { authToken, userId } = store.getState().auth;
  const { data } = await axios.get(
    `/api/get-room?userId=${userId}&authToken=${authToken}`
  );
  return data.update;
};
