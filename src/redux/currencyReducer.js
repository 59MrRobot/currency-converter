import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    fromCurrency: "USD",
    toCurrency: "ZAR",
    conversionRate: 0,
  },
  reducers: {
    setFromCurrency: (state, action) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action) => {
      state.toCurrency = action.payload;
    },
    setConversionRate: (state, action) => {
      state.conversionRate = action.payload;
    },
  }
});

export const {
  setFromCurrency,
  setToCurrency,
  setConversionRate,
} = currencySlice.actions;

export default currencySlice.reducer;