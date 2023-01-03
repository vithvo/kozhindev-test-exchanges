import React, { FC } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { formatDate } from "./service";
import { fetchPairs } from "../../redux/currencyPairs/asyncAction";
import { useAppDispatch } from "../../redux/store";
import { useState } from "react";
import { useEffect } from "react";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date>();

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const getPairs = async () => {
      dispatch(fetchPairs());
    };
    getPairs();
    setDate(new Date());
  };

  useEffect(() => {
    !date && setDate(new Date());
  });

  return (
    <header>
      <div className="siteContainer">
        <div className="header">
          <Link to="/">
            <div className="header__logo">ExchangeRate</div>
          </Link>

          <div className="header__rate">
            <span>Обновлено: {formatDate(date)}</span>
            <button onClick={(e) => onClickButton(e)} className="header__button">
              обновить
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
