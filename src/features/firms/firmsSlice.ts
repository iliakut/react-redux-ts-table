import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Firm } from '../../types/types';

type FirmState = {
  firms: Firm[]
}

type NewBudgetType = {
  id: number
  budget: number
}


const initialState: FirmState = {
  firms: [],
};

export const firmsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFirms: (state, action: PayloadAction<Firm[]>) => {
      state.firms = action.payload;
    },
    setStateNewBudget: (state, action: PayloadAction<NewBudgetType>) => {
      const firm = state.firms.find(item => item.id === action.payload.id)
      if (firm) {
        firm.budget = action.payload.budget;
        firm.budgetLeft = Number((action.payload.budget - firm.budgetSpent).toFixed(2));
      }
    }
  },
});

export const { setFirms, setStateNewBudget } = firmsSlice.actions;

export default firmsSlice.reducer;