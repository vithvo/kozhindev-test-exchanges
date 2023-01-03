import React, { FC } from "react";
import { InputForm } from "../../../../shared/InputForm";
import "./form.scss";
import { Select } from "../../../../shared/Select";
import { useSelector } from "react-redux";
import Loader from "../../../../shared/Loader/insex";
import { selectPairsData } from "../../../../redux/currencyPairs/selector";
import { useState } from "react";

export const Forms: FC = () => {
  const { isLoading } = useSelector(selectPairsData);
  const [firstSelectValue, setFirstSelectValue] = useState<string>("RUB");
  const [secondSelectValue, setSecondSelectValue] = useState<string>("USD");

  return (
    <form className="form">
      {isLoading === "loading" ? (
        <div className="form__loader">
          <Loader height="80" width="434" />
        </div>
      ) : (
        <>
          <div className="form__input">
            <InputForm firstSelectValue={firstSelectValue} secondSelectValue={secondSelectValue} />
          </div>
          <div className="form__input">
            <Select id={1} setFirstValue={setFirstSelectValue} />
            <Select id={2} setSecondValue={setSecondSelectValue} />
          </div>
        </>
      )}
    </form>
  );
};
