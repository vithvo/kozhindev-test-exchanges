import React, { FC } from "react";
import Header from "../../shared/Header";
import { Table } from "./views/Table";
import "./MainPage.scss";
import { Forms } from "./views/Forms";

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <div className="siteContainer mainPage">
        <Table />
        <Forms />
      </div>
    </>
  );
};

export default MainPage;
