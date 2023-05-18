import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    setParticipant: (state, action: PayloadAction<IParticipant[]>) => {
      return { ...state, participants: action.payload };
    },
  },
});

export const getParticipants = (state: RootState) =>
  state.participant.participants;

export const { setParticipant } = participantSlice.actions;
export const reducer = participantSlice.reducer;
