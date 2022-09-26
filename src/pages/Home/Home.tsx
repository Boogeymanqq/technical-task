import React from "react";
import { Products } from "../../components/Products/Products";
import s from "./home.module.scss";

export const Home = () => {
  return (
    <div className={s.home}>
      <h1>Главная страница</h1>
      <Products />
    </div>
  );
};
