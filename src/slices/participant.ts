import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';
import { IParticipant } from 'src/types/participant';

interface ParticipantState {
  participants: IParticipant[];
}

const initialState: ParticipantState = {
  participants: [],
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
