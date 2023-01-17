import React, { FC, memo } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { formatDate } from "./service";
import { fetchPairs } from "../../redux/currencyPairs/asyncAction";
import { useAppDispatch } from "../../redux/store";
import { useState } from "react";
import { useEffect } from "react";
import { selectPairsData } from "../../redux/currencyPairs/selector";
import { useSelector } from "react-redux";

const Header: FC = memo(() => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | null>();
  const { items } = useSelector(selectPairsData);

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const getPairs = async () => {
      dispatch(fetchPairs());
    };
    getPairs();
    setDate(new Date());
  };

  useEffect(() => {
    items.length !== 0 && setDate(new Date());
  }, [items.length]);

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
});

export default Header;
