import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string;
  authToken: string;
}

const initialState: AuthState = {
  userId: '',
  authToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const getAuthData = (state: RootState) => state.auth;

export const { setAuthData } = authSlice.actions;
export const reducer = authSlice.reducer;
