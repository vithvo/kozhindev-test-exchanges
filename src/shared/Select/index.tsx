import React from "react";
import { FC } from "react";
import "./Select.scss";
import { baseCurrency } from "../../routes/MainPage/views/Table/constants";
import { useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface SelectProps {
  id: number;
  setFirstValue?: Dispatch<SetStateAction<string>>;
  setSecondValue?: Dispatch<SetStateAction<string>>;
}

export const Select: FC<SelectProps> = ({ id, setFirstValue, setSecondValue }) => {
  const onClickOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    id === 1 && setFirstValue(e.target.value);
    id === 2 && setSecondValue(e.target.value);
  };

  return (
    <select
      name="baseCurrency"
      className="select"
      onChange={(e) => onClickOption(e)}
      defaultValue={id === 2 && "USD"}
    >
      {baseCurrency.map((base, index) => (
        <option key={index} value={base.base} className="select__option">
          {base.name}
        </option>
      ))}
    </select>
  );
};
