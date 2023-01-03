import React, { FC, useEffect } from "react";
import "./Table.scss";
import { useSelector } from "react-redux";
import { fetchPairs } from "../../../../redux/currencyPairs/asyncAction";
import { useAppDispatch } from "../../../../redux/store";
import { comparablePairs, tableHead } from "./constants";
import { useRef } from "react";
import Loader from "../../../../shared/Loader/insex";
import { selectPairsData } from "../../../../redux/currencyPairs/selector";

export const Table: FC = () => {
  const tableRef: React.LegacyRef<HTMLTableElement> = useRef();
  const { items, isLoading } = useSelector(selectPairsData);
  const dispatch = useAppDispatch();

  const getPairs = async () => {
    console.log("fetchPairs!!!");
    dispatch(fetchPairs());
  };

  useEffect(() => {
    items.length === 0 && getPairs();
  }, [items.length]);

  return (
    <table ref={tableRef} className={`table ${isLoading && "borderNone"}`} border={1}>
      <caption className="table__title">Курсы валют</caption>

      {isLoading === "loading" ? (
        <thead>
          <tr>
            <th>
              <Loader height="456" width="80vw" />
            </th>
          </tr>
        </thead>
      ) : (
        <>
          <thead className="table__head">
            <tr>
              {tableHead.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="table__body_row">
                <td className="">{index + 1}</td>
                <td>{item.base}</td>
                <td>{item.name}</td>
                {comparablePairs.map((pair) => (
                  <td key={pair}>
                    {items.length > 0 &&
                      `${
                        Object.values(
                          item.rates.find((rate) =>
                            Object.keys(rate)[0].includes(`${item.base}${pair}`)
                          )
                        )[0]
                      }`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </>
      )}
    </table>
  );
};
