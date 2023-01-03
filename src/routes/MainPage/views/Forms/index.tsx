import React, { FC } from "react";
import { InputForm } from "../../../../shared/InputForm";
import "./form.scss";
import { Select } from "../../../../shared/Select";
import { useSelector } from "react-redux";
import Loader from "../../../../shared/Loader/insex";
import { selectPairsData } from "../../../../redux/currencyPairs/selector";
import { useState } from "react";
import { useEffect } from "react";
import { getItemsLocalStorage } from "../../../../utils/localstorage/form";

export const Forms: FC = () => {
  const { isLoading } = useSelector(selectPairsData);
  const [firstSelectValue, setFirstSelectValue] = useState<string>("RUB");
  const [secondSelectValue, setSecondSelectValue] = useState<string>("USD");

  useEffect(() => {
    const { firstSelectValueLocal, secondSelectValueLocal } = getItemsLocalStorage();
    firstSelectValueLocal && setFirstSelectValue(firstSelectValueLocal);
    secondSelectValueLocal && setSecondSelectValue(secondSelectValueLocal);
  }, [firstSelectValue, secondSelectValue]);

  return (
    <>
      <h4>Конвертация валют</h4>
      <form className="form">
        {isLoading === "loading" ? (
          <div className="form__loader">
            <Loader height="80" width="434" />
          </div>
        ) : (
          <>
            <div className="form__input">
              <InputForm
                firstSelectValue={firstSelectValue}
                secondSelectValue={secondSelectValue}
              />
            </div>
            <div className="form__input">
              <Select
                id={1}
                setFirstValue={setFirstSelectValue}
                firstSelectValue={firstSelectValue}
              />
              <Select
                id={2}
                setSecondValue={setSecondSelectValue}
                secondSelectValue={secondSelectValue}
              />
            </div>
          </>
        )}
      </form>
    </>
  );
};
