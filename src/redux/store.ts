import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import pairs from "./currencyPairs/slice";

export const store = configureStore({
  reducer: {
    pairs,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
