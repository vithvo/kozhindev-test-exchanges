import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPairs } from "./asyncAction";
import { Pair, PairsCliceState, Status } from "./types";

const initialState: PairsCliceState = {
  items: [],
  isLoading: Status.LOADING, // loading | succes | error
};

export const pairsSlice = createSlice({
  name: "pairs",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPairs.pending, (state) => {
      state.isLoading = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPairs.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = Status.SUCCES;
    });
    builder.addCase(fetchPairs.rejected, (state) => {
      console.log("error");
      state.isLoading = Status.ERROR;
      state.items = [];
    });
  },
});

export default pairsSlice.reducer;
