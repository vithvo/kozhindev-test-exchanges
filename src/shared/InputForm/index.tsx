import React from "react";
import { FC } from "react";
import "./inputForm.scss";
import { useSelector } from "react-redux";
import { selectPairsData } from "../../redux/currencyPairs/selector";
import { useState } from "react";
import { useMemo } from "react";
import { useRef } from "react";

interface InputProps {
  firstSelectValue: string;
  secondSelectValue: string;
}

export const InputForm: FC<InputProps> = ({ firstSelectValue, secondSelectValue }) => {
  const { items } = useSelector(selectPairsData);
  const [firstInputValue, setFirstInputValue] = useState<string>("0");
  const [secondInputValue, setSecondInputValue] = useState<string>("0");
  const allCurranctPairs = [];

  const firstInputRef = useRef();
  const secondInputRef = useRef();

  items.map((item) => {
    allCurranctPairs.push(...item.rates);
  });

  // Расчет курса выбранных пар

  const firstValue =
    secondInputValue !== "0" &&
    (Object.values(
      allCurranctPairs?.find(
        (item) => Object.keys(item)[0] === `${secondSelectValue}${firstSelectValue}`
      )
    )[0] as string);

  const secondValue = Object.values(
    allCurranctPairs?.find(
      (item) => Object.keys(item)[0] === `${firstSelectValue}${secondSelectValue}`
    )
  )[0] as string;

  // Действия при изменении первого инпута

  const onChangeFirstInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstInputValue(e.target.value.replace(/[^,.\d]/g, "").replace(/[.-]/g, ","));

    if (firstSelectValue !== secondSelectValue) {
      setSecondInputValue(
        (Number(secondValue.replace(/[,-]/g, ".")) * Number(e.target.value.replace(/[,-]/g, ".")))
          .toString()
          .replace(/[.-]/g, ",") as string
      );
    } else {
      setSecondInputValue(e.target.value.replace(/[,-]/g, "."));
    }
  };

  // Действия при изменении второго инпута

  const onChangeSecondInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondInputValue(e.target.value.replace(/[^,.\d]/g, "").replace(/[.-]/g, ","));

    if (firstSelectValue !== secondSelectValue) {
      setFirstInputValue(
        (
          Number(firstValue && firstValue.replace(/[,-]/g, ".")) *
          Number(e.target.value.replace(/[,-]/g, "."))
        )
          .toString()
          .replace(/[.-]/g, ",") as string
      );
    } else {
      setFirstInputValue(e.target.value.replace(/[,-]/g, "."));
    }
  };

  // Действия при изменении первой валюты

  useMemo(() => {
    if (firstSelectValue !== secondSelectValue) {
      setSecondInputValue(
        (
          Number(secondValue && secondValue.replace(/[,-]/g, ".")) *
          Number(secondInputValue.replace(/[,-]/g, "."))
        )

          .toString()
          .replace(/[.-]/g, ",") as string
      );
    } else {
      setSecondInputValue(firstInputValue);
    }
  }, [firstSelectValue]);

  // Действия при изменении второй валюты

  useMemo(() => {
    console.log("firstInputRef", firstInputRef.current);
    if (firstSelectValue !== secondSelectValue) {
      setFirstInputValue(
        (
          Number(firstValue && firstValue.replace(/[,-]/g, ".")) *
          Number(secondInputValue.replace(/[,-]/g, "."))
        )

          .toString()
          .replace(/[.-]/g, ",") as string
      );
    } else {
      setFirstInputValue(secondInputValue);
    }
  }, [secondSelectValue]);

  return (
    <label htmlFor="input" className="inputForm">
      <input
        ref={firstInputRef}
        value={firstInputValue}
        type="text"
        className="inputForm__input"
        onChange={(e) => onChangeFirstInputValue(e)}
      />
      <input
        ref={secondInputRef}
        value={secondInputValue}
        type="text"
        className="inputForm__input"
        onChange={(e) => onChangeSecondInputValue(e)}
      />
    </label>
  );
};
