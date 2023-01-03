import { Pair } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseCurrency } from "../../routes/MainPage/views/Table/constants";

export const fetchPairs = createAsyncThunk<Pair[]>("pairs", async () => {
  const { data } = await axios.get<any>(
    `https://openexchangerates.org/api/latest.json?app_id=192fb85a9a11492b8a71b84c293f5b77&base=USD&symbols=${baseCurrency
      .map((item: { base: string; name: string }) => item.base)
      .join(",")}`
  );

  const pairs = [];

  baseCurrency.map((item: { base: string; name: string }) => {
    const ratesThis = [];

    for (const rate in data.rates) {
      const obj: any = new Object();

      obj[`${item.base}${rate}`] =
        data.rates[rate] / data.rates[item.base] === 1
          ? 1
          : (data.rates[rate] / data.rates[item.base]).toFixed(5).replace(/[.-]/g, ",");

      ratesThis.push(obj);
    }

    pairs.push({
      base: item.base,
      name: item.name,
      rates: ratesThis,
    });
  });

  return pairs;
});
