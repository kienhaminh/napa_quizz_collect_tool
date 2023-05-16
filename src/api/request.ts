import axios from 'axios';
import { IGetThreadPayload, ILoginPayload, ILoginRes } from './type';
import { store } from 'src/store';

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
