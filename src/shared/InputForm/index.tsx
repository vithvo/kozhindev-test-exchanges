import React from "react";
import { FC } from "react";
import "./inputForm.scss";
import { useSelector } from "react-redux";
import { selectPairsData } from "../../redux/currencyPairs/selector";
import { useState } from "react";
import { useMemo } from "react";
import { getItemsLocalStorage, setItemsLocalStorage } from "../../utils/localstorage/form";
import { useEffect } from "react";
import useDebounce from "../../utils/debounce";

interface InputProps {
  firstSelectValue: string;
  secondSelectValue: string;
}

export const InputForm: FC<InputProps> = ({ firstSelectValue, secondSelectValue }) => {
  const { items } = useSelector(selectPairsData);
  const [firstInputValue, setFirstInputValue] = useState<string>("0");
  const [secondInputValue, setSecondInputValue] = useState<string>("0");
  const allCurranctPairs = [];

  items.map((item) => {
    allCurranctPairs.push(...item.rates);
  });


  // Запись полей в localstorage
	

  useMemo(() => {
    (firstInputValue !== "0" || secondInputValue !== "0") &&
      setItemsLocalStorage({
        firstInputValueLocal: firstInputValue,
        secondInputValueLocal: secondInputValue,
        firstSelectValueLocal: firstSelectValue,
        secondSelectValueLocal: secondSelectValue,
      });
  }, [secondInputValue, firstInputValue, firstSelectValue, secondSelectValue]);

  // Расчет курса выбранных пар

  const firstValue =
    allCurranctPairs.length > 0 &&
    (Object.values(
      allCurranctPairs?.find(
        (item) => Object.keys(item)[0] === `${secondSelectValue}${firstSelectValue}`
      )
    )[0] as string);

  const secondValue = Object.values(
    allCurranctPairs?.length > 0 &&
      allCurranctPairs.find(
        (item) => Object.keys(item)[0] === `${firstSelectValue}${secondSelectValue}`
      )
  )[0] as string;

  // Действия при изменении первого инпута

  const onChangeFirstInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstInputValue(e.target.value.replace(/[^,.\d]/g, "").replace(/[.-]/g, ","));
    const secondInputValueChanged = (
      Number(secondValue && secondValue.replace(/[,-]/g, ".")) *
      Number(e.target.value.replace(/[^,.\d]/g, "").replace(/[,-]/g, "."))
    )
      .toString()
      .replace(/[.-]/g, ",") as string;

    if (firstSelectValue !== secondSelectValue) {
      setSecondInputValue(secondInputValueChanged);
    } else {
      setSecondInputValue(e.target.value.replace(/[,-]/g, "."));
    }
    setItemsLocalStorage({
      firstInputValueLocal: e.target.value.replace(/[^,.\d]/g, "").replace(/[.-]/g, ","),
      secondInputValueLocal: secondInputValueChanged,
    });
  };

  // Действия при изменении второго инпута

  const onChangeSecondInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondInputValue(e.target.value.replace(/[^,.\d]/g, "").replace(/[.-]/g, ","));

    const firstInputValueChanged = (
      Number(firstValue && firstValue.replace(/[,-]/g, ".")) *
      Number(e.target.value.replace(/[^,.\d]/g, "").replace(/[,-]/g, "."))
    )
      .toString()
      .replace(/[.-]/g, ",") as string;

    if (firstSelectValue !== secondSelectValue) {
      setFirstInputValue(firstInputValueChanged);
    } else {
      setFirstInputValue(e.target.value.replace(/[,-]/g, "."));
    }
    setItemsLocalStorage({
      secondInputValueLocal: e.target.value.replace(/[^,.\d]/g, "").replace(/[.-]/g, ","),
      firstInputValueLocal: firstInputValueChanged,
    });
  };

  // Действия при изменении первой валюты

  useMemo(() => {
    if (firstSelectValue !== secondSelectValue) {
      const secondInputValueChanged = (
        Number(secondValue && secondValue.replace(/[,-]/g, ".")) *
        Number(secondInputValue.replace(/[,-]/g, "."))
      )

        .toString()
        .replace(/[.-]/g, ",") as string;
      setSecondInputValue(secondInputValueChanged);
    } else {
      setSecondInputValue(firstInputValue);
    }
  }, [firstSelectValue]);

  // Действия при изменении второй валюты

  useMemo(() => {
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

  // Запись из localstorage в поля

  useEffect(() => {
    const { firstInputValueLocal, secondInputValueLocal } = getItemsLocalStorage();
    setFirstInputValue(firstInputValueLocal);
    setSecondInputValue(secondInputValueLocal);
  }, []);

  return (
    <label htmlFor="input" className="inputForm">
      <input
        value={firstInputValue}
        type="text"
        className="inputForm__input"
        onChange={(e) => onChangeFirstInputValue(e)}
      />
      <input
        value={secondInputValue}
        type="text"
        className="inputForm__input"
        onChange={(e) => onChangeSecondInputValue(e)}
      />
    </label>
  );
};
