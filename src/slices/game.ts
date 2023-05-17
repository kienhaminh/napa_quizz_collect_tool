import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';
import { IQuestion } from 'src/types/game';
import { ITeamInfo } from 'src/types/team';

interface GameState {
  teamInfo: ITeamInfo | null;
  questions: IQuestion[] | undefined;
}

const initialState: GameState = {
  teamInfo: null,
  questions: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTeamInfo: (state, action: PayloadAction<ITeamInfo>) => {
      state.teamInfo = action.payload;
    },
    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
  },
});

export const getTeamInfo = (state: RootState) => state.game.teamInfo;
export const getQuestions = (state: RootState) => state.game;

export const { setTeamInfo, setQuestions } = gameSlice.actions;
export const reducer = gameSlice.reducer;
