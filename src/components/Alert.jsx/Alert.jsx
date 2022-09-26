import React from "react";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/hook";
import { Button } from "../Button/Button";
import s from "./alert.module.scss";

export const Alert = ({ closed }) => {
  const { alertStatus } = useAppSelector((state) => state.productsSlice);
  return (
    <div className={s.alert__block}>
      <div className={s.alert}>
        <h1>{alertStatus}</h1>
        <div className={s.alert__btn}>
          <Button click={closed}>&times;</Button>
        </div>
      </div>
    </div>
  );
};
