import { combineReducers } from '@reduxjs/toolkit';
import { reducer as authReducer } from 'src/slices/auth';
import { reducer as gameReducer } from 'src/slices/game';
import { reducer as participantReducer } from 'src/slices/participant';
import { reducer as calendarReducer } from 'src/slices/calendar';
import { reducer as chatReducer } from 'src/slices/chat';
import { reducer as kanbanReducer } from 'src/slices/kanban';
import { reducer as mailReducer } from 'src/slices/mail';

export const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  participant: participantReducer,
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
});
