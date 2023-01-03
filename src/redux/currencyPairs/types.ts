export enum Status {
  LOADING = "loading",
  SUCCES = "succes",
  ERROR = "error",
}

export type Pair = {
  base: string;
  name: string;
  rates: [];
};

export interface PairsCliceState {
  items: Pair[];
  isLoading: Status;
}
