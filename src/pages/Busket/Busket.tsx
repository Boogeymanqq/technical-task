import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../redux/hook";
import { Button } from "../../components/Button/Button";
import s from "./busket.module.scss";

export const Busket = () => {
  const { arrBusket } = useAppSelector((state) => state.productsSlice);
  return (
    <>
      <div className={s.busket__title}>
        <h1>Корзина</h1>
        <Button>
          <Link to="/">Вернуться на главную</Link>
        </Button>
      </div>
      <div className={s.busket__block}>
        {arrBusket.length <= 0 ? (
          <p>Корзина пуста</p>
        ) : (
          arrBusket.map((elem) => (
            <div key={elem.id}>
              <p>Название: {elem.title}</p>
              <p>Цена: {elem.price}</p>
              <img src={elem.imageUrl} alt="photos" />
              <p>{elem.text}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};
