import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import firmsReducer from '../features/firms/firmsSlice';

export const store = configureStore({
  reducer: {
    firms: firmsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
