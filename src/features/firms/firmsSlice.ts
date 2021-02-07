import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {Firm} from "../../types/types";

type FirmState = {
  firms: Firm[]
}


const initialState: FirmState = {
  firms: [],
};

export const firmsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // increment: state => {
    //   state.value += 1;
    // },
    setFirms: (state, action: PayloadAction<Firm[]>) => {
      state.firms = action.payload;
    },
  },
});

export const { setFirms } = firmsSlice.actions;

export default firmsSlice.reducer;