import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

interface ParticipantState {
  userId: string;
  authToken: string;
}

const initialState: ParticipantState = {
  userId: '',
  authToken: '',
};

export const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    setParticipant: (state, action) => {
      return { ...state, action };
    },
  },
});

export const getParticipant = (state: RootState) => state.participant;

export const { setParticipant } = participantSlice.actions;
export const reducer = participantSlice.reducer;
